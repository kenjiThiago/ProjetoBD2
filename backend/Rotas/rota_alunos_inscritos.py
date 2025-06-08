from flask import Blueprint, jsonify, request
from Database.classe_vaga import Vaga
from Database.classe_aluno import Aluno

alunos_inscritos_blueprint = Blueprint("rota_alunos_inscritos", __name__)

def comparar_niveis(nivel_aluno, nivel_vaga):
    hierarquia = {"Básico": 1, "Intermediário": 2, "Avançado": 3}
    return hierarquia.get(nivel_aluno, 0) >= hierarquia.get(nivel_vaga, 0)

@alunos_inscritos_blueprint.route("/alunos_inscritos", methods=["GET"])
def get_alunos_inscritos():
    id_vaga = request.args.get("id_vaga", "").strip()
    nome_aluno = request.args.get("nome_aluno", "").strip()
    filtro_qualificacao = request.args.get("qualificacao", "").strip()  
    
    if not id_vaga:
        return jsonify({"error": "Parâmetro 'id_vaga' é obrigatório"}), 400

    vaga_model = Vaga()
    aluno_model = Aluno()

    vaga = vaga_model.get_vagas(id=int(id_vaga))
    if not vaga:
        return jsonify({"error": "Vaga não encontrada"}), 404

    vaga = vaga[0]  

    query_habilidades_vaga = f"""
    SELECT h.nome, h.nivel
    FROM habilidade_vaga hv
    JOIN habilidade h ON hv.id_habilidade = h.id
    WHERE hv.id_vaga = {id_vaga}
    """
    habilidades_vaga = vaga_model.db.execute_select_all(query_habilidades_vaga)
    habilidades_vaga = {h["nome"]: h["nivel"] for h in habilidades_vaga}

    query_alunos_inscritos = f"""
    SELECT 
        a.email, 
        a.nome, 
        a.data_nascimento,
        a.status_plano
    FROM aluno a
    INNER JOIN se_inscreve si ON a.email = si.email_aluno
    WHERE si.id_vaga = {id_vaga}
    """
    if nome_aluno:
        query_alunos_inscritos += f" AND a.nome ILIKE '%{nome_aluno}%'"
    
    query_alunos_inscritos += " ORDER BY a.nome"

    alunos_inscritos = aluno_model.db.execute_select_all(query_alunos_inscritos)

    alunos_detalhes = []

    for aluno in alunos_inscritos:
        
        idade = None
        if aluno["data_nascimento"]:
            from datetime import date
            nascimento = aluno["data_nascimento"]
            hoje = date.today()
            idade = hoje.year - nascimento.year - ((hoje.month, hoje.day) < (nascimento.month, nascimento.day))

        
        query_cursos_concluidos = f"""
        SELECT 
            c.nome, 
            c.nivel, 
            c.duracao
        FROM curso c
        INNER JOIN estuda e ON c.nome = e.nome_curso
        WHERE e.email_aluno = '{aluno["email"]}'
        """
        cursos_concluidos = aluno_model.db.execute_select_all(query_cursos_concluidos)

        numero_cursos_concluidos = len(cursos_concluidos)

        
        query_habilidades_aluno = f"""
        SELECT DISTINCT h.nome, h.nivel
        FROM habilidade_curso hc
        JOIN habilidade h ON hc.id_habilidade = h.id
        INNER JOIN estuda e ON hc.nome_curso = e.nome_curso
        WHERE e.email_aluno = '{aluno["email"]}'
        """
        habilidades_aluno = aluno_model.db.execute_select_all(query_habilidades_aluno)
        
        habilidades_string = ", ".join([f"{h['nome']}: {h['nivel']}" for h in habilidades_aluno])

        aluno_qualificado = True
        for habilidade, nivel_vaga in habilidades_vaga.items():
            nivel_aluno = next((h['nivel'] for h in habilidades_aluno if h['nome'] == habilidade), None)
            if not nivel_aluno or not comparar_niveis(nivel_aluno, nivel_vaga):
                aluno_qualificado = False
                break

        if filtro_qualificacao == "qualificados" and not aluno_qualificado:
            continue
        elif filtro_qualificacao == "nao_qualificados" and aluno_qualificado:
            continue

        alunos_detalhes.append({
            "nome": aluno["nome"],
            "email": aluno["email"],
            "idade": idade,
            "cursos_concluidos": numero_cursos_concluidos,  
            "habilidades": [{"habilidade": habilidades_string}],
            "qualificado": aluno_qualificado
        })

    habilidades_vaga_string = ", ".join([f"{h} ({habilidades_vaga[h]})" for h in habilidades_vaga])

    return jsonify({
        "vaga": {
            "id": vaga["id"],
            "nome": vaga["vaga_nome"],
            "descricao": vaga["descricao"],
            "requisitos": [{"habilidade": habilidades_vaga_string}]
        },
        "alunos": alunos_detalhes
    }), 200
