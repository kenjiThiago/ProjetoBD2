from flask import Blueprint, jsonify, request
from Database.classe_empresa import Empresa

empresa_blueprint = Blueprint("empresa", __name__)

@empresa_blueprint.route("/empresas", methods=["GET"])
def get_empresas():
    nome = request.args.get("nome", "")
    setor = request.args.get("setor", "")
    localizacao = request.args.get("localizacao", "")
    
    empresa_model = Empresa()
    empresas = empresa_model.get_empresas(nome, setor, localizacao)
    total_empresas = empresa_model.get_numero_empresas()

    response_data = {
        "empresas": empresas,
        "total_empresas": total_empresas
    }

    return jsonify(response_data), 200
