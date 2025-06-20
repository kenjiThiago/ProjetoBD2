from flask import Blueprint, jsonify, request
from Database.classe_vaga import Vaga

vaga_blueprint = Blueprint("vaga", __name__)
@vaga_blueprint.route("/vagas", methods=["GET"])

def get_vagas():
    id = request.args.get("id", type=int)
    nome = request.args.get("nome", "")
    empresa = request.args.get("empresa", "")
    localizacao = request.args.get("localizacao", "")
    requisitos = request.args.get("requisitos", "")
    nivel = request.args.get("nivel", "")
    modalidade = request.args.get("modalidade", "")
    search = request.args.get("search", "")  # se quiser adicionar busca geral

    vaga_model = Vaga()
    vagas = vaga_model.get_vagas(
        id=id,
        nome=nome,
        empresa=empresa,
        localizacao=localizacao,
        requisitos=requisitos,
        nivel=nivel,
        modalidade=modalidade,
        search=search
    )

    return jsonify({"vagas": vagas}), 200

