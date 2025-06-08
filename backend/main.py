from flask import Flask
from flask_cors import CORS

from Rotas.rota_homepage import homepage_blueprint
from Rotas.rota_aluno import aluno_blueprint
from Rotas.rota_curso import curso_blueprint
from Rotas.rota_empresa import empresa_blueprint
from Rotas.rota_professor import professor_blueprint
from Rotas.rota_vaga import vaga_blueprint
from Rotas.rota_vagas_inscritas import vagas_inscritas_blueprint
from Rotas.rota_vagas_da_empresa import vagas_empresa_blueprint
from Rotas.rota_alunos_formados import alunos_formados_blueprint
from Rotas.rota_cursos_necessarios import cursos_necessarios_blueprint
from Rotas.rota_alunos_inscritos import alunos_inscritos_blueprint
from Rotas.rota_dashboard import dashboard_blueprint

app = Flask(__name__)
CORS(app, origins="*")

app.register_blueprint(homepage_blueprint)
app.register_blueprint(aluno_blueprint)
app.register_blueprint(curso_blueprint)
app.register_blueprint(empresa_blueprint)
app.register_blueprint(professor_blueprint)
app.register_blueprint(vaga_blueprint)
app.register_blueprint(vagas_inscritas_blueprint)
app.register_blueprint(vagas_empresa_blueprint)
app.register_blueprint(alunos_formados_blueprint)
app.register_blueprint(cursos_necessarios_blueprint)
app.register_blueprint(alunos_inscritos_blueprint)
app.register_blueprint(dashboard_blueprint)

app.run("0.0.0.0", port=8000, debug=False)

