from Database.conector import DatabaseManager

class Empresa():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
    
    def get_empresas(self, nome: str = "", setor: str = "", localizacao: str = ""):
        query = """
        SELECT 
            e.nome AS empresa_nome,
            e.localizacao,
            e.setor,
            e.descricao,
            e.porte,
            e.sigla,
            COUNT(v.id) AS numero_vagas
        FROM 
            empresa e
        LEFT JOIN 
            vaga v ON e.nome = v.empresa
        """
        filtros = []

        if nome:
            filtros.append(f"LOWER(e.nome) LIKE '%{nome.lower()}%'")
        if setor:
            filtros.append(f"LOWER(e.setor) LIKE '%{setor.lower()}%'")
        if localizacao:
            filtros.append(f"LOWER(e.localizacao) LIKE '%{localizacao.lower()}%'")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY 
            e.nome, e.localizacao, e.setor, e.descricao, e.porte, e.sigla
        ORDER BY 
            e.nome ASC
        """

        return self.db.execute_select_all(query)
    
    def get_numero_empresas(self) -> int:
        query = "SELECT COUNT(*) as count FROM empresa"
        result = self.db.execute_select_one(query)
        return result['count']

