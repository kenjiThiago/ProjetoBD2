from Database.conector import DatabaseManager
from datetime import datetime

class Aluno():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
    
    def get_alunos(self, nome: str = "", status_plano: str = "", email: str = ""):
       # para calcular a idade
        current_date = datetime.now().date()

        query = f"""
        SELECT 
            a.email,
            a.nome,
            TO_CHAR(a.data_nascimento, 'YYYY-MM-DD') AS data_nascimento,
            a.status_plano,
            COUNT(si.id_vaga) AS numero_inscricoes,
            DATE_PART('year', AGE('{current_date}', a.data_nascimento))::INT AS idade
        FROM 
            aluno a
        LEFT JOIN 
            se_inscreve si ON a.email = si.email_aluno
        """
        filtros = []

        if nome:
            filtros.append(f"LOWER(a.nome) LIKE '%{nome.lower()}%'")
        if status_plano:
            filtros.append(f"LOWER(a.status_plano) = '{status_plano.lower()}'")
        if email:
            filtros.append(f"LOWER(a.email) LIKE '%{email.lower()}%'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY 
            a.email, a.nome, a.data_nascimento, a.status_plano
        ORDER BY 
            a.nome ASC
        """

        return self.db.execute_select_all(query)

    def count_ativos(self) -> int:
        query = "SELECT COUNT(*) as count FROM aluno WHERE status_plano = 'ativo'"
        result = self.db.execute_select_one(query)
        return result['count']  
    
    def count_inativos(self) -> int:
        query = "SELECT COUNT(*) as count FROM aluno WHERE status_plano = 'inativo'"
        result = self.db.execute_select_one(query)
        return result['count']  