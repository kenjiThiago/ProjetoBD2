from Database.conector import DatabaseManager

class Curso():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
    
    def get_cursos(self, nome: str = "", duracao: int = None, nivel: str = "", habilidade: str = ""):
        query = """
        SELECT 
            c.nome,
            c.descricao,
            c.duracao,
            c.nivel,
            TO_CHAR(c.data_lancamento, 'DD/MM/YYYY') AS data_lancamento,
            COUNT(e.email_aluno) AS numero_alunos_concluidos,
            STRING_AGG(DISTINCT h.nome || ': ' || h.nivel, ', ') AS habilidades -- Corrigindo a formatação das habilidades
        FROM 
            curso c
        LEFT JOIN 
            estuda e ON c.nome = e.nome_curso AND e.data_conclusao IS NOT NULL
        LEFT JOIN 
            habilidade_curso hc ON c.nome = hc.nome_curso
        LEFT JOIN 
            habilidade h ON hc.id_habilidade = h.id
        """
        
        filtros = []

        if nome:
            filtros.append(f"LOWER(c.nome) LIKE '%{nome.lower()}%'")
        
        if duracao is not None:
            filtros.append(f"c.duracao = {duracao}")
        
        if nivel:
            filtros.append(f"LOWER(c.nivel) = '{nivel.lower()}'")

        if habilidade:
            filtros.append(f"""
            EXISTS (
                SELECT 1
                FROM habilidade_curso hc
                JOIN habilidade h ON hc.id_habilidade = h.id
                WHERE hc.nome_curso = c.nome
                AND LOWER(h.nome) LIKE '%{habilidade.lower()}%'
            )
            """
          )
        
        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY 
            c.nome, c.descricao, c.duracao, c.nivel, c.data_lancamento
        """
        query += " ORDER BY c.nome ASC"

        return self.db.execute_select_all(query)




    def get_numero_cursos(self) -> int:
        query = "SELECT COUNT(*) FROM curso"
        result = self.db.execute_select_one(query)
        return result['count']
