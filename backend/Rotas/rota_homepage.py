from flask import Blueprint, jsonify
from Database.classe_aluno import Aluno
from Database.classe_curso import Curso
from Database.classe_empresa import Empresa
from Database.classe_vaga import Vaga
from Database.classe_professor import Professor

homepage_blueprint = Blueprint("homepage", __name__)
@homepage_blueprint.route("/", methods=["GET"])

def dados_homepage():
    aluno = Aluno()
    curso = Curso()
    empresa = Empresa()
    vaga = Vaga()
    professor = Professor()

    n_alunos = aluno.count_total()
    n_cursos = curso.get_numero_cursos()
    n_empresas = empresa.get_numero_empresas()
    n_vagas = vaga.get_numero_vagas()
    n_professores = professor.get_numero_professores()

    ultimos_cursos = curso.get_ultimos_cursos()

    dados_homepage = {
        "num_alunos": n_alunos,
        "num_cursos": n_cursos,
        "num_empresas": n_empresas,
        "num_vagas": n_vagas,
        "num_professores": n_professores,
        "cursos_recentes": ultimos_cursos
    }

    return jsonify(dados_homepage), 200

