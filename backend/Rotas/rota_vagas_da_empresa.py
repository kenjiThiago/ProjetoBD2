from flask import Blueprint, jsonify, request
from Database.classe_vaga import Vaga
from Database.classe_empresa import Empresa

vagas_empresa_blueprint = Blueprint("vagas_empresa", __name__)

@vagas_empresa_blueprint.route("/vagas_empresa", methods=["GET"])
def get_vagas_empresa():
    empresa_nome = request.args.get("empresa", "")  
    vaga_nome = request.args.get("vaga", "")  
    requisitos = request.args.get("requisitos", "")  
    ordenar_por = request.args.get("ordenar_por", "").strip() 
    ordenar_ordem = request.args.get("ordenar_ordem", "").strip().upper()  

    if ordenar_por not in ["numero_inscritos", "vaga_nome", "localizacao", "requisitos"]:
        ordenar_por = "vaga_nome"  
    if ordenar_ordem not in ["ASC", "DESC"]:
        ordenar_ordem = "ASC"  

    if not empresa_nome:
        return jsonify({"error": "O nome da empresa é obrigatório"}), 400

    vaga_model = Vaga()
    empresa_model = Empresa()

    empresas = empresa_model.get_empresas(nome=empresa_nome)
    if not empresas:
        return jsonify({"error": f"A empresa '{empresa_nome}' não foi encontrada."}), 404

    empresa_info = {
        "nome": empresas[0]["empresa_nome"],
        "setor": empresas[0].get("setor", "Setor não especificado")
    }

    vagas = vaga_model.get_vagas(nome=vaga_nome, empresa=empresa_nome, requisitos=requisitos, ordenar_por=ordenar_por, ordenar_ordem=ordenar_ordem)

    vagas_formatadas = [
        {
            "vaga_id": vaga["id"],  
            "vaga_nome": vaga["vaga_nome"],
            "numero_inscritos": vaga["numero_inscritos"],
            "requisitos": vaga["requisitos"]
        }
        for vaga in vagas
    ]

    return jsonify({
        "empresa": empresa_info,
        "vagas": vagas_formatadas
    }), 200
