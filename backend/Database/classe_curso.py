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
            filtros.append(f"LOWER(c.categoria) LIKE '%{categoria.lower()}%'")
        if nivel:
            filtros.append(f"LOWER(c.nivel) LIKE '%{nivel.lower()}%'")
        if acesso:
            filtros.append(f"LOWER(c.acesso) LIKE '%{acesso.lower()}%'")
        if search:
            filtros.append(f"""(
                LOWER(c.nome) LIKE '%{search.lower()}%' OR
                EXISTS (
                    SELECT 1 FROM habilidade_curso hc2
                    JOIN habilidade h2 ON hc2.id_habilidade = h2.id
                    WHERE hc2.nome_curso = c.nome
                    AND LOWER(h2.nome) LIKE '%{search.lower()}%'
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

