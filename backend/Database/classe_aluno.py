from Database.conector import DatabaseManager
from datetime import datetime

class Aluno():
    def __init__(self, db_provider=DatabaseManager()) -> None:
        self.db = db_provider

    def get_alunos(self, nome: str = "", plano: str = "", email: str = ""):
        current_date = datetime.now().date()

        query = f"""
        SELECT 
            a.cpf,
            a.email,
            a.nome,
            TO_CHAR(a.data_nascimento, 'YYYY-MM-DD') AS data_nascimento,
            a.plano,
            a.forma_pagamento,
            COUNT(si.id_vaga) AS numero_inscricoes,
            DATE_PART('year', AGE('{current_date}', a.data_nascimento))::INT AS idade
        FROM 
            aluno a
        LEFT JOIN 
            se_inscreve si ON a.cpf = si.cpf_aluno
        """

        filtros = []

        if nome:
            filtros.append(f"LOWER(a.nome) LIKE '%{nome.lower()}%'")
        if plano:
            filtros.append(f"LOWER(a.plano) = '{plano.lower()}'")
        if email:
            filtros.append(f"LOWER(a.email) LIKE '%{email.lower()}%'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY 
            a.cpf, a.email, a.nome, a.data_nascimento, a.plano, a.forma_pagamento
        ORDER BY 
            a.nome ASC
        """

        return self.db.execute_select_all(query)

        
    def get_info_geral(self, cpf: str):
        query = f"""
        SELECT
            -- Vagas inscritas
            (SELECT COUNT(*) FROM se_inscreve WHERE cpf_aluno = '{cpf}') AS num_vagas_inscritas,

            -- Cursos concluídos
            (SELECT COUNT(DISTINCT nome_curso) FROM estuda WHERE cpf_aluno = '{cpf}' AND data_conclusao IS NOT NULL) AS num_certificados,

            -- Horas de estudo (soma duração dos cursos concluídos)
            COALESCE((
                SELECT SUM(c.duracao) 
                FROM estuda e
                JOIN curso c ON e.nome_curso = c.nome
                WHERE e.cpf_aluno = '{cpf}' AND e.data_conclusao IS NOT NULL
            ), 0) AS num_horas_estudo,

            -- Cursos em andamento
            (SELECT COUNT(DISTINCT nome_curso) FROM estuda WHERE cpf_aluno = '{cpf}' AND data_conclusao IS NULL) AS num_cursos_andamento,

            -- Plano do aluno
            (SELECT plano FROM aluno WHERE cpf = '{cpf}') AS plano,

            -- Total de cursos inscritos
            (SELECT COUNT(DISTINCT nome_curso) FROM estuda WHERE cpf_aluno = '{cpf}') AS total_cursos
        ;
        """

        result = self.db.execute_select_one(query)
        return result
    

