import sqlite3

def conectar():
  conn = sqlite3.connect('hotelzinho.db')
  conn.execute("PRAGMA foreign_keys = ON")
  return conn

def criar_tabelas():
  conn = conectar()
  curcor = conn.cursor()
  cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_completo TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            telefone TEXT
        )
    ''')
  cursor.execute('''
        CREATE TABLE IF NOT EXISTS caes (
            id_cao INTEGER PRIMARY KEY AUTOINCREMENT,
            id_dono INTEGER NOT NULL,
            nome_pet TEXT NOT NULL,
            raca TEXT,
            FOREIGN KEY (id_dono) REFERENCES usuarios (id_usuario)
        )
    ''')
  conn.commit()
  conn.close()

def cadastro(nome,email,senha,tel):
  conn = conectar()
  cursor = conn.cursor
  try:
    cursor.execute('''
            INSERT INTO usuarios (nome_completo, email, senha, telefone)
            VALUES (?, ?, ?, ?)
        ''', (nome, email, senha, tel))
        conn.commit()
     return True
  except sqlite3.IntegrityError:
    print("Erro: Este e-mail já está cadastrado!")
        return False
    finally:
        conn.close()

if __name__ == '__main__':
  criar_tabelas()
