from Database.conector import DatabaseManager

class Vaga():
    def __init__(self, db_provider=DatabaseManager()) -> None:
        self.db = db_provider

    def get_vagas(self, id: int = None, nome: str = "", empresa: str = "", requisitos: str = "", ordenar_por: str = "numero_inscritos", ordenar_ordem: str = "DESC", localizacao: str = ""):
        query = """
        SELECT 
            v.id,
            v.nome AS vaga_nome,
            v.descricao,
            v.nivel,
            v.modalidade,
            v.salario,
            v.tempo_aberta,
            v.prazo,
            e.localizacao,
            e.nome AS empresa_nome,
            COUNT(DISTINCT si.cpf_aluno) AS numero_inscritos,
            STRING_AGG(DISTINCT h.nome || ': ' || h.nivel, ', ') AS requisitos
        FROM 
            vaga v
        LEFT JOIN 
            empresa e ON v.empresa = e.nome
        LEFT JOIN 
            se_inscreve si ON v.id = si.id_vaga
        LEFT JOIN 
            habilidade_vaga hv ON v.id = hv.id_vaga
        LEFT JOIN 
            habilidade h ON hv.id_habilidade = h.id
        """
        
        filtros = []

        if id is not None:
            filtros.append(f"v.id = {id}")
        if nome:
            filtros.append(f"LOWER(v.nome) LIKE '%{nome.lower()}%'")
        if empresa:
            filtros.append(f"LOWER(e.nome) LIKE '%{empresa.lower()}%'")
        if localizacao:
            filtros.append(f"LOWER(e.localizacao) LIKE '%{localizacao.lower()}%'")
        if requisitos:
            filtros.append(f"""
            EXISTS (
                SELECT 1 
                FROM habilidade_vaga hv
                JOIN habilidade h ON hv.id_habilidade = h.id
                WHERE hv.id_vaga = v.id AND LOWER(h.nome) LIKE '%{requisitos.lower()}%'
            )
            """)

        if filtros:
            query += " WHERE " + " AND ".join(filtros)

        query += f"""
        GROUP BY 
            v.id, v.nome, v.descricao, v.nivel, v.modalidade, v.salario, v.tempo_aberta, v.prazo, e.localizacao, e.nome
        ORDER BY 
            {ordenar_por} {ordenar_ordem}  
        """

        return self.db.execute_select_all(query)

    def get_numero_vagas(self) -> int:
        query = "SELECT COUNT(*) as count FROM vaga"
        result = self.db.execute_select_one(query)
        return result['count']
    
    def get_vagas_inscritas_por_aluno(self, email_aluno: str, vaga_nome: str = "", empresa_nome: str = "", localizacao: str = "", requisitos: str = "", ordenar_por: str = "numero_inscritos", ordenar_ordem: str = "DESC"):
        # Primeiro, descobrir o CPF do aluno pelo email
        cpf_query = f"""
        SELECT cpf, nome AS aluno_nome
        FROM aluno
        WHERE email = '{email_aluno}'
        """
        aluno_info = self.db.execute_select_one(cpf_query)
        cpf_aluno = aluno_info['cpf']
        aluno_nome = aluno_info['aluno_nome']

        vagas_query = f"""
        SELECT 
            v.id AS vaga_id, 
            v.nome AS vaga_nome,
            v.nivel,
            v.modalidade,
            v.salario,
            v.tempo_aberta,
            v.prazo,
            e.nome AS empresa_nome,
            e.localizacao,
            (
                SELECT COUNT(*) 
                FROM se_inscreve si_sub 
                WHERE si_sub.id_vaga = v.id
            ) AS numero_inscritos,
            json_agg(
                DISTINCT (h.nome || ': ' || h.nivel)
            ) AS requisitos
        FROM 
            se_inscreve si
        INNER JOIN 
            vaga v ON si.id_vaga = v.id
        LEFT JOIN 
            empresa e ON v.empresa = e.nome
        LEFT JOIN 
            habilidade_vaga hv ON v.id = hv.id_vaga
        LEFT JOIN 
            habilidade h ON hv.id_habilidade = h.id
        WHERE 
            si.cpf_aluno = '{cpf_aluno}'
        """

        if vaga_nome:
            vagas_query += f" AND LOWER(v.nome) LIKE '%{vaga_nome.lower()}%'"
        
        if empresa_nome:
            vagas_query += f" AND LOWER(e.nome) LIKE '%{empresa_nome.lower()}%'"
        
        if localizacao:
            vagas_query += f" AND LOWER(e.localizacao) LIKE '%{localizacao.lower()}%'"
        
        if requisitos:
            vagas_query += f"""
            AND EXISTS (
                SELECT 1
                FROM habilidade_vaga hv
                JOIN habilidade h ON hv.id_habilidade = h.id
                WHERE hv.id_vaga = v.id 
                AND LOWER(h.nome) LIKE '%{requisitos.lower()}%'
            )
            """

        vagas_query += f"""
        GROUP BY 
            v.id, v.nome, v.nivel, v.modalidade, v.salario, v.tempo_aberta, v.prazo, e.nome, e.localizacao
        ORDER BY 
            {ordenar_por} {ordenar_ordem}
        """

        vagas_inscritas = self.db.execute_select_all(vagas_query)

        habilidades_query = f"""
        SELECT 
            STRING_AGG(h.nome || ' (' || h.nivel || ')', ', ') AS habilidade
        FROM 
            estuda e
        INNER JOIN 
            habilidade_curso hc ON e.nome_curso = hc.nome_curso
        INNER JOIN 
            habilidade h ON hc.id_habilidade = h.id
        WHERE 
            e.cpf_aluno = '{cpf_aluno}'
        """
        
        habilidades_aluno = self.db.execute_select_all(habilidades_query)

        return {
            "aluno_nome": aluno_nome,
            "habilidades_aluno": [{"habilidade": habilidades_aluno[0]['habilidade']}],
            "vagas_inscritas": vagas_inscritas if vagas_inscritas else []  
        }

