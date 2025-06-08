from flask import Blueprint, jsonify, request
from Database.classe_vaga import Vaga

vagas_inscritas_blueprint = Blueprint("vagas_inscritas", __name__)

@vagas_inscritas_blueprint.route("/vagas_inscritas", methods=["GET"])
def get_vagas_inscritas():
    email_aluno = request.args.get("email_aluno", "").strip()
    vaga_nome = request.args.get("vaga_nome", "").strip()
    empresa_nome = request.args.get("empresa_nome", "").strip()
    localizacao = request.args.get("localizacao", "").strip()
    requisitos = request.args.get("requisitos", "").strip()
    
    ordenar_por = request.args.get("ordenar_por", "numero_inscritos").strip()  # Padrão é 'numero_inscritos'
    ordenar_ordem = request.args.get("ordenar_ordem", "").strip()  # Padrão é 'DESC'

    if not email_aluno:
        return jsonify({"error": "O email_aluno do aluno é obrigatório"}), 400

    if ordenar_ordem not in ["asc", "desc"]:
        ordenar_ordem = "asc"

    print(ordenar_ordem)

    vaga_model = Vaga()

    dados = vaga_model.get_vagas_inscritas_por_aluno(
        email_aluno, vaga_nome, empresa_nome, localizacao, requisitos, ordenar_por, ordenar_ordem
    )

    if not dados or 'vagas_inscritas' not in dados:
        dados = {
            "aluno_nome": dados.get("aluno_nome", ""),
            "habilidades_aluno": dados.get("habilidades_aluno", []),
            "vagas_inscritas": []
        }

    return jsonify(dados), 200
