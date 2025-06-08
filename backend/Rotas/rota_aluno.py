from flask import Blueprint, jsonify, request
from Database.classe_aluno import Aluno

aluno_blueprint = Blueprint("aluno", __name__)

@aluno_blueprint.route("/alunos", methods=["GET"])
def get_alunos():
    nome = request.args.get("nome", "")
    status_plano = request.args.get("status_plano", "")
    email = request.args.get("email", "")
    
    aluno_model = Aluno()
    alunos = aluno_model.get_alunos(nome, status_plano, email)
    num_ativos = aluno_model.count_ativos()
    num_inativos = aluno_model.count_inativos()

    response_data = {
        "alunos": alunos,
        "num_ativos": num_ativos,
        "num_inativos": num_inativos
    }

    return jsonify(response_data), 200
