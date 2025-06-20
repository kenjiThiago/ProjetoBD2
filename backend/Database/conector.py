from typing import Any
import psycopg2
from psycopg2.extras import DictCursor

class DatabaseManager:
    "Classe de Gerenciamento do database"

    def __init__(self) -> None:
        self.conn = psycopg2.connect(
            dbname="codify",
            user="postgres",
            password="1234",
            host="127.0.0.1",
            port=5432,
        )
        self.cursor = self.conn.cursor(cursor_factory=DictCursor)

    def execute_statement(self, statement: str) -> None:
        "Usado para Inserções, Deleções, Alter Tables"
        try:
            self.cursor.execute(statement)
            self.conn.commit()
        except psycopg2.Error as e:
            self.conn.rollback()  # Reverte transação em caso de erro
            print(f"Erro ao executar o comando: {e}")
            raise e

    def execute_select_all(self, query: str) -> list[dict[str, Any]]:
        "Usado para SELECTS no geral"
        try:
            self.cursor.execute(query)
            return [dict(item) for item in self.cursor.fetchall()]
        except psycopg2.Error as e:
            self.conn.rollback()  # Reverte transação em caso de erro
            print(f"Erro ao executar a consulta: {query}\n{e}")
            raise e

    def execute_select_one(self, query: str) -> dict | None:
        "Usado para SELECT com apenas uma linha de resposta"
        try:
            self.cursor.execute(query)
            query_result = self.cursor.fetchone()

            if not query_result:
                return None

            return dict(query_result)
        except psycopg2.Error as e:
            self.conn.rollback()  # Reverte transação em caso de erro
            print(f"Erro ao executar a consulta: {query}\n{e}")
            raise e
