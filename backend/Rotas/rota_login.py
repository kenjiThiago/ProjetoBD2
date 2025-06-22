from flask import Blueprint, request, jsonify
from Database.classe_aluno import Aluno

login_blueprint = Blueprint("login", __name__)

@login_blueprint.route("/login", methods=["POST"])
def login_aluno():
    data = request.get_json()

    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"erro": "Email e senha são obrigatórios"}), 400

    aluno_model = Aluno()
    aluno = aluno_model.buscar_por_email(email)

    if not aluno:
        return jsonify({"erro": "Aluno não encontrado"}), 404

    if aluno["senha"] != senha:
        return jsonify({"erro": "Senha incorreta"}), 401

    return jsonify({
        "mensagem": "Login bem-sucedido",
        "aluno": {
            "cpf": aluno["cpf"],
            "nome": aluno["nome"],
            "email": aluno["email"],
            "plano": aluno["plano"]
        }
    }), 200

