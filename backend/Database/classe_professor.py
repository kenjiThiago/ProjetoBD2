from Database.conector import DatabaseManager

class Professor():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
    
    def get_professores(self, nome: str = "", especializacao: str = "", email: str = ""):
        query = """
        SELECT 
            email,
            nome,
            especializacao
        FROM 
            professor
        """
        filtros = []
        
        if nome:
            filtros.append(f"LOWER(nome) LIKE '%{nome.lower()}%'")
        
        if especializacao:
            filtros.append(f"LOWER(especializacao) LIKE '%{especializacao.lower()}%'")
        
        if email:
            filtros.append(f"LOWER(email) LIKE '%{email.lower()}%'")
        
        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += " ORDER BY nome ASC"
        
        return self.db.execute_select_all(query)

    def get_numero_professores(self) -> int:
        query = "SELECT COUNT(*) as count FROM professor"
        result = self.db.execute_select_one(query)
        return result['count']

