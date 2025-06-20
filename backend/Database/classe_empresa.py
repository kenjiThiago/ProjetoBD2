from Database.conector import DatabaseManager

class Empresa():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider
    
    def get_empresas(self, setor: str = "", porte: str = "", localizacao: str = "", search: str = ""):
        query = """
        SELECT 
            e.nome,
            e.setor,
            e.descricao,
            e.localizacao,
            e.porte,
            e.sigla,
            COUNT(DISTINCT v.id) AS numero_vagas
        FROM 
            empresa e
        LEFT JOIN 
            vaga v ON e.nome = v.empresa
        LEFT JOIN 
            habilidade_vaga hv ON v.id = hv.id_vaga
        LEFT JOIN 
            habilidade h ON hv.id_habilidade = h.id
        """

        filtros = []

        if setor:
            filtros.append(f"unaccent(LOWER(e.setor)) LIKE unaccent('%{setor.lower()}%')")

        if porte:
            filtros.append(f"unaccent(LOWER(e.porte)) LIKE unaccent('%{porte.lower()}%')")

        if localizacao:
            filtros.append(f"unaccent(LOWER(e.localizacao)) LIKE unaccent('%{localizacao.lower()}%')")

        if search:
            filtros.append(f"""(
                unaccent(LOWER(e.nome)) LIKE unaccent('%{search.lower()}%') OR
                unaccent(LOWER(v.nome)) LIKE unaccent('%{search.lower()}%') OR
                unaccent(LOWER(h.nome)) LIKE unaccent('%{search.lower()}%')
            )""")

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += """
        GROUP BY 
            e.nome, e.setor, e.descricao, e.localizacao, e.porte
        ORDER BY 
            e.nome ASC
        """

        return self.db.execute_select_all(query)

        
    def get_numero_empresas(self) -> int:
        query = "SELECT COUNT(*) as count FROM empresa"
        result = self.db.execute_select_one(query)
        return result['count']

