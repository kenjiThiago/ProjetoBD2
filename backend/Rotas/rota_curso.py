from flask import Blueprint, jsonify, request
from Database.classe_curso import Curso

curso_blueprint = Blueprint("curso", __name__)

@curso_blueprint.route("/cursos", methods=["GET"])
def get_cursos():
    nome = request.args.get("nome", "")
    duracao = request.args.get("duracao", None)
    nivel = request.args.get("nivel", "")
    habilidade = request.args.get("habilidade", "")
    
    duracao = int(duracao) if duracao else None

    curso_model = Curso()
    cursos = curso_model.get_cursos(nome, duracao, nivel, habilidade)
    total_cursos = curso_model.get_numero_cursos()

    response_data = {
        "cursos": cursos,
        "total_cursos": total_cursos
    }

    return jsonify(response_data), 200
