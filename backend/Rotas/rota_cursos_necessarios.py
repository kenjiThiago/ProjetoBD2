from flask import Blueprint, jsonify, request
from Database.classe_vaga import Vaga
from Database.classe_curso import Curso
from Database.classe_aluno import Aluno

cursos_necessarios_blueprint = Blueprint("rota_cursos_necessarios", __name__)

@cursos_necessarios_blueprint.route("/cursos_necessarios", methods=["GET"])
def get_cursos_necessarios():
    email_aluno = request.args.get("email_aluno", "").strip()
    id_vaga = request.args.get("id_vaga", "").strip()
    nivel = request.args.get("nivel", "").strip()
    nome_curso = request.args.get("nome_curso", "").strip()
    habilidade_filtro = request.args.get("habilidade", "").strip()  
    ordenar_duracao = request.args.get("ordenar_duracao", "").strip()  

    if not email_aluno or not id_vaga:
        return jsonify({"error": "Parâmetros 'email_aluno' e 'id_vaga' são obrigatórios"}), 400

    vaga_model = Vaga()
    curso_model = Curso()
    aluno_model = Aluno()

    vaga = vaga_model.get_vagas(id=int(id_vaga))
    if not vaga:
        return jsonify({"error": "Vaga não encontrada"}), 404

    vaga = vaga[0]

    query_habilidades_vaga = f"""
    SELECT DISTINCT h.nome AS habilidade, h.nivel
    FROM habilidade_vaga hv
    INNER JOIN habilidade h ON hv.id_habilidade = h.id
    WHERE hv.id_vaga = {id_vaga}
    """
    habilidades_vaga = vaga_model.db.execute_select_all(query_habilidades_vaga)

    query_habilidades_aluno = f"""
    SELECT DISTINCT h.nome AS habilidade, h.nivel
    FROM estuda e
    INNER JOIN habilidade_curso hc ON e.nome_curso = hc.nome_curso
    INNER JOIN habilidade h ON hc.id_habilidade = h.id
    WHERE e.email_aluno = '{email_aluno}'
    """
    habilidades_aluno = aluno_model.db.execute_select_all(query_habilidades_aluno)

    habilidades_que_o_aluno_ja_tem = [
        f"{habilidade['habilidade']}: {habilidade['nivel']}" for habilidade in habilidades_aluno
    ]

    nivel_ordem = {"Iniciante": 1, "Intermediário": 2, "Avançado": 3}

    habilidades_faltantes = []
    for habilidade_vaga in habilidades_vaga:
        nome_vaga = habilidade_vaga['habilidade']
        nivel_vaga = habilidade_vaga['nivel']

        encontrado = False
        for habilidade_aluno in habilidades_aluno:
            if habilidade_aluno['habilidade'] == nome_vaga:
                if nivel_ordem[habilidade_aluno['nivel']] >= nivel_ordem[nivel_vaga]:
                    encontrado = True
                    break
        
        if not encontrado:
            habilidades_faltantes.append(f"{nome_vaga}: {nivel_vaga}")

    if not habilidades_faltantes:
        return jsonify({
            "vaga": {"id": vaga["id"], "nome": vaga["vaga_nome"]},
            "habilidades_faltantes": [],
            "habilidades_que_o_aluno_ja_tem": habilidades_que_o_aluno_ja_tem,
            "cursos_sugeridos": []
        }), 200

    habilidades_str = "', '".join([h.split(":")[0] for h in habilidades_faltantes])

    query_cursos_sugeridos = f"""
        SELECT 
            subquery.nome,
            subquery.nivel,
            subquery.duracao,
            subquery.data_lancamento,
            subquery.habilidade
        FROM (
            SELECT DISTINCT 
                c.nome,
                c.nivel,
                c.duracao,
                TO_CHAR(c.data_lancamento, 'DD/MM/YYYY') AS data_lancamento,
                h.nome AS habilidade
            FROM curso c
            INNER JOIN habilidade_curso hc ON c.nome = hc.nome_curso
            INNER JOIN habilidade h ON hc.id_habilidade = h.id
            WHERE h.nome IN ('{habilidades_str}')
    """

    if nivel:
        query_cursos_sugeridos += f" AND LOWER(c.nivel) = LOWER('{nivel}')"

    if nome_curso:
        query_cursos_sugeridos += f" AND LOWER(c.nome) LIKE '%{nome_curso.lower()}%'"

    if habilidade_filtro:
        query_cursos_sugeridos += f" AND LOWER(h.nome) LIKE '%{habilidade_filtro.lower()}%'"

    query_cursos_sugeridos += """
        ) AS subquery
    """

    if ordenar_duracao:
        if ordenar_duracao.lower() == 'asc':
            query_cursos_sugeridos += " ORDER BY subquery.duracao ASC"
        elif ordenar_duracao.lower() == 'desc':
            query_cursos_sugeridos += " ORDER BY subquery.duracao DESC"
        else:
            return jsonify({"error": "Valor inválido para ordenar_duracao. Use 'asc' ou 'desc'."}), 400
    else:
        query_cursos_sugeridos += " ORDER BY subquery.nome ASC"  

    cursos_sugeridos = curso_model.db.execute_select_all(query_cursos_sugeridos)

    cursos_formatados = []
    for curso in cursos_sugeridos:
        curso_nivel = curso["nivel"]
        cursos_formatados.append({
            "nome": curso["nome"],
            "nivel": curso["nivel"],
            "duracao": curso["duracao"],
            "data_lancamento": curso["data_lancamento"],
            "habilidade": f"{curso['habilidade']}: {curso['nivel']}"  
        })

    cursos_formatados = [
        curso for curso in cursos_formatados if nivel_ordem[curso["nivel"]] >= nivel_ordem[habilidades_vaga[0]["nivel"]]
    ]

    return jsonify({
        "vaga": {
            "id": vaga["id"],
            "nome": vaga["vaga_nome"],
            "habilidades_necessarias": [f"{h['habilidade']}: {h['nivel']}" for h in habilidades_vaga]
        },
        "habilidades_faltantes": habilidades_faltantes,
        "habilidades_que_o_aluno_ja_tem": habilidades_que_o_aluno_ja_tem,
        "cursos_sugeridos": cursos_formatados
    }), 200
