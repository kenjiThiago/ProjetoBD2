from flask import Blueprint, jsonify, request
from Database.classe_curso import Curso

curso_blueprint = Blueprint("curso", __name__)

@curso_blueprint.route("/cursos", methods=["GET"])
def get_cursos():
    categoria = request.args.get("categoria", "")
    nivel = request.args.get("nivel", "")
    acesso = request.args.get("acesso", "")
    search = request.args.get("search", "")

    curso_model = Curso()
    cursos = curso_model.get_cursos(categoria=categoria, nivel=nivel, acesso=acesso, search=search)
    total_cursos = curso_model.get_numero_cursos()

    response_data = {
        "total_cursos": total_cursos,
        "cursos": cursos
    }
    return jsonify(response_data), 200

