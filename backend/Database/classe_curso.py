from Database.conector import DatabaseManager

class Curso():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider


    def get_cursos(self, categoria: str = "", nivel: str = "", acesso: str = "", search: str = ""):
        query = """
        SELECT
            c.nivel,
            ARRAY_AGG(DISTINCT h.nome) AS habilidades,
            c.nome,
            c.descricao,
            c.categoria,
            p.nome AS nome_professor,
            FLOOR(c.duracao / 60) || 'h ' || (c.duracao % 60) || 'm' AS duracao_formatada,
            COUNT(DISTINCT e.cpf_aluno) AS numero_alunos_concluidos,
            c.acesso,
            TO_CHAR(c.data_lancamento, 'YYYY-MM-DD') AS data_lancamento

        FROM
            curso c
        LEFT JOIN
            estuda e ON c.nome = e.nome_curso
        LEFT JOIN
            habilidade_curso hc ON c.nome = hc.nome_curso
        LEFT JOIN
            habilidade h ON hc.id_habilidade = h.id
        LEFT JOIN
            ministra m ON c.nome = m.nome_curso
        LEFT JOIN
            professor p ON m.email_professor = p.email
        """

        filtros = []

        if categoria:
            filtros.append(f"unaccent(LOWER(c.categoria)) LIKE unaccent('%{categoria.lower()}%')")

        if nivel:
            filtros.append(f"unaccent(LOWER(c.nivel)) LIKE unaccent('%{nivel.lower()}%')")

        if acesso:
            filtros.append(f"unaccent(LOWER(c.acesso)) LIKE unaccent('%{acesso.lower()}%')")

        if search:
            filtros.append(f"""(
                unaccent(LOWER(c.nome)) LIKE unaccent('%{search.lower()}%') OR
                EXISTS (
                    SELECT 1 FROM habilidade_curso hc2
                    JOIN habilidade h2 ON hc2.id_habilidade = h2.id
                    WHERE hc2.nome_curso = c.nome
                    AND unaccent(LOWER(h2.nome)) LIKE unaccent('%{search.lower()}%')
                )
            )""")


        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY
            c.nome, c.descricao, c.duracao, c.nivel, c.data_lancamento, c.acesso, c.categoria, p.nome
        ORDER BY
            c.data_lancamento DESC
        """

        return self.db.execute_select_all(query)



    def get_numero_cursos(self) -> int:
        query = "SELECT COUNT(*) FROM curso"
        result = self.db.execute_select_one(query)
        return result['count']


    def get_ultimos_cursos(self, limite=3):
        query = f"""
        SELECT 
            c.nivel,
            ARRAY_AGG(DISTINCT h.nome) AS habilidades,
            c.nome,
            c.descricao,
            p.nome AS nome_professor,
            FLOOR(c.duracao / 60) || 'h ' || (c.duracao % 60) || 'm' AS duracao_formatada,
            COUNT(DISTINCT e.cpf_aluno) AS numero_alunos_concluidos,
            c.acesso,
            TO_CHAR(c.data_lancamento, 'YYYY-MM-DD') AS data_lancamento,
            c.categoria
        FROM 
            curso c
        LEFT JOIN 
            estuda e ON c.nome = e.nome_curso
        LEFT JOIN 
            habilidade_curso hc ON c.nome = hc.nome_curso
        LEFT JOIN 
            habilidade h ON hc.id_habilidade = h.id
        LEFT JOIN 
            ministra m ON c.nome = m.nome_curso
        LEFT JOIN 
            professor p ON m.email_professor = p.email
        GROUP BY 
            c.nome, c.descricao, c.duracao, c.nivel, c.data_lancamento, c.acesso, c.categoria, p.nome
        ORDER BY 
            c.data_lancamento DESC
        LIMIT {limite}
        """
        return self.db.execute_select_all(query)


    def get_ultimos_cursos(self):
        query = """
        SELECT 
            c.nome,
            c.descricao,
            c.nivel,
            c.categoria,
            c.acesso,
            TO_CHAR(c.data_lancamento, 'YYYY-MM-DD') AS data_lancamento,
            CONCAT(FLOOR(SUM(a.duracao) / 60), 'h ', MOD(SUM(a.duracao), 60), 'm') AS duracao_total,
            COALESCE(p.nome, 'Desconhecido') AS nome_professor,
            COUNT(DISTINCT e.cpf_aluno) AS num_alunos_inscritos,
            ARRAY_AGG(DISTINCT h.nome) FILTER (WHERE h.nome IS NOT NULL) AS habilidades
        FROM curso c
        LEFT JOIN aula a ON a.nome_curso = c.nome
        LEFT JOIN estuda e ON e.nome_curso = c.nome
        LEFT JOIN ministra m ON m.nome_curso = c.nome
        LEFT JOIN professor p ON p.email = m.email_professor
        LEFT JOIN habilidade_curso hc ON hc.nome_curso = c.nome
        LEFT JOIN habilidade h ON h.id = hc.id_habilidade
        GROUP BY c.nome, c.descricao, c.nivel, c.categoria, c.acesso, c.data_lancamento, p.nome
        ORDER BY c.data_lancamento DESC
        LIMIT 3
        """
        return self.db.execute_select_all(query)

