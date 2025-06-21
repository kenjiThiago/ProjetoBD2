from Database.conector import DatabaseManager
from datetime import datetime

class Aluno():
    def __init__(self, db_provider=DatabaseManager()) -> None:
        self.db = db_provider

    def get_alunos(self, nome: str = "", plano: str = "", email: str = "", cpf: str = ""):
        current_date = datetime.now().date()

        query = f"""
        SELECT 
            a.cpf,
            a.nome,
            a.email,
            TO_CHAR(a.data_nascimento, 'YYYY-MM-DD') AS data_nascimento,
            a.plano,
            a.forma_pagamento,

            -- Número de vagas inscritas
            (SELECT COUNT(*) FROM se_inscreve si WHERE si.cpf_aluno = a.cpf) AS num_vagas_inscritas,

            (
                SELECT COUNT(*) FROM (
                    SELECT c.nome
                    FROM curso c
                    INNER JOIN estuda e ON e.nome_curso = c.nome AND e.cpf_aluno = a.cpf
                    LEFT JOIN aula aul ON aul.nome_curso = c.nome
                    LEFT JOIN assiste ass ON ass.nome_aula = aul.nome AND ass.cpf_aluno = a.cpf
                    GROUP BY c.nome
                    HAVING COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN aul.nome END)
                           = COUNT(DISTINCT aul.nome)
                ) AS cursos_concluidos
            ) AS num_certificados,

            -- Número de horas de estudo
            COALESCE((
                SELECT SUM(c.duracao) 
                FROM estuda e
                JOIN curso c ON c.nome = e.nome_curso
                WHERE e.cpf_aluno = a.cpf AND e.data_conclusao IS NOT NULL
            ), 0) AS num_horas_estudo,

            -- Número de cursos em andamento (baseado em aulas concluídas < total de aulas)
            (
                SELECT COUNT(*) FROM (
                    SELECT c.nome
                    FROM curso c
                    INNER JOIN estuda e ON e.nome_curso = c.nome AND e.cpf_aluno = a.cpf
                    LEFT JOIN aula aul ON aul.nome_curso = c.nome
                    LEFT JOIN assiste ass ON ass.nome_aula = aul.nome AND ass.cpf_aluno = a.cpf
                    GROUP BY c.nome
                    HAVING COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN aul.nome END)
                           < COUNT(DISTINCT aul.nome)
                ) AS cursos_em_andamento
            ) AS num_cursos_andamento,

            -- Total de cursos
            (SELECT COUNT(DISTINCT nome_curso) FROM estuda e WHERE e.cpf_aluno = a.cpf) AS total_cursos,

            -- Idade (opcional, você já estava usando)
            DATE_PART('year', AGE('{current_date}', a.data_nascimento))::INT AS idade

        FROM 
            aluno a
        """

        filtros = []

        if nome:
            filtros.append(f"unaccent(LOWER(a.nome)) LIKE unaccent('%{nome.lower()}%')")
        if plano:
            filtros.append(f"unaccent(LOWER(a.plano)) = unaccent('{plano.lower()}')")
        if email:
            filtros.append(f"unaccent(LOWER(a.email)) LIKE unaccent('%{email.lower()}%')")

        if cpf:
            cpf = cpf.strip()
            filtros.append(f"a.cpf LIKE '%{cpf}%'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        ORDER BY 
            a.nome ASC
        """

        return self.db.execute_select_all(query)

    def get_cursos_do_aluno(
        self, cpf_aluno: str, categoria: str = "", nivel: str = "",
        status: str = "", search: str = ""
    ):
        query = f"""
        SELECT 
            c.nome AS nome,
            c.nivel,
            p.nome AS professor,
            CONCAT(FLOOR(SUM(a.duracao) / 60), 'h ', MOD(SUM(a.duracao), 60), 'm') AS duracao_total,
            STRING_AGG(DISTINCT h.nome, ', ') AS habilidades,
            COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN a.nome END) AS aulas_concluidas,
            COUNT(DISTINCT a.nome) AS total_aulas
        FROM curso c
        INNER JOIN estuda e ON e.nome_curso = c.nome AND e.cpf_aluno = '{cpf_aluno}'
        LEFT JOIN ministra m ON m.nome_curso = c.nome
        LEFT JOIN professor p ON p.email = m.email_professor
        LEFT JOIN aula a ON a.nome_curso = c.nome
        LEFT JOIN assiste ass ON ass.nome_aula = a.nome AND ass.cpf_aluno = '{cpf_aluno}'
        LEFT JOIN habilidade_curso hc ON hc.nome_curso = c.nome
        LEFT JOIN habilidade h ON hc.id_habilidade = h.id
        """

        filtros = []

        if categoria:
            filtros.append(f"unaccent(LOWER(c.categoria)) LIKE unaccent('%{categoria.lower()}%')")

        if nivel:
            filtros.append(f"unaccent(LOWER(c.nivel)) LIKE unaccent('%{nivel.lower()}%')")

        if search:
            search = search.lower()
            filtros.append(f"""(
                unaccent(LOWER(c.nome)) LIKE unaccent('%{search}%')
                OR unaccent(LOWER(h.nome)) LIKE unaccent('%{search}%')
            )""")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY c.nome, c.nivel, p.nome
        """

        if status.lower() == "concluidos":
            query += """
        HAVING COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN a.nome END) = 
               COUNT(DISTINCT a.nome)
            """
        elif status.lower() == "em andamento":
            query += """
        HAVING COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN a.nome END) < 
               COUNT(DISTINCT a.nome)
            """

        query += """
        ORDER BY c.nome
        """

        return self.db.execute_select_all(query)


    def get_visao_geral_cursos_nao_concluidos(self, cpf_aluno: str):
        query = f"""
        SELECT 
            c.nome,
            c.descricao,
            COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN aul.nome END) AS aulas_concluidas,
            COUNT(DISTINCT aul.nome) AS total_aulas,
            (
                SELECT STRING_AGG(DISTINCT h.nome || ': ' || h.nivel, ', ')
                FROM estuda e2
                JOIN habilidade_curso hc2 ON hc2.nome_curso = e2.nome_curso
                JOIN habilidade h ON h.id = hc2.id_habilidade
                WHERE e2.cpf_aluno = '{cpf_aluno}' AND e2.data_conclusao IS NOT NULL
            ) AS habilidades_aluno
        FROM curso c
        INNER JOIN estuda e ON e.nome_curso = c.nome AND e.cpf_aluno = '{cpf_aluno}'
        LEFT JOIN aula aul ON aul.nome_curso = c.nome
        LEFT JOIN assiste ass ON ass.nome_aula = aul.nome AND ass.cpf_aluno = '{cpf_aluno}'
        GROUP BY c.nome, c.descricao
        HAVING COUNT(DISTINCT CASE WHEN ass.data_conclusao IS NOT NULL THEN aul.nome END) < COUNT(DISTINCT aul.nome)
        ORDER BY c.nome
        LIMIT 3
        """
        return self.db.execute_select_all(query)

    def count_total(self):
        query = "SELECT COUNT(*) AS total FROM aluno"
        result = self.db.execute_select_one(query)
        return result["total"]

