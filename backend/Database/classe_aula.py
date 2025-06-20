from Database.conector import DatabaseManager

class Aula():
    def __init__(self, db_provider=DatabaseManager()) -> None:
        self.db = db_provider

    def get_aulas(self, nome_curso: str = "", nome: str = "", tipo: str = ""):
        query = """
        SELECT 
            nome,
            nome_curso,
            descricao,
            duracao,
            tipo,
            ordem_dentro_modulo
        FROM 
            aula
        """
        filtros = []

        if nome_curso:
            filtros.append(f"LOWER(nome_curso) LIKE '%{nome_curso.lower()}%'")
        if nome:
            filtros.append(f"LOWER(nome) LIKE '%{nome.lower()}%'")
        if tipo:
            filtros.append(f"LOWER(tipo::text) = '{tipo.lower()}'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += " ORDER BY nome_curso, ordem_dentro_modulo"

        return self.db.execute_select_all(query)

    def get_numero_aulas(self) -> int:
        query = "SELECT COUNT(*) as count FROM aula"
        result = self.db.execute_select_one(query)
        return result['count']

