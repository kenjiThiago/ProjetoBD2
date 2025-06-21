from flask import Blueprint, jsonify, request
from Database.classe_aluno import Aluno

aluno_blueprint = Blueprint("aluno", __name__)
@aluno_blueprint.route("/alunos", methods=["GET"])

def get_alunos():
    nome = request.args.get("nome", "")
    plano = request.args.get("plano", "")
    email = request.args.get("email", "")
    cpf = request.args.get("cpf", "")

    categoria = request.args.get("categoria", "")
    nivel = request.args.get("nivel", "")
    status = request.args.get("status", "")
    search = request.args.get("search", "")

    aluno_model = Aluno()
    alunos = aluno_model.get_alunos(nome, plano, email, cpf)

    for aluno in alunos:
        cpf_aluno = aluno["cpf"]
        cursos = aluno_model.get_cursos_do_aluno(
            cpf_aluno,
            categoria=categoria,
            nivel=nivel,
            status=status,
            search=search
        )
        aluno["card_cursos"] = cursos

        visao_geral = aluno_model.get_visao_geral_cursos_nao_concluidos(cpf_aluno)
        aluno["visao_geral"] = visao_geral

    return jsonify({"alunos": alunos}), 200

