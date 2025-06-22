from flask import Blueprint, jsonify, request
from Database.classe_aluno import Aluno
from Database.classe_curso import Curso

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

    curso_model = Curso()
    total_cursos = curso_model.get_numero_cursos()

    return jsonify({"alunos": alunos, "total_cursos": total_cursos}), 200


@aluno_blueprint.route("/alunos", methods=["POST"])
def criar_aluno():
    data = request.get_json()

    cpf = data.get("cpf")
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("password")
    data_nascimento = data.get("birthDate")  # Formato: 'YYYY-MM-DD'
    plano = data.get("plano")  # Deve ser 'Pago' ou 'Grátis'
    forma_pagamento = data.get("paymentMethod")  # Débito, Crédito ou Pix

    if plano not in ["Pago", "Grátis"]:
        return jsonify({"erro": "Plano inválido"}), 400
    if forma_pagamento not in ["Débito", "Crédito", "Pix"]:
        return jsonify({"erro": "Forma de pagamento inválida"}), 400

    aluno_model = Aluno()
    sucesso = aluno_model.inserir_aluno(
        cpf, nome, email, senha, data_nascimento, plano, forma_pagamento
    )

    if sucesso:
        return jsonify({
            "mensagem": "Login bem-sucedido",
            "aluno": {
                "cpf": cpf,
                "nome": nome,
                "email": email,
                "plano": plano
            }
        }), 201
    else:
        return jsonify({"erro": "Erro ao inserir aluno"}), 500
