from flask import Blueprint, jsonify, request
from Database.classe_professor import Professor

professor_blueprint = Blueprint("professor", __name__)

@professor_blueprint.route("/professores", methods=["GET"])
def get_professor():
    nome = request.args.get("nome", "")
    especializacao = request.args.get("especializacao", "")
    email = request.args.get("email", "")
    
    professor_model = Professor()
    professores = professor_model.get_professores(nome, especializacao, email)
    total_professores = professor_model.get_numero_professores()

    response_data = {
        "professores": professores,
        "total_professores": total_professores
    }

    return jsonify(response_data), 200
