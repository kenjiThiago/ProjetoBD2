from flask import Blueprint, jsonify, request
from Database.classe_empresa import Empresa

empresa_blueprint = Blueprint("empresa", __name__)

@empresa_blueprint.route("/empresas", methods=["GET"])

def get_empresas():
    setor = request.args.get("setor", "")
    porte = request.args.get("porte", "")
    localizacao = request.args.get("localizacao", "")
    search = request.args.get("search", "")  # nome da empresa, da vaga ou habilidade

    empresa_model = Empresa()
    empresas = empresa_model.get_empresas(setor, porte, localizacao, search)
    total_empresas = empresa_model.get_numero_empresas()

    response_data = {
        "empresas": empresas,
        "total_empresas": total_empresas
    }

    return jsonify(response_data), 200

