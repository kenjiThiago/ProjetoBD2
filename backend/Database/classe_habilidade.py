from Database.conector import DatabaseManager

class Habilidade():
    def __init__(self, db_provider=DatabaseManager()) -> None:
        self.db = db_provider

    def get_habilidades(self, nome: str = "", nivel: str = ""):
        query = """
        SELECT 
            id,
            nome,
            nivel
        FROM 
            habilidade
        """
        filtros = []

        if nome:
            filtros.append(f"LOWER(nome) LIKE '%{nome.lower()}%'")
        if nivel:
            filtros.append(f"LOWER(nivel) = '{nivel.lower()}'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += " ORDER BY nome ASC"

        return self.db.execute_select_all(query)

    def get_numero_habilidades(self) -> int:
        query = "SELECT COUNT(*) as count FROM habilidade"
        result = self.db.execute_select_one(query)
        return result['count']

