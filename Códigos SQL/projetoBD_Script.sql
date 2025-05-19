CREATE TYPE TIPOAULA AS ENUM ('video', 'texto');

-- Tabela Aluno
CREATE TABLE Aluno (
    email           VARCHAR(100)    PRIMARY KEY,
    nome            VARCHAR(100)    NOT NULL,
    data_nascimento DATE,
    status_plano    VARCHAR(50)
);

-- Tabela Professor
CREATE TABLE Professor (
    email           VARCHAR(100)    PRIMARY KEY,
    nome            VARCHAR(100)    NOT NULL,
    especializacao  VARCHAR(100)
);

-- Tabela Habilidade
CREATE TABLE Habilidade (
    id              INT             PRIMARY KEY,
    nome            VARCHAR(100),
    nivel           VARCHAR(50)
);

-- Tabela Curso
CREATE TABLE Curso (
    nome            VARCHAR(100)    PRIMARY KEY,
    descricao       TEXT,
    duracao         INT,
    nivel           VARCHAR(50),
    data_lancamento DATE
);

--Tabela Habilidade_Curso
CREATE TABLE Habilidade_Curso (
    nome_curso     VARCHAR(100),
    id_habilidade  INT,

    PRIMARY KEY (nome_curso, id_habilidade),
    FOREIGN KEY (nome_curso)    REFERENCES Curso(nome),
    FOREIGN KEY (id_habilidade) REFERENCES Habilidade(id)
);

-- Tabela Modulo
CREATE TABLE Modulo (
    nome_curso          VARCHAR(100)    NOT NULL,
    nome                VARCHAR(100)    PRIMARY KEY,
    descricao           TEXT,
    ordem_dentro_curso  INT,

    FOREIGN KEY (nome_curso)    REFERENCES Curso(nome)
);

-- Tabela Aula
CREATE TABLE Aula (
    nome_modulo         VARCHAR(100)    NOT NULL,
    nome                VARCHAR(100)    PRIMARY KEY,
    descricao           TEXT,
    duracao             INT,
    tipo                TIPOAULA,
    ordem_dentro_modulo INT,

    FOREIGN KEY (nome_modulo)   REFERENCES Modulo(nome)
);

-- Tabela Empresa
CREATE TABLE Empresa (
    nome        VARCHAR(100)    PRIMARY KEY,
    localizacao VARCHAR(100),
    setor       VARCHAR(50)
);

-- Tabela Vaga
CREATE TABLE Vaga (
    id          INT         PRIMARY KEY,
    nome        VARCHAR(100),
    descricao   TEXT,
    empresa     VARCHAR(100),

    FOREIGN KEY (empresa)   REFERENCES Empresa(nome)
);

-- Tabela de Relacionamento Estudam (Aluno-Curso)
CREATE TABLE Estuda (
    email_aluno     VARCHAR(100),
    nome_curso      VARCHAR(100),
    data_conclusao  DATE,
    nota            DECIMAL(5, 2),

    PRIMARY KEY (email_aluno, nome_curso),
    FOREIGN KEY (email_aluno)   REFERENCES Aluno(email),
    FOREIGN KEY (nome_curso)    REFERENCES Curso(nome)
);

-- Tabela de Relacionamento Ministram (Professor-Curso)
CREATE TABLE Ministra (
    email_professor VARCHAR(100),
    nome_curso      VARCHAR(100),

    PRIMARY KEY (email_professor, nome_curso),
    FOREIGN KEY (email_professor)   REFERENCES Professor(email),
    FOREIGN KEY (nome_curso)        REFERENCES Curso(nome)
);

-- Tabela de Relacionamento Se_inscreve (Aluno-Vaga)
CREATE TABLE Se_Inscreve (
    email_aluno VARCHAR(100),
    id_vaga     INT,

    PRIMARY KEY (email_aluno, id_vaga),
    FOREIGN KEY (email_aluno)   REFERENCES Aluno(email),
    FOREIGN KEY (id_vaga)       REFERENCES Vaga(id)
);

--Tabela Habilidade_Vaga
CREATE TABLE Habilidade_Vaga (
    id_vaga        INT,
    id_habilidade  INT,

    PRIMARY KEY (id_vaga, id_habilidade),
    FOREIGN KEY (id_vaga)       REFERENCES Vaga(id),
    FOREIGN KEY (id_habilidade) REFERENCES Habilidade(id)
);

INSERT INTO Aluno (email, nome, data_nascimento, status_plano) VALUES
('joão.silva@gmail.com', 'João Silva', '2000-03-15', 'ativo'),
('maria.oliveira@gmail.com', 'Maria Oliveira', '1999-08-22', 'inativo'),
('pedro.costa@gmail.com', 'Pedro Costa', '2001-11-05', 'ativo'),
('ana.santos@gmail.com', 'Ana Santos', '2000-01-12', 'ativo'),
('lucas.pereira@gmail.com', 'Lucas Pereira', '1998-09-30', 'inativo'),
('beatriz.rodrigues@gmail.com', 'Beatriz Rodrigues', '1997-07-20', 'ativo'),
('rafael.almeida@gmail.com', 'Rafael Almeida', '2002-02-27', 'ativo'),
('fernanda.lima@gmail.com', 'Fernanda Lima', '1996-10-10', 'inativo'),
('gabriel.ferreira@gmail.com', 'Gabriel Ferreira', '2000-06-18', 'ativo'),
('juliana.sousa@gmail.com', 'Juliana Sousa', '2001-03-03', 'ativo'),
('andré.moreira@gmail.com', 'André Moreira', '1999-12-22', 'inativo'),
('carolina.fernandes@gmail.com', 'Carolina Fernandes', '1998-08-15', 'ativo'),
('tiago.cardoso@gmail.com', 'Tiago Cardoso', '2002-04-14', 'inativo'),
('amanda.souza@gmail.com', 'Amanda Souza', '1997-11-29', 'ativo'),
('bruno.marques@gmail.com', 'Bruno Marques', '1995-01-19', 'inativo'),
('larissa.rocha@gmail.com', 'Larissa Rocha', '2001-05-09', 'ativo'),
('carlos.nascimento@gmail.com', 'Carlos Nascimento', '1996-09-25', 'ativo'),
('patrícia.dias@gmail.com', 'Patrícia Dias', '1999-07-07', 'inativo'),
('renato.martins@gmail.com', 'Renato Martins', '2002-12-31', 'ativo'),
('vanessa.campos@gmail.com', 'Vanessa Campos', '2000-02-11', 'ativo'),
('evelyn.das.neves@gmail.com', 'Evelyn das Neves', '1999-11-30', 'ativo'),
('manuela.fernandes@gmail.com', 'Manuela Fernandes', '1993-04-22', 'inativo'),
('catarina.da.cruz@gmail.com', 'Catarina da Cruz', '1993-01-07', 'ativo'),
('emilly.peixoto@gmail.com', 'Emilly Peixoto', '1981-03-22', 'ativo'),
('heitor.silveira@gmail.com', 'Heitor Silveira', '2001-02-20', 'inativo'),
('ana.rodrigues@gmail.com', 'Ana Rodrigues', '1998-01-25', 'ativo'),
('benício.oliveira@gmail.com', 'Benício Oliveira', '2010-02-09', 'ativo'),
('miguel.souza@gmail.com', 'Miguel Souza', '1993-03-14', 'ativo'),
('enzo.gabriel.costela@gmail.com', 'Enzo Gabriel Costela', '1998-02-08', 'inativo'),
('gustavo.araújo@gmail.com', 'Gustavo Araújo', '1995-05-29', 'ativo'),
('anthony.oliveira@gmail.com', 'Anthony Oliveira', '2009-03-29', 'inativo'),
('pietro.carvalho@gmail.com', 'Pietro Carvalho', '1999-09-13', 'ativo'),
('nathan.martins@gmail.com', 'Nathan Martins', '2003-10-24', 'ativo'),
('bianca.fernandes@gmail.com', 'Bianca Fernandes', '1972-10-06', 'inativo'),
('stephany.nascimento@gmail.com', 'Stephany Nascimento', '1988-11-06', 'ativo'),
('maria.luiza.cavalcanti@gmail.com', 'Maria Luiza Cavalcanti', '1982-06-10', 'ativo'),
('bryan.rodrigues@gmail.com', 'Bryan Rodrigues', '1993-04-19', 'ativo'),
('gabriela.lima@gmail.com', 'Gabriela Lima', '2004-10-02', 'inativo'),
('murilo.cardoso@gmail.com', 'Murilo Cardoso', '1995-10-10', 'ativo'),
('vitor.hugo.farias@gmail.com', 'Vitor Hugo Farias', '1989-02-16', 'ativo'),
('mirella.dias@gmail.com', 'Mirella Dias', '1974-05-24', 'ativo'),
('gustavo.henrique.monteiro@gmail.com', 'Gustavo Henrique Monteiro', '1986-04-16', 'ativo'),
('felipe.campos@gmail.com', 'Felipe Campos', '1970-05-31', 'ativo'),
('joaquim.pires@gmail.com', 'Joaquim Pires', '1986-02-07', 'ativo'),
('augusto.santos@gmail.com', 'Augusto Santos', '1976-11-13', 'ativo'),
('eduarda.caldeira@gmail.com', 'Eduarda Caldeira', '1996-05-26', 'ativo'),
('isabella.ramos@gmail.com', 'Isabella Ramos', '1984-01-18', 'ativo'),
('mariane.da.rocha@gmail.com', 'Mariane da Rocha', '1981-11-22', 'ativo'),
('bernardo.da.mata@gmail.com', 'Bernardo da Mata', '1989-11-12', 'ativo'),
('isabelly.pinto@gmail.com', 'Isabelly Pinto', '1992-03-04', 'ativo'),
('ana.clara.barbosa@gmail.com', 'Ana Clara Barbosa', '1984-05-01', 'ativo'),
('natália.araújo@gmail.com', 'Natália Araújo', '1992-07-11', 'ativo'),
('julia.da.costa@gmail.com', 'Julia da Costa', '2004-01-18', 'ativo'),
('antônio.da.costa@gmail.com', 'Antônio da Costa', '1998-05-27', 'ativo'),
('olivia.castro@gmail.com', 'Olivia Castro', '2008-02-10', 'ativo'),
('sophia.aragão@gmail.com', 'Sophia Aragão', '1970-01-02', 'ativo'),
('evelyn.cavalcanti@gmail.com', 'Evelyn Cavalcanti', '1981-12-05', 'inativo'),
('enrico.duarte@gmail.com', 'Enrico Duarte', '1985-02-19', 'ativo'),
('lorenzo.azevedo@gmail.com', 'Lorenzo Azevedo', '2010-07-04', 'ativo'),
('yasmin.nascimento@gmail.com', 'Yasmin Nascimento', '2000-01-19', 'ativo'),
('pietro.moraes@gmail.com', 'Pietro Moraes', '1996-01-30', 'ativo'),
('levi.aragão@gmail.com', 'Levi Aragão', '1992-09-09', 'ativo'),
('kaique.nogueira@gmail.com', 'Kaique Nogueira', '1999-11-30', 'ativo'),
('laís.pires@gmail.com', 'Laís Pires', '1999-04-10', 'inativo'),
('mariana.caldeira@gmail.com', 'Mariana Caldeira', '1999-02-20', 'ativo'),
('emilly.rocha@gmail.com', 'Emilly Rocha', '1978-05-24', 'ativo'),
('pedro.henrique.silva@gmail.com', 'Pedro Henrique Silva', '1973-12-12', 'inativo'),
('lucas.campos@gmail.com', 'Lucas Campos', '1976-12-23', 'inativo'),
('amanda.moreira@gmail.com', 'Amanda Moreira', '2011-08-12', 'ativo'),
('yuri.souza@gmail.com', 'Yuri Souza', '2008-01-08', 'ativo'),
('vitor.hugo.almeida@gmail.com', 'Vitor Hugo Almeida', '1991-01-10', 'inativo'),
('calebe.cunha@gmail.com', 'Calebe Cunha', '1976-02-11', 'ativo'),
('luiza.santos@gmail.com', 'Luiza Santos', '2000-10-14', 'ativo'),
('pietro.gonçalves@gmail.com', 'Pietro Gonçalves', '1989-06-20', 'ativo'),
('arthur.lopes@gmail.com', 'Arthur Lopes', '1987-09-21', 'ativo'),
('otávio.da.paz@gmail.com', 'Otávio da Paz', '1977-12-27', 'ativo'),
('joão.lucas.mendes@gmail.com', 'João Lucas Mendes', '1991-04-26', 'ativo'),
('clarice.da.luz@gmail.com', 'Clarice da Luz', '2006-05-13', 'ativo'),
('samuel.lopes@gmail.com', 'Samuel Lopes', '1995-01-24', 'ativo'),
('luiz.otávio.gonçalves@gmail.com', 'Luiz Otávio Gonçalves', '1981-06-24', 'ativo'),
('guilherme.moura@gmail.com', 'Guilherme Moura', '1970-12-03', 'ativo'),
('larissa.peixoto@gmail.com', 'Larissa Peixoto', '1992-02-04', 'ativo'),
('rodrigo.duarte@gmail.com', 'Rodrigo Duarte', '1986-07-21', 'ativo'),
('nathan.da.cunha@gmail.com', 'Nathan da Cunha', '1995-03-28', 'ativo'),
('alexandre.carvalho@gmail.com', 'Alexandre Carvalho', '1985-04-28', 'inativo'),
('evelyn.cardoso@gmail.com', 'Evelyn Cardoso', '2001-01-31', 'ativo'),
('francisco.peixoto@gmail.com', 'Francisco Peixoto', '1981-07-11', 'inativo'),
('maria.alice.cardoso@gmail.com', 'Maria Alice Cardoso', '2011-06-01', 'ativo'),
('calebe.novaes@gmail.com', 'Calebe Novaes', '1991-02-19', 'ativo'),
('letícia.ribeiro@gmail.com', 'Letícia Ribeiro', '1986-06-22', 'ativo'),
('agatha.nunes@gmail.com', 'Agatha Nunes', '1991-07-15', 'ativo'),
('vinicius.cavalcanti@gmail.com', 'Vinicius Cavalcanti', '1979-08-23', 'ativo'),
('alana.cardoso@gmail.com', 'Alana Cardoso', '1984-05-01', 'ativo'),
('cauê.caldeira@gmail.com', 'Cauê Caldeira', '1998-08-27', 'ativo'),
('alice.gomes@gmail.com', 'Alice Gomes', '2002-04-21', 'ativo'),
('vicente.ribeiro@gmail.com', 'Vicente Ribeiro', '1974-01-03', 'ativo'),
('thales.duarte@gmail.com', 'Thales Duarte', '2001-01-10', 'inativo'),
('enzo.gabriel.nascimento@gmail.com', 'Enzo Gabriel Nascimento', '1977-03-02', 'ativo'),
('marcos.vinicius.araújo@gmail.com', 'Marcos Vinicius Araújo', '1980-02-10', 'ativo'),
('mirella.lima@gmail.com', 'Mirella Lima', '1972-09-27', 'ativo'),
('caroline.cardoso@gmail.com', 'Caroline Cardoso', '1997-07-20', 'ativo'),
('diego.da.mata@gmail.com', 'Diego da Mata', '1971-05-12', 'ativo'),
('ana.vitória.silva@gmail.com', 'Ana Vitória Silva', '1998-06-28', 'ativo'),
('ana.lívia.rocha@gmail.com', 'Ana Lívia Rocha', '1980-04-30', 'ativo'),
('pietra.barbosa@gmail.com', 'Pietra Barbosa', '1980-05-09', 'ativo'),
('beatriz.novaes@gmail.com', 'Beatriz Novaes', '1969-12-20', 'ativo'),
('joaquim.barbosa@gmail.com', 'Joaquim Barbosa', '1994-08-20', 'ativo'),
('vitor.hugo.aragão@gmail.com', 'Vitor Hugo Aragão', '1981-03-17', 'ativo'),
('anthony.cunha@gmail.com', 'Anthony Cunha', '1972-08-05', 'ativo'),
('maria.eduarda.teixeira@gmail.com', 'Maria Eduarda Teixeira', '1982-09-15', 'ativo'),
('brenda.aragão@gmail.com', 'Brenda Aragão', '1980-03-14', 'ativo'),
('enzo.pereira@gmail.com', 'Enzo Pereira', '2010-01-25', 'ativo'),
('ana.laura.cardoso@gmail.com', 'Ana Laura Cardoso', '2004-12-24', 'ativo'),
('marcos.vinicius.santos@gmail.com', 'Marcos Vinicius Santos', '1979-06-12', 'ativo'),
('carolina.souza@gmail.com', 'Carolina Souza', '1971-01-02', 'ativo'),
('alícia.cavalcanti@gmail.com', 'Alícia Cavalcanti', '1998-07-07', 'inativo'),
('enrico.martins@gmail.com', 'Enrico Martins', '1987-09-13', 'ativo'),
('ana.laura.oliveira@gmail.com', 'Ana Laura Oliveira', '1982-05-07', 'ativo'),
('esther.oliveira@gmail.com', 'Esther Oliveira', '1981-05-31', 'ativo'),
('maria.eduarda.oliveira@gmail.com', 'Maria Eduarda Oliveira', '1998-08-01', 'ativo'),
('emanuella.lopes@gmail.com', 'Emanuella Lopes', '2008-04-04', 'ativo'),
('ana.julia.barbosa@gmail.com', 'Ana Julia Barbosa', '1994-01-25', 'ativo'),
('juliana.rodrigues@gmail.com', 'Juliana Rodrigues', '1973-09-07', 'ativo'),
('melissa.da.costa@gmail.com', 'Melissa da Costa', '1996-02-21', 'ativo'),
('camila.moreira@gmail.com', 'Camila Moreira', '1983-02-23', 'ativo'),
('juan.correia@gmail.com', 'Juan Correia', '1999-04-29', 'inativo'),
('daniel.castro@gmail.com', 'Daniel Castro', '1997-12-07', 'ativo'),
('lucas.gabriel.lima@gmail.com', 'Lucas Gabriel Lima', '1975-07-21', 'inativo'),
('raul.fernandes@gmail.com', 'Raul Fernandes', '2010-08-17', 'inativo'),
('ana.sophia.santos@gmail.com', 'Ana Sophia Santos', '1983-08-15', 'ativo'),
('bryan.rodrigues86@gmail.com', 'Bryan Rodrigues', '1986-03-19', 'ativo'),
('davi.lucas.costa@gmail.com', 'Davi Lucas Costa', '1977-12-11', 'ativo'),
('luana.souza@gmail.com', 'Luana Souza', '2005-09-08', 'ativo'),
('isabel.araújo@gmail.com', 'Isabel Araújo', '1990-05-03', 'inativo'),
('nicolas.teixeira@gmail.com', 'Nicolas Teixeira', '1999-03-05', 'ativo'),
('erick.da.cunha@gmail.com', 'Erick da Cunha', '2004-09-24', 'inativo'),
('ana.carolina.da.mata@gmail.com', 'Ana Carolina da Mata', '1991-12-23', 'ativo'),
('ryan.das.neves@gmail.com', 'Ryan das Neves', '2001-06-13', 'inativo'),
('pedro.rodrigues@gmail.com', 'Pedro Rodrigues', '1993-05-15', 'ativo'),
('isaac.moraes@gmail.com', 'Isaac Moraes', '2010-11-30', 'ativo'),
('thiago.da.cunha@gmail.com', 'Thiago da Cunha', '1974-06-22', 'ativo'),
('evelyn.peixoto@gmail.com', 'Evelyn Peixoto', '1987-06-03', 'ativo'),
('davi.lucca.da.cruz@gmail.com', 'Davi Lucca da Cruz', '1994-09-12', 'ativo'),
('diego.ribeiro@gmail.com', 'Diego Ribeiro', '1970-06-02', 'ativo'),
('alexandre.da.cruz@gmail.com', 'Alexandre da Cruz', '1998-08-19', 'ativo'),
('maria.clara.duarte@gmail.com', 'Maria Clara Duarte', '2005-03-02', 'inativo'),
('gustavo.das.neves@gmail.com', 'Gustavo das Neves', '1990-09-06', 'inativo'),
('luigi.lima@gmail.com', 'Luigi Lima', '2007-02-24', 'ativo'),
('laura.pereira@gmail.com', 'Laura Pereira', '1973-03-01', 'ativo'),
('thales.caldeira@gmail.com', 'Thales Caldeira', '1992-04-20', 'ativo'),
('luiz.henrique.da.mota@gmail.com', 'Luiz Henrique da Mota', '2007-08-21', 'ativo'),
('gabriel.ramos@gmail.com', 'Gabriel Ramos', '2010-10-11', 'ativo'),
('leonardo.rodrigues@gmail.com', 'Leonardo Rodrigues', '1987-04-14', 'ativo'),
('giovanna.rocha@gmail.com', 'Giovanna Rocha', '1978-11-19', 'ativo'),
('pedro.azevedo@gmail.com', 'Pedro Azevedo', '1979-06-04', 'ativo'),
('luiz.otávio.da.conceição@gmail.com', 'Luiz Otávio da Conceição', '1990-03-09', 'ativo'),
('sophia.santos@gmail.com', 'Sophia Santos', '1990-10-18', 'ativo'),
('helena.dias@gmail.com', 'Helena Dias', '1986-09-09', 'ativo'),
('calebe.barbosa@gmail.com', 'Calebe Barbosa', '1981-07-21', 'ativo'),
('sophie.da.conceição@gmail.com', 'Sophie da Conceição', '1999-11-11', 'ativo'),
('marcela.da.rocha@gmail.com', 'Marcela da Rocha', '1969-11-24', 'inativo'),
('maria.alice.fogaça@gmail.com', 'Maria Alice Fogaça', '1978-11-24', 'inativo'),
('bruno.pinto@gmail.com', 'Bruno Pinto', '1991-01-19', 'ativo'),
('amanda.silva@gmail.com', 'Amanda Silva', '1987-08-03', 'ativo'),
('giovanna.fogaça@gmail.com', 'Giovanna Fogaça', '1988-12-08', 'ativo'),
('amanda.pinto@gmail.com', 'Amanda Pinto', '1976-04-20', 'inativo'),
('vitória.correia@gmail.com', 'Vitória Correia', '1982-08-23', 'ativo'),
('gabrielly.peixoto@gmail.com', 'Gabrielly Peixoto', '1977-11-06', 'inativo'),
('gabriel.carvalho@gmail.com', 'Gabriel Carvalho', '1989-12-07', 'ativo'),
('beatriz.das.neves@gmail.com', 'Beatriz das Neves', '1991-06-26', 'ativo'),
('maria.sophia.das.neves@gmail.com', 'Maria Sophia das Neves', '1983-09-15', 'ativo'),
('ana.lívia.da.rocha@gmail.com', 'Ana Lívia da Rocha', '1996-09-24', 'ativo'),
('luiz.fernando.gomes@gmail.com', 'Luiz Fernando Gomes', '1994-03-15', 'ativo'),
('enrico.da.cruz@gmail.com', 'Enrico da Cruz', '1994-02-15', 'inativo'),
('cauã.cavalcanti@gmail.com', 'Cauã Cavalcanti', '1984-12-27', 'ativo'),
('maria.fernanda.moura@gmail.com', 'Maria Fernanda Moura', '2009-02-27', 'ativo'),
('samuel.castro@gmail.com', 'Samuel Castro', '2005-08-01', 'ativo'),
('joão.felipe.almeida@gmail.com', 'João Felipe Almeida', '2003-11-22', 'ativo'),
('luana.da.mota@gmail.com', 'Luana da Mota', '1978-12-02', 'ativo'),
('raquel.cavalcanti@gmail.com', 'Raquel Cavalcanti', '1975-01-05', 'ativo'),
('lorena.almeida@gmail.com', 'Lorena Almeida', '1979-05-06', 'ativo'),
('elisa.castro@gmail.com', 'Elisa Castro', '2004-02-20', 'ativo'),
('gustavo.henrique.sales@gmail.com', 'Gustavo Henrique Sales', '1971-08-16', 'inativo'),
('brenda.ferreira@gmail.com', 'Brenda Ferreira', '1971-03-09', 'ativo'),
('augusto.da.conceição@gmail.com', 'Augusto da Conceição', '1979-06-23', 'ativo'),
('ana.da.paz@gmail.com', 'Ana da Paz', '1998-10-27', 'ativo'),
('júlia.azevedo@gmail.com', 'Júlia Azevedo', '1976-10-15', 'ativo'),
('joaquim.da.paz@gmail.com', 'Joaquim da Paz', '2005-05-03', 'ativo'),
('sophia.mendes@gmail.com', 'Sophia Mendes', '2005-05-03', 'ativo'),
('davi.lima@gmail.com', 'Davi Lima', '1984-05-26', 'ativo'),
('heitor.silva@gmail.com', 'Heitor Silva', '1991-01-27', 'ativo'),
('luna.da.cunha@gmail.com', 'Luna da Cunha', '1992-10-05', 'ativo'),
('caroline.moreira@gmail.com', 'Caroline Moreira', '1989-05-31', 'ativo'),
('igor.ferreira@gmail.com', 'Igor Ferreira', '1980-04-03', 'ativo'),
('marcela.almeida@gmail.com', 'Marcela Almeida', '2009-02-18', 'ativo'),
('isabelly.moreira@gmail.com', 'Isabelly Moreira', '1974-02-06', 'ativo'),
('lívia.moura@gmail.com', 'Lívia Moura', '1987-02-20', 'ativo'),
('manuela.nascimento@gmail.com', 'Manuela Nascimento', '1991-11-14', 'ativo'),
('ana.vitória.lima@gmail.com', 'Ana Vitória Lima', '1979-11-08', 'inativo'),
('maria.cecília.monteiro@gmail.com', 'Maria Cecília Monteiro', '1984-12-10', 'ativo'),
('sabrina.ramos@gmail.com', 'Sabrina Ramos', '1973-04-22', 'ativo'),
('joão.lucas.silveira@gmail.com', 'João Lucas Silveira', '1983-12-18', 'ativo'),
('guilherme.duarte@gmail.com', 'Guilherme Duarte', '1979-03-10', 'ativo'),
('olivia.sales@gmail.com', 'Olivia Sales', '1982-08-19', 'ativo'),
('sarah.farias@gmail.com', 'Sarah Farias', '1972-05-13', 'ativo'),
('ana.carolina.da.rosa@gmail.com', 'Ana Carolina da Rosa', '1986-04-22', 'ativo'),
('catarina.caldeira@gmail.com', 'Catarina Caldeira', '1977-11-15', 'ativo'),
('lucas.freitas@gmail.com', 'Lucas Freitas', '1991-08-21', 'ativo'),
('alice.pires@gmail.com', 'Alice Pires', '2010-03-16', 'ativo'),
('lara.pires@gmail.com', 'Lara Pires', '1988-08-03', 'ativo'),
('sophia.ferreira@gmail.com', 'Sophia Ferreira', '1989-12-09', 'ativo'),
('brenda.moraes@gmail.com', 'Brenda Moraes', '1985-03-26', 'ativo'),
('joão.miguel.souza@gmail.com', 'João Miguel Souza', '1988-07-18', 'ativo'),
('leandro.cardoso@gmail.com', 'Leandro Cardoso', '1974-11-29', 'ativo'),
('otávio.costela@gmail.com', 'Otávio Costela', '1995-03-15', 'ativo'),
('daniela.viana@gmail.com', 'Daniela Viana', '2010-04-08', 'ativo'),
('lucca.da.cunha@gmail.com', 'Lucca da Cunha', '2005-12-24', 'inativo'),
('joaquim.porto@gmail.com', 'Joaquim Porto', '1993-01-21', 'ativo'),
('lorenzo.novaes@gmail.com', 'Lorenzo Novaes', '1979-01-17', 'ativo'),
('raul.gonçalves@gmail.com', 'Raul Gonçalves', '1997-06-18', 'inativo'),
('marcelo.gomes@gmail.com', 'Marcelo Gomes', '1998-11-09', 'ativo'),
('yago.moreira@gmail.com', 'Yago Moreira', '2004-07-18', 'ativo'),
('laura.barbosa@gmail.com', 'Laura Barbosa', '1986-12-03', 'ativo'),
('maria.alice.silva@gmail.com', 'Maria Alice da Silva', '1998-09-29', 'inativo'),
('joão.pedro.rodrigues@gmail.com', 'João Pedro Rodrigues', '2000-08-27', 'ativo'),
('larissa.alves@gmail.com', 'Larissa Alves', '1984-09-07', 'ativo'),
('maria.cecília.lopes@gmail.com', 'Maria Cecília Lopes', '1987-02-21', 'ativo'),
('bernardo.pereira@gmail.com', 'Bernardo Pereira', '1988-02-07', 'ativo'),
('enzo.novaes@gmail.com', 'Enzo Novaes', '1993-08-21', 'ativo'),
('renan.silva@gmail.com', 'Renan Silva', '1970-05-16', 'ativo'),
('bianca.nogueira@gmail.com', 'Bianca Nogueira', '1994-02-25', 'ativo'),
('bernardo.moura@gmail.com', 'Bernardo Moura', '1997-01-13', 'ativo'),
('marcelo.das.neves@gmail.com', 'Marcelo das Neves', '1986-09-18', 'ativo'),
('gabriel.novaes@gmail.com', 'Gabriel Novaes', '1971-05-14', 'inativo'),
('pedro.miguel.nascimento@gmail.com', 'Pedro Miguel Nascimento', '2002-11-01', 'inativo'),
('maria.julia.araújo@gmail.com', 'Maria Julia Araújo', '2000-07-01', 'inativo'),
('thales.carvalho@gmail.com', 'Thales Carvalho', '1983-06-02', 'ativo'),
('beatriz.alves@gmail.com', 'Beatriz Alves', '1971-05-24', 'ativo'),
('rafaela.viana@gmail.com', 'Rafaela Viana', '1980-08-23', 'ativo'),
('enrico.rodrigues@gmail.com', 'Enrico Rodrigues', '2005-07-04', 'ativo'),
('joana.martins@gmail.com', 'Joana Martins', '1987-06-29', 'ativo'),
('marcos.vinicius.monteiro@gmail.com', 'Marcos Vinicius Monteiro', '2002-12-09', 'ativo'),
('joão.felipe.novaes@gmail.com', 'João Felipe Novaes', '1977-06-09', 'inativo'),
('brenda.da.paz@gmail.com', 'Brenda da Paz', '1994-08-20', 'ativo'),
('maria.alice.almeida@gmail.com', 'Maria Alice Almeida', '1978-05-13', 'ativo'),
('camila.silveira@gmail.com', 'Camila Silveira', '1986-09-23', 'inativo'),
('enzo.gabriel.sales@gmail.com', 'Enzo Gabriel Sales', '1995-08-15', 'ativo'),
('mirella.pinto@gmail.com', 'Mirella Pinto', '1993-04-13', 'ativo'),
('caio.lopes@gmail.com', 'Caio Lopes', '2005-05-09', 'ativo'),
('alexandre.da.rosa@gmail.com', 'Alexandre da Rosa', '2010-10-12', 'ativo'),
('heitor.rodrigues@gmail.com', 'Heitor Rodrigues', '1970-10-08', 'inativo'),
('alana.sales@gmail.com', 'Alana Sales', '2010-05-29', 'inativo'),
('joão.felipe.dias@gmail.com', 'João Felipe Dias', '1980-01-12', 'inativo'),
('júlia.viana@gmail.com', 'Júlia Viana', '2004-03-07', 'ativo'),
('sofia.ribeiro@gmail.com', 'Sofia Ribeiro', '1970-07-22', 'ativo'),
('eloah.dias@gmail.com', 'Eloah Dias', '1969-12-06', 'ativo'),
('carlos.eduardo.carvalho@gmail.com', 'Carlos Eduardo Carvalho', '1986-04-07', 'ativo'),
('ana.vitória.rodrigues@gmail.com', 'Ana Vitória Rodrigues', '1974-10-27', 'ativo'),
('bryan.moura@gmail.com', 'Bryan Moura', '2005-04-08', 'ativo'),
('pedro.henrique.duarte@gmail.com', 'Pedro Henrique Duarte', '2005-10-10', 'inativo'),
('nathan.castro@gmail.com', 'Nathan Castro', '2011-08-30', 'ativo'),
('lorenzo.dias@gmail.com', 'Lorenzo Dias', '2004-06-06', 'inativo'),
('calebe.da.rosa@gmail.com', 'Calebe da Rosa', '1983-01-17', 'ativo'),
('joaquim.lima@gmail.com', 'Joaquim Lima', '1993-09-08', 'ativo'),
('isabel.gonçalves@gmail.com', 'Isabel Gonçalves', '1983-02-14', 'ativo'),
('eloah.ramos@gmail.com', 'Eloah Ramos', '2004-09-21', 'ativo'),
('levi.da.luz@gmail.com', 'Levi da Luz', '1972-06-29', 'ativo'),
('leandro.jesus@gmail.com', 'Leandro Jesus', '1972-10-07', 'inativo'),
('bruna.rodrigues@gmail.com', 'Bruna Rodrigues', '1975-04-18', 'ativo'),
('letícia.souza@gmail.com', 'Letícia Souza', '2002-10-31', 'ativo'),
('alícia.da.cruz@gmail.com', 'Alícia da Cruz', '1999-03-15', 'ativo'),
('antônio.moreira@gmail.com', 'Antônio Moreira', '2001-07-12', 'ativo'),
('camila.duarte@gmail.com', 'Camila Duarte', '1985-08-02', 'ativo'),
('vitória.peixoto@gmail.com', 'Vitória Peixoto', '2005-08-24', 'ativo'),
('letícia.souza86@gmail.com', 'Letícia Souza', '1986-11-25', 'ativo'),
('laís.rezende@gmail.com', 'Laís Rezende', '1993-10-06', 'ativo'),
('paulo.fogaça@gmail.com', 'Paulo Fogaça', '2002-07-17', 'inativo'),
('milena.oliveira@gmail.com', 'Milena Oliveira', '1991-02-11', 'ativo'),
('vinicius.pirozzi@gmail.com', 'Vinicius Pirozzi', '1973-11-22', 'ativo'),
('raquel.azevedo@gmail.com', 'Raquel Azevedo', '1973-10-04', 'inativo'),
('bernardo.araújo@gmail.com', 'Bernardo Araújo', '1972-09-03', 'ativo'),
('davi.lucas.azevedo@gmail.com', 'Davi Lucas Azevedo', '1970-03-07', 'ativo'),
('henrique.porto@gmail.com', 'Henrique Porto', '2007-06-04', 'ativo'),
('antônio.porto@gmail.com', 'Antônio Porto', '1978-07-28', 'ativo'),
('francisco.peixoto71@gmail.com', 'Francisco Peixoto', '1971-02-14', 'ativo'),
('daniela.silva@gmail.com', 'Daniela Silva', '1972-01-12', 'ativo'),
('vitória.moreira@gmail.com', 'Vitória Moreira', '1987-05-11', 'ativo'),
('júlia.da.cruz@gmail.com', 'Júlia da Cruz', '1977-06-17', 'inativo'),
('antônio.silveira@gmail.com', 'Antônio Silveira', '2001-06-30', 'inativo'),
('thomas.pinto@gmail.com', 'Thomas Pinto', '1998-11-09', 'ativo'),
('ana.vitória.moreira@gmail.com', 'Ana Vitória Moreira', '1989-08-07', 'ativo'),
('eduardo.aragão@gmail.com', 'Eduardo Aragão', '2000-08-12', 'ativo'),
('thiago.cardoso@gmail.com', 'Thiago Cardoso', '1984-10-22', 'inativo'),
('beatriz.monteiro@gmail.com', 'Beatriz Monteiro', '1996-10-10', 'ativo'),
('alice.ribeiro@gmail.com', 'Alice Ribeiro', '1972-10-31', 'ativo'),
('lucca.souza@gmail.com', 'Lucca Souza', '2002-05-23', 'ativo'),
('luigi.ferreira@gmail.com', 'Luigi Ferreira', '2007-03-23', 'ativo'),
('marcelo.da.conceição@gmail.com', 'Marcelo da Conceição', '1998-04-03', 'ativo'),
('nina.melo@gmail.com', 'Nina Melo', '1999-10-04', 'ativo'),
('elisa.silva@gmail.com', 'Elisa Silva', '1987-05-27', 'inativo'),
('laura.araújo@gmail.com', 'Laura Araújo', '2010-05-24', 'ativo'),
('emilly.nunes@gmail.com', 'Emilly Nunes', '1987-02-28', 'inativo'),
('mirella.cardoso@gmail.com', 'Mirella Cardoso', '1985-03-16', 'ativo'),
('camila.castro@gmail.com', 'Camila Castro', '1971-01-22', 'ativo'),
('joão.pedro.da.paz@gmail.com', 'João Pedro da Paz', '1988-07-26', 'inativo'),
('maria.fernanda.da.luz@gmail.com', 'Maria Fernanda da Luz', '2001-09-05', 'ativo'),
('luiza.melo@gmail.com', 'Luiza Melo', '2001-02-24', 'ativo'),
('vitor.hugo.nunes@gmail.com', 'Vitor Hugo Nunes', '1987-04-08', 'ativo'),
('andré.gomes@gmail.com', 'André Gomes', '2007-10-29', 'ativo'),
('maria.fernanda.pires@gmail.com', 'Maria Fernanda Pires', '1983-10-21', 'ativo'),
('raquel.jesus@gmail.com', 'Raquel Jesus', '1975-02-11', 'inativo'),
('julia.silveira@gmail.com', 'Julia Silveira', '1976-03-21', 'inativo'),
('maria.eduarda.dias@gmail.com', 'Maria Eduarda Dias', '2005-06-17', 'ativo'),
('isabelly.da.rosa@gmail.com', 'Isabelly da Rosa', '1991-07-24', 'ativo'),
('luiz.felipe.pires@gmail.com', 'Luiz Felipe Pires', '1989-10-06', 'inativo'),
('gabriel.martins@gmail.com', 'Gabriel Martins', '1980-09-17', 'inativo'),
('daniel.dias@gmail.com', 'Daniel Dias', '1988-03-04', 'ativo'),
('lívia.martins@gmail.com', 'Lívia Martins', '1997-01-27', 'inativo'),
('camila.ferreira@gmail.com', 'Camila Ferreira', '1993-12-25', 'ativo'),
('ana.araújo@gmail.com', 'Ana Araújo', '1976-12-27', 'ativo'),
('larissa.alves06@gmail.com', 'Larissa Alves', '2006-10-28', 'inativo'),
('lucas.da.costa@gmail.com', 'Lucas da Costa', '1994-05-19', 'ativo'),
('isaac.fernandes@gmail.com', 'Isaac Fernandes', '1979-07-07', 'ativo'),
('thales.duarte11@gmail.com', 'Thales Duarte', '2011-06-12', 'ativo'),
('cauê.martins@gmail.com', 'Cauê Martins', '2005-06-25', 'ativo'),
('gabrielly.viana@gmail.com', 'Gabrielly Viana', '2010-07-22', 'ativo'),
('marcela.porto@gmail.com', 'Marcela Porto', '1973-01-13', 'ativo'),
('eloah.cavalcanti@gmail.com', 'Eloah Cavalcanti', '1993-10-03', 'inativo'),
('letícia.barros@gmail.com', 'Letícia Barros', '2002-03-17', 'ativo'),
('eduardo.viana@gmail.com', 'Eduardo Viana', '1970-04-26', 'ativo'),
('cauê.viana@gmail.com', 'Cauê Viana', '1977-10-28', 'inativo'),
('theo.souza@gmail.com', 'Theo Souza', '2004-05-26', 'ativo'),
('danilo.pereira@gmail.com', 'Danilo Pereira', '1978-10-08', 'ativo'),
('emanuelly.gomes@gmail.com', 'Emanuelly Gomes', '2005-10-13', 'ativo'),
('mirella.cavalcanti@gmail.com', 'Mirella Cavalcanti', '1971-12-23', 'ativo'),
('pietra.ribeiro@gmail.com', 'Pietra Ribeiro', '2006-08-14', 'inativo'),
('olivia.viana@gmail.com', 'Olivia Viana', '1982-08-01', 'ativo'),
('kamilly.azevedo@gmail.com', 'Kamilly Azevedo', '2000-11-18', 'ativo'),
('helena.ferreira@gmail.com', 'Helena Ferreira', '2006-07-04', 'inativo'),
('yuri.porto@gmail.com', 'Yuri Porto', '2000-10-28', 'ativo'),
('caroline.ribeiro@gmail.com', 'Caroline Ribeiro', '2000-03-04', 'ativo'),
('vitor.costela@gmail.com', 'Vitor Costela', '1990-11-03', 'ativo'),
('heloísa.pires@gmail.com', 'Heloísa Pires', '1974-10-17', 'ativo'),
('ana.da.rosa@gmail.com', 'Ana da Rosa', '1980-02-20', 'ativo'),
('luana.duarte@gmail.com', 'Luana Duarte', '1980-03-09', 'ativo'),
('pietra.novaes@gmail.com', 'Pietra Novaes', '2005-07-20', 'inativo'),
('francisco.farias@gmail.com', 'Francisco Farias', '1979-04-23', 'inativo'),
('lorena.nascimento@gmail.com', 'Lorena Nascimento', '1989-04-11', 'ativo'),
('joão.pedro.pinto@gmail.com', 'João Pedro Pinto', '1997-03-21', 'ativo'),
('ana.clara.ramos@gmail.com', 'Ana Clara Ramos', '1984-12-10', 'inativo'),
('pietro.da.conceição@gmail.com', 'Pietro da Conceição', '1983-12-12', 'ativo'),
('pedro.gonçalves@gmail.com', 'Pedro Gonçalves', '1976-11-03', 'inativo'),
('ana.beatriz.moraes@gmail.com', 'Ana Beatriz Moraes', '1993-01-13', 'ativo'),
('luiz.gustavo.da.costa@gmail.com', 'Luiz Gustavo da Costa', '1971-08-20', 'ativo'),
('kamilly.duarte@gmail.com', 'Kamilly Duarte', '1982-04-09', 'ativo'),
('augusto.farias@gmail.com', 'Augusto Farias', '2008-05-28', 'ativo'),
('caroline.cavalcanti@gmail.com', 'Caroline Cavalcanti', '1970-04-28', 'ativo'),
('clarice.barros@gmail.com', 'Clarice Barros', '2005-08-29', 'inativo'),
('lorenzo.moura@gmail.com', 'Lorenzo Moura', '1973-06-27', 'ativo'),
('ana.monteiro@gmail.com', 'Ana Monteiro', '1979-10-21', 'ativo'),
('letícia.da.mota@gmail.com', 'Letícia da Mota', '1998-09-05', 'ativo'),
('joão.vitor.araújo@gmail.com', 'João Vitor Araújo', '1998-12-02', 'ativo'),
('rodrigo.fogaça@gmail.com', 'Rodrigo Fogaça', '1986-09-17', 'ativo'),
('mirella.farias@gmail.com', 'Mirella Farias', '2007-09-26', 'inativo'),
('nina.farias@gmail.com', 'Nina Farias', '1996-03-20', 'ativo'),
('mariana.moreira@gmail.com', 'Mariana Moreira', '2007-10-19', 'ativo'),
('camila.oliveira@gmail.com', 'Camila Oliveira', '2000-08-05', 'ativo'),
('juliana.jesus@gmail.com', 'Juliana Jesus', '1987-11-24', 'ativo'),
('lorenzo.castro@gmail.com', 'Lorenzo Castro', '1977-09-03', 'inativo'),
('luiz.miguel.rocha@gmail.com', 'Luiz Miguel Rocha', '1997-04-10', 'ativo'),
('beatriz.barros@gmail.com', 'Beatriz Barros', '1970-07-14', 'ativo'),
('lucca.da.rocha@gmail.com', 'Lucca da Rocha', '1985-01-24', 'ativo'),
('maria.vitória.rodrigues@gmail.com', 'Maria Vitória Rodrigues', '2001-07-25', 'ativo'),
('joão.guilherme.moura@gmail.com', 'João Guilherme Moura', '1982-03-23', 'ativo'),
('bruna.almeida@gmail.com', 'Bruna Almeida', '1997-07-03', 'ativo'),
('carolina.rodrigues@gmail.com', 'Carolina Rodrigues', '2011-10-04', 'inativo'),
('emanuelly.novaes@gmail.com', 'Emanuelly Novaes', '2011-11-14', 'ativo'),
('isis.costa@gmail.com', 'Isis Costa', '1975-01-28', 'ativo'),
('gabriel.da.conceição@gmail.com', 'Gabriel da Conceição', '2002-10-24', 'ativo'),
('gabriela.rezende@gmail.com', 'Gabriela Rezende', '1983-05-16', 'ativo'),
('davi.lucas.das.neves@gmail.com', 'Davi Lucas das Neves', '1971-11-09', 'inativo'),
('luiz.fernando.cunha@gmail.com', 'Luiz Fernando Cunha', '1993-10-20', 'ativo'),
('maria.cecília.barros@gmail.com', 'Maria Cecília Barros', '1979-03-18', 'inativo'),
('heitor.campos@gmail.com', 'Heitor Campos', '1980-02-19', 'ativo'),
('nicole.teixeira@gmail.com', 'Nicole Teixeira', '1978-09-05', 'ativo'),
('larissa.da.rocha@gmail.com', 'Larissa da Rocha', '1997-11-12', 'inativo'),
('amanda.costela@gmail.com', 'Amanda Costela', '1995-08-13', 'inativo'),
('luiz.gustavo.da.luz@gmail.com', 'Luiz Gustavo da Luz', '1983-06-02', 'ativo'),
('benjamin.monteiro@gmail.com', 'Benjamin Monteiro', '1977-03-04', 'inativo'),
('joaquim.pereira@gmail.com', 'Joaquim Pereira', '1985-04-26', 'inativo'),
('letícia.almeida@gmail.com', 'Letícia Almeida', '1977-05-30', 'ativo'),
('agatha.da.mota@gmail.com', 'Agatha da Mota', '1995-10-07', 'ativo'),
('miguel.dias@gmail.com', 'Miguel Dias', '2005-02-08', 'inativo'),
('stella.gonçalves@gmail.com', 'Stella Gonçalves', '1996-09-03', 'ativo'),
('olivia.martins@gmail.com', 'Olivia Martins', '2006-08-03', 'ativo'),
('maysa.freitas@gmail.com', 'Maysa Freitas', '1980-08-14', 'ativo'),
('joana.da.cruz@gmail.com', 'Joana da Cruz', '1974-09-06', 'ativo'),
('vicente.moura@gmail.com', 'Vicente Moura', '1982-07-21', 'ativo'),
('davi.lucca.nunes@gmail.com', 'Davi Lucca Nunes', '1984-12-20', 'ativo'),
('pedro.nunes@gmail.com', 'Pedro Nunes', '2004-09-27', 'ativo'),
('helena.da.mata@gmail.com', 'Helena da Mata', '2000-04-21', 'inativo'),
('thiago.martins@gmail.com', 'Thiago Martins', '1970-08-29', 'ativo'),
('luana.cunha@gmail.com', 'Luana Cunha', '1998-08-11', 'inativo'),
('ana.clara.teixeira@gmail.com', 'Ana Clara Teixeira', '2009-06-13', 'ativo'),
('alexandre.cardoso@gmail.com', 'Alexandre Cardoso', '1983-11-15', 'ativo'),
('pedro.aragão@gmail.com', 'Pedro Aragão', '1993-09-15', 'ativo'),
('mirella.da.mata@gmail.com', 'Mirella da Mata', '1997-11-25', 'inativo'),
('emilly.cavalcanti@gmail.com', 'Emilly Cavalcanti', '1986-03-14', 'inativo'),
('catarina.duarte@gmail.com', 'Catarina Duarte', '1989-01-18', 'ativo'),
('valentina.farias@gmail.com', 'Valentina Farias', '1977-01-28', 'ativo'),
('esther.almeida@gmail.com', 'Esther Almeida', '1975-08-24', 'ativo'),
('lucas.santos@gmail.com', 'Lucas Santos', '1979-06-05', 'ativo'),
('ana.luiza.teixeira@gmail.com', 'Ana Luiza Teixeira', '1982-08-03', 'ativo'),
('joão.miguel.da.mota@gmail.com', 'João Miguel da Mota', '2002-07-10', 'ativo'),
('henrique.pinto@gmail.com', 'Henrique Pinto', '1979-04-05', 'ativo'),
('benício.pires@gmail.com', 'Benício Pires', '2004-01-29', 'ativo'),
('kaique.pereira@gmail.com', 'Kaique Pereira', '2004-11-23', 'inativo'),
('maria.alice@gmail.com', 'Maria Alice', '1977-08-11', 'ativo'),
('yasmin.ramos@gmail.com', 'Yasmin Ramos', '2001-09-17', 'ativo'),
('valentina.correia@gmail.com', 'Valentina Correia', '1981-05-01', 'ativo'),
('mariane.da.conceição@gmail.com', 'Mariane da Conceição', '1991-12-07', 'ativo'),
('laura.correia@gmail.com', 'Laura Correia', '2002-12-26', 'ativo'),
('laís.duarte@gmail.com', 'Laís Duarte', '2007-07-05', 'ativo'),
('levi.gomes@gmail.com', 'Levi Gomes', '1990-07-11', 'ativo'),
('cauã.araújo@gmail.com', 'Cauã Araújo', '1988-09-15', 'ativo'),
('emanuel.azevedo@gmail.com', 'Emanuel Azevedo', '1987-03-11', 'ativo'),
('kaique.gomes@gmail.com', 'Kaique Gomes', '1986-07-28', 'inativo'),
('sofia.rodrigues@gmail.com', 'Sofia Rodrigues', '2000-08-20', 'ativo'),
('mirella.da.cunha@gmail.com', 'Mirella da Cunha', '2007-11-05', 'inativo'),
('paulo.fogaça96@gmail.com', 'Paulo Fogaça', '1996-11-22', 'ativo'),
('heloísa.martins@gmail.com', 'Heloísa Martins', '1973-08-04', 'ativo'),
('maria.da.costa@gmail.com', 'Maria da Costa', '1973-03-01', 'inativo'),
('elisa.cavalcanti@gmail.com', 'Elisa Cavalcanti', '1987-10-01', 'inativo'),
('isaac.vieira@gmail.com', 'Isaac Vieira', '1970-02-21', 'ativo'),
('sophie.almeida@gmail.com', 'Sophie Almeida', '1987-03-14', 'inativo'),
('marcos.vinicius.moraes@gmail.com', 'Marcos Vinicius Moraes', '1989-12-07', 'ativo'),
('carolina.da.conceição@gmail.com', 'Carolina da Conceição', '1987-05-03', 'ativo'),
('gustavo.martins@gmail.com', 'Gustavo Martins', '2005-03-12', 'ativo'),
('luiz.henrique.da.costa@gmail.com', 'Luiz Henrique da Costa', '1977-02-20', 'ativo'),
('ana.júlia.oliveira@gmail.com', 'Ana Júlia Oliveira', '1997-03-25', 'ativo'),
('isabelly.peixoto@gmail.com', 'Isabelly Peixoto', '1983-08-15', 'ativo'),
('rafael.pereira@gmail.com', 'Rafael Pereira', '1991-02-19', 'inativo'),
('otávio.nascimento@gmail.com', 'Otávio Nascimento', '1996-08-09', 'ativo'),
('eduardo.aragão83@gmail.com', 'Eduardo Aragão', '1983-06-10', 'inativo'),
('benjamin.cavalcanti@gmail.com', 'Benjamin Cavalcanti', '1986-10-22', 'ativo'),
('eduardo.nunes@gmail.com', 'Eduardo Nunes', '1972-01-17', 'ativo'),
('bianca.teixeira@gmail.com', 'Bianca Teixeira', '2001-04-25', 'ativo'),
('laís.duarte03@gmail.com', 'Laís Duarte', '2003-11-11', 'ativo'),
('francisco.souza@gmail.com', 'Francisco Souza', '1986-12-02', 'ativo'),
('caio.da.mata@gmail.com', 'Caio da Mata', '1981-07-17', 'ativo'),
('calebe.santos@gmail.com', 'Calebe Santos', '1987-03-18', 'ativo'),
('heitor.souza@gmail.com', 'Heitor Souza', '2002-12-26', 'ativo'),
('lorenzo.pires@gmail.com', 'Lorenzo Pires', '1971-11-02', 'ativo'),
('gustavo.henrique.pires@gmail.com', 'Gustavo Henrique Pires', '1978-12-11', 'inativo'),
('nathan.pinto@gmail.com', 'Nathan Pinto', '1992-12-28', 'inativo'),
('marcelo.da.paz@gmail.com', 'Marcelo da Paz', '1970-09-09', 'ativo'),
('nathan.alves@gmail.com', 'Nathan Alves', '2005-07-06', 'ativo'),
('diego.farias@gmail.com', 'Diego Farias', '1977-12-15', 'inativo'),
('benjamin.castro@gmail.com', 'Benjamin Castro', '1988-02-11', 'ativo'),
('caroline.peixoto@gmail.com', 'Caroline Peixoto', '2008-06-23', 'ativo'),
('joão.gabriel.ribeiro@gmail.com', 'João Gabriel Ribeiro', '1994-04-10', 'ativo'),
('maria.sophia.carvalho@gmail.com', 'Maria Sophia Carvalho', '1971-09-23', 'ativo'),
('daniel.lima@gmail.com', 'Daniel Lima', '1970-02-24', 'ativo'),
('maria.luiza80@gmail.com', 'Maria Luiza Cavalcanti', '1980-01-06', 'ativo'),
('ana.laura.sales@gmail.com', 'Ana Laura Sales', '2001-07-22', 'ativo'),
('igor.martins@gmail.com', 'Igor Martins', '2010-07-20', 'inativo'),
('vitória.souza@gmail.com', 'Vitória Souza', '1979-12-21', 'inativo'),
('joão.viana@gmail.com', 'João Viana', '2001-04-14', 'ativo'),
('vitor.jesus@gmail.com', 'Vitor Jesus', '1979-07-01', 'inativo'),
('joaquim.barbosa04@gmail.com', 'Joaquim Barbosa', '2004-03-22', 'ativo'),
('ana.beatriz.teixeira@gmail.com', 'Ana Beatriz Teixeira', '2004-06-01', 'inativo'),
('murilo.duarte@gmail.com', 'Murilo Duarte', '1975-06-03', 'inativo'),
('vitor.gabriel.pinto@gmail.com', 'Vitor Gabriel Pinto', '1977-12-20', 'ativo'),
('vitória.cardoso@gmail.com', 'Vitória Cardoso', '2010-12-17', 'inativo'),
('lavínia.lima@gmail.com', 'Lavínia Lima', '1978-11-28', 'ativo'),
('kevin.costa@gmail.com', 'Kevin Costa', '1991-08-26', 'inativo'),
('gabriel.costa@gmail.com', 'Gabriel Costa', '1974-03-13', 'ativo'),
('luiz.felipe.ramos@gmail.com', 'Luiz Felipe Ramos', '1981-04-10', 'ativo'),
('gustavo.henrique.lima@gmail.com', 'Gustavo Henrique Lima', '1984-01-12', 'ativo'),
('ana.moreira@gmail.com', 'Ana Moreira', '1994-07-07', 'ativo'),
('maria.luiza.moraes@gmail.com', 'Maria Luiza Moraes', '2007-01-03', 'ativo'),
('sofia.costa@gmail.com', 'Sofia Costa', '2004-11-29', 'ativo'),
('alícia.lima@gmail.com', 'Alícia Lima', '1996-10-15', 'ativo'),
('beatriz.da.mata@gmail.com', 'Beatriz da Mata', '1978-02-10', 'ativo'),
('sarah.azevedo@gmail.com', 'Sarah Azevedo', '1979-03-27', 'inativo'),
('sabrina.farias@gmail.com', 'Sabrina Farias', '2005-08-14', 'ativo'),
('sabrina.cardoso@gmail.com', 'Sabrina Cardoso', '1980-03-12', 'ativo'),
('alexia.barros@gmail.com', 'Alexia Barros', '2008-04-24', 'ativo'),
('alana.monteiro@gmail.com', 'Alana Monteiro', '2011-10-17', 'ativo'),
('anthony.silva@gmail.com', 'Anthony Silva', '1986-02-14', 'inativo'),
('lavínia.melo@gmail.com', 'Lavínia Melo', '1980-08-24', 'inativo'),
('giovanna.fogaça80@gmail.com', 'Giovanna Fogaça', '1980-05-11', 'ativo'),
('kamilly.vieira@gmail.com', 'Kamilly Vieira', '1989-05-07', 'ativo'),
('vitor.gabriel.ferreira@gmail.com', 'Vitor Gabriel Ferreira', '2001-08-09', 'ativo'),
('heitor.cavalcanti@gmail.com', 'Heitor Cavalcanti', '2011-02-11', 'ativo'),
('lorenzo.gomes@gmail.com', 'Lorenzo Gomes', '2001-07-16', 'ativo'),
('marina.ribeiro@gmail.com', 'Marina Ribeiro', '1986-05-12', 'ativo'),
('maria.da.rocha@gmail.com', 'Maria da Rocha', '1977-05-23', 'inativo'),
('nina.novaes@gmail.com', 'Nina Novaes', '1991-12-02', 'ativo'),
('felipe.ferreira@gmail.com', 'Felipe Ferreira', '1989-11-25', 'inativo'),
('clarice.da.costa@gmail.com', 'Clarice da Costa', '2009-05-31', 'ativo'),
('breno.pinto@gmail.com', 'Breno Pinto', '1990-06-02', 'ativo'),
('sarah.pinto@gmail.com', 'Sarah Pinto', '1975-09-04', 'ativo'),
('mariana.cardoso@gmail.com', 'Mariana Cardoso', '1993-08-30', 'ativo'),
('alana.ribeiro@gmail.com', 'Alana Ribeiro', '2007-05-19', 'ativo'),
('thiago.da.paz@gmail.com', 'Thiago da Paz', '1989-05-29', 'ativo'),
('joão.vitor.silva@gmail.com', 'João Vitor Silva', '1994-05-18', 'inativo'),
('cauê.da.cruz@gmail.com', 'Cauê da Cruz', '2001-06-10', 'ativo'),
('luigi.lima87@gmail.com', 'Luigi Lima', '1987-12-12', 'inativo'),
('rafaela.caldeira@gmail.com', 'Rafaela Caldeira', '1992-06-02', 'ativo'),
('pedro.lucas.nascimento@gmail.com', 'Pedro Lucas Nascimento', '1981-03-17', 'inativo'),
('beatriz.moura@gmail.com', 'Beatriz Moura', '2006-12-25', 'ativo'),
('alícia.almeida@gmail.com', 'Alícia Almeida', '1974-07-24', 'inativo'),
('isabella.cardoso@gmail.com', 'Isabella Cardoso', '1975-08-02', 'ativo'),
('júlia.caldeira@gmail.com', 'Júlia Caldeira', '1980-11-05', 'ativo'),
('stephany.da.mota@gmail.com', 'Stephany da Mota', '1982-06-19', 'ativo');

INSERT INTO Professor (nome, email, especializacao) VALUES
('Marcos Silva',        'marcossilva@gmail.com',        'Desenvolvimento Web'),
('Luciana Almeida',     'lucianaalmeida@hotmail.com',   'Desenvolvimento Mobile'),
('Carlos Santos',       'carlossantos@gmail.com',       'Data Science'),
('Patrícia Oliveira',   'patriciaoliveira@hotmail.com', 'Inteligência Artificial'),
('Roberto Pereira',     'robertopereira@gmail.com',     'DevOps'),
('Fernanda Costa',      'fernandacosta@hotmail.com',    'UX/UI Design'),
('Ana Souza',           'anasouza@gmail.com',           'Cybersecurity'),
('Bruno Rocha',         'brunorocha@hotmail.com',       'Banco de Dados'),
('Débora Nunes',        'deboranunes@gmail.com',        'Engenharia de Software'),
('Felipe Cardoso',      'felipecardoso@hotmail.com',    'Arquitetura de Software'),
('Gabriela Mendes',     'gabrielamendes@gmail.com',     'Desenvolvimento de Jogos'),
('João Fernandes',      'joaofernandes@hotmail.com',    'Cloud Computing'),
('Camila Ribeiro',      'camilaribeiro@gmail.com',      'Redes de Computadores'),
('Renato Carvalho',     'renatocarvalho@hotmail.com',   'Machine Learning'),
('Isabela Martins',     'isabelamartins@gmail.com',     'Processamento de Dados'),
('Lucas Moreira',       'lucasmoreira@hotmail.com',     'Segurança de Redes'),
('Larissa Batista',     'larissabatista@gmail.com',     'Big Data'),
('Paulo Barreto',       'paulobarreto@hotmail.com',     'Blockchain'),
('Vanessa Silva',       'vanessasilva@gmail.com',       'Computação em Nuvem'),
('Rodrigo Monteiro',    'rodrigomonteiro@hotmail.com',  'Análise de Dados');

INSERT INTO Habilidade (id, nome, nivel) VALUES
(1,             'JavaScript',               'Avançado'),
(61,            'HTML/CSS',                 'Iniciante'),
(2,             'HTML/CSS',                 'Intermediário'),
(3,             'HTML/CSS',                 'Avançado'),
(60,            'Node.js',                  'Intermediário'),
(4,             'Node.js',                  'Avançado'),
(5,             'Selenium',                 'Avançado'),
(6,             'Kotlin',                   'Iniciante'),
(7,             'Python',                   'Iniciante'),
(8,             'Python',                   'Intermediário'),
(9,             'IA',                       'Intermediário'),
(10,            'Jira',                     'Iniciante'),
(58,            'Jira',                     'Avançado'),
(11,            'UX/UI',                    'Intermediário'),
(12,            'Segurança da Informação',  'Avançado'),
(13,            'SQL',                      'Iniciante'),
(59,            'SQL',                      'Avançado'),
(14,            'Gestão de Projetos',       'Intermediário'),
(15,            'Arquitetura de Software',  'Avançado'),
(16,            'C++',                      'Avançado'),
(17,            'Amazon AWS',               'Iniciante'),
(18,            'Administração de Redes',   'Intermediário'),
(19,            'R',                        'Intermediário'),
(20,            'Machine Learning',         'Intermediário'),
(21,            'Processamento de Dados',   'Avançado'),
(22,            'Blockchain',               'Intermediário'),
(23,            'Excel',                    'Avançado'),
(24,            'Automação de Testes',      'Avançado'),
(25,            'Lógica de Programação',    'Iniciante'),
(26,            'Java',                     'Intermediário'),
(27,            'Power BI',                 'Iniciante'),
(28,            'Kubernetes',               'Avançado'),
(29,            'Ruby on Rails',            'Intermediário'),
(30,            'REST',                     'Intermediário'),
(31,            'Angular',                  'Iniciante'),
(32,            'React Native',             'Intermediário'),
(33,            'Hadoop',                   'Avançado'),
(34,            'Testes de Software',       'Intermediário'),
(35,            'Unreal Engine',            'Avançado'),
(36,            'TypeScript',               'Iniciante'),
(37,            'Gestão de Produtos',       'Intermediário'),
(38,            'Docker',                   'Iniciante'),
(39,            'Django',                   'Intermediário'),
(40,            'Flutter',                  'Intermediário'),
(41,            'ElasticSearch',            'Iniciante'),
(42,            'TensorFlow',               'Avançado'),
(43,            'Ciência de Dados',         'Iniciante'),
(44,            'Marketing Digital',        'Iniciante'),
(45,            'PHP',                      'Intermediário'),
(46,            'MongoDB',                  'Intermediário'),
(47,            'Scala',                    'Avançado'),
(48,            'C#',                       'Iniciante'),
(49,            'Design Thinking',          'Iniciante'),
(50,            'IoT',                      'Intermediário'),
(51,            'Shell Script',             'Avançado'),
(52,            'PowerShell',               'Avançado'),
(53,            'Go',                       'Intermediário'),
(54,            'Sistemas Operacionais',    'Intermediário'),
(55,            'Bash',                     'Intermediário'),
(56,            'Markdown',                 'Intermediário'),
(57,            'Git',                      'Avançado');

INSERT INTO Curso (nome, descricao, duracao, nivel, data_lancamento) VALUES
('Desenvolvimento Web Completo',            'Aprenda a criar sites e aplicações web do zero.',              120,    'Avançado',         '2020-01-15'),
('Introdução ao Desenvolvimento Mobile',    'Curso básico de desenvolvimento para Android e iOS.',          80,     'Iniciante',        '2020-02-01'),
('Data Science com Python',                 'Análise de dados e machine learning utilizando Python.',       100,    'Intermediário',    '2020-02-20'),
('Fundamentos de Inteligência Artificial',  'Entenda os princípios e técnicas de IA.',                      60,     'Intermediário',    '2020-03-05'),
('DevOps para Iniciantes',                  'Introdução às práticas de DevOps e automação de processos.',   90,     'Iniciante',        '2020-03-15'),
('UX/UI Design na Prática',                 'Criação de interfaces intuitivas e experiências de usuário.',  70,     'Intermediário',    '2020-04-10'),
('Segurança da Informação',                 'Curso sobre princípios de segurança em TI.',                   80,     'Avançado',         '2020-04-25'),
('Banco de Dados com SQL',                  'Aprenda a modelar e gerenciar bancos de dados relacionais.',   90,     'Iniciante',        '2020-05-10'),
('Engenharia de Software',                  'Metodologias ágeis e gestão de projetos de software.',         110,    'Intermediário',    '2020-05-20'),
('Arquitetura de Software',                 'Entenda como estruturar software de maneira eficaz.',          100,    'Avançado',         '2020-06-01'),
('Desenvolvimento de Jogos',                'Criação de jogos 2D e 3D com Unity.',                          130,    'Avançado',         '2020-06-15'),
('Cloud Computing para Iniciantes',         'Conceitos básicos sobre computação em nuvem.',                 70,     'Iniciante',        '2020-07-01'),
('Redes de Computadores',                   'Aprenda sobre configuração e gestão de redes.',                80,     'Intermediário',    '2020-07-15'),
('Machine Learning com R',                  'Introdução ao machine learning usando a linguagem R.',         90,     'Intermediário',    '2020-08-01'),
('Processamento de Dados com Apache Spark', 'Aprenda a processar grandes volumes de dados.',                110,    'Avançado',         '2020-08-15'),
('Blockchain: Fundamentos e Aplicações',    'Entenda como funciona a tecnologia blockchain.',               80,     'Intermediário',    '2020-09-01'),
('Análise de Dados com Excel',              'Ferramentas de análise de dados usando Excel.',                70,     'Avançado',         '2020-09-15'),
('Automação de Testes',                     'Técnicas e ferramentas para automação de testes de software.', 90,     'Avançado',         '2020-10-01'),
('Programação para Iniciantes',             'Aprenda os conceitos básicos de programação.',                 80,     'Iniciante',        '2020-10-15'),
('Desenvolvimento em Java',                 'Fundamentos do desenvolvimento de aplicações em Java.',        100,    'Intermediário',    '2020-11-01'),
('Python para Automação',                   'Automatize tarefas repetitivas com Python.',                   60,     'Iniciante',        '2020-11-15'),
('Introdução ao Power BI',                  'Aprenda a criar relatórios e dashboards interativos.',         50,     'Iniciante',        '2020-12-01'),
('Kubernetes na Prática',                   'Gerenciamento de contêineres com Kubernetes.',                 80,     'Avançado',         '2020-12-10'),
('Introdução ao Ruby on Rails',             'Desenvolvimento web usando Ruby on Rails.',                    90,     'Intermediário',    '2020-12-20'),
('JavaScript Avançado',                     'Aprofunde seus conhecimentos em JavaScript.',                  70,     'Avançado',         '2020-01-10'),
('Construção de APIs REST',                 'Crie APIs RESTful usando padrões modernos.',                   100,    'Intermediário',    '2020-01-20'),
('Angular Básico',                          'Introdução ao framework Angular para desenvolvimento web.',    80,     'Iniciante',        '2020-02-01'),
('React Native para Mobile',                'Desenvolva apps para Android e iOS com React Native.',         110,    'Intermediário',    '2020-02-10'),
('Big Data com Hadoop',                     'Introdução ao Big Data e Hadoop.',                             100,    'Avançado',         '2020-02-20'),
('Teste de Software na Prática',            'Aprenda sobre testes manuais e automatizados.',                60,     'Intermediário',    '2020-03-01'),
('Game Development com Unreal Engine',      'Criação de jogos avançados com Unreal Engine.',                130,    'Avançado',         '2020-03-15'),
('Introdução ao TypeScript',                'Aprimore JavaScript com TypeScript.',                          50,     'Iniciante',        '2020-04-01'),
('Gestão de Produtos Digitais',             'Metodologias e ferramentas para gestão de produtos.',          90,     'Intermediário',    '2020-04-10'),
('Noções de Docker',                        'Trabalhe com contêineres usando Docker.',                      70,     'Iniciante',        '2020-04-20'),
('Desenvolvimento Backend com Node.js',     'Criação de servidores robustos com Node.js.',                  120,    'Avançado',         '2020-05-01'),
('Django para Web',                         'Desenvolvimento web com Python e Django.',                     100,    'Intermediário',    '2020-05-10'),
('Flutter na Prática',                      'Criação de apps móveis com Flutter.',                          110,    'Intermediário',    '2020-05-20'),
('ElasticSearch Básico',                    'Armazenamento e busca de dados com ElasticSearch.',            80,     'Iniciante',        '2020-06-01'),
('Inteligência Artificial com TensorFlow',  'Criação de modelos de IA com TensorFlow.',                     90,     'Avançado',         '2020-06-10'),
('Introdução à Ciência de Dados',           'Entenda os conceitos básicos da ciência de dados.',            100,    'Iniciante',        '2020-06-20'),
('Marketing Digital para Empresas',         'Estratégias para marketing digital.',                          70,     'Iniciante',        '2020-07-01'),
('Excel Avançado',                          'Automatize planilhas e crie gráficos avançados.',              80,     'Avançado',         '2020-07-10'),
('PHP para Web',                            'Desenvolvimento web utilizando PHP.',                          90,     'Intermediário',    '2020-07-20'),
('MongoDB na Prática',                      'Armazenamento de dados em banco de dados NoSQL.',              70,     'Intermediário',    '2020-08-01'),
('Programação Funcional com Scala',         'Paradigma funcional usando Scala.',                            90,     'Avançado',         '2020-08-10'),
('Introdução ao C#',                        'Fundamentos da programação com C#.',                           70,     'Iniciante',        '2020-08-20'),
('Design Thinking para Inovação',           'Processos criativos para resolução de problemas.',             60,     'Iniciante',        '2020-09-01'),
('Internet das Coisas (IoT)',               'Conceitos e práticas de IoT.',                                 90,     'Intermediário',    '2020-09-10'),
('Automação com Shell Script',              'Automatize tarefas em sistemas Unix.',                         80,     'Avançado',         '2020-09-20'),
('Linguagem Go para Backend',               'Desenvolvimento backend utilizando Go.',                       100,    'Intermediário',    '2020-10-01'),
('Sistemas Operacionais na Prática',        'Entenda conceitos e funcionamento de sistemas operacionais.',  100,    'Intermediário',    '2020-10-15');

INSERT INTO Habilidade_Curso (nome_curso, id_habilidade) VALUES
('Desenvolvimento Web Completo',            1),
('Desenvolvimento Web Completo',            3),
('Desenvolvimento Web Completo',            4),
('Desenvolvimento Web Completo',            5),
('Introdução ao Desenvolvimento Mobile',    6),
('Data Science com Python',                 8),
('Fundamentos de Inteligência Artificial',  9),
('DevOps para Iniciantes',                  10),
('UX/UI Design na Prática',                 11),
('UX/UI Design na Prática',                 2),
('Segurança da Informação',                 12),
('Banco de Dados com SQL',                  13),
('Engenharia de Software',                  14),
('Arquitetura de Software',                 15),
('Desenvolvimento de Jogos',                16),
('Cloud Computing para Iniciantes',         17),
('Redes de Computadores',                   18),
('Machine Learning com R',                  19),
('Machine Learning com R',                  20),
('Processamento de Dados com Apache Spark', 21),
('Blockchain: Fundamentos e Aplicações',    22),
('Análise de Dados com Excel',              23),
('Automação de Testes',                     24),
('Programação para Iniciantes',             25),
('Desenvolvimento em Java',                 26),
('Python para Automação',                   7),
('Introdução ao Power BI',                  27),
('Kubernetes na Prática',                   28),
('Introdução ao Ruby on Rails',             29),
('JavaScript Avançado',                     1),
('JavaScript Avançado',                     60),
('Construção de APIs REST',                 30),
('Angular Básico',                          31),
('React Native para Mobile',                32),
('Big Data com Hadoop',                     33),
('Teste de Software na Prática',            34),
('Game Development com Unreal Engine',      35),
('Introdução ao TypeScript',                36),
('Gestão de Produtos Digitais',             37),
('Noções de Docker',                        38),
('Desenvolvimento Backend com Node.js',     4),
('Django para Web',                         39),
('Flutter na Prática',                      40),
('ElasticSearch Básico',                    41),
('Inteligência Artificial com TensorFlow',  42),
('Introdução à Ciência de Dados',           43),
('Marketing Digital para Empresas',         44),
('Excel Avançado',                          23),
('PHP para Web',                            45),
('PHP para Web',                            61),
('MongoDB na Prática',                      46),
('Programação Funcional com Scala',         47),
('Introdução ao C#',                        48),
('Design Thinking para Inovação',           49),
('Internet das Coisas (IoT)',               50),
('Automação com Shell Script',              51),
('Automação com Shell Script',              52),
('Linguagem Go para Backend',               53),
('Sistemas Operacionais na Prática',        54),
('Sistemas Operacionais na Prática',        55);

INSERT INTO Modulo (nome_curso, nome, descricao, ordem_dentro_curso) VALUES
-- Módulos para Desenvolvimento Web Completo
('Desenvolvimento Web Completo',    'Introdução ao Desenvolvimento Web',    'Fundamentos da criação de websites.',                      1),
('Desenvolvimento Web Completo',    'HTML e CSS',                           'Criação de páginas web com HTML e CSS.',                   2),
('Desenvolvimento Web Completo',    'JavaScript Básico',                    'Introdução ao JavaScript para interação com o usuário.',   3),

-- Módulos para Introdução ao Desenvolvimento Mobile
('Introdução ao Desenvolvimento Mobile',    'Introdução ao Desenvolvimento Mobile', 'Fundamentos do desenvolvimento para dispositivos móveis.', 1),
('Introdução ao Desenvolvimento Mobile',    'Android Basics',                       'Criação de aplicativos para Android.',                     2),
('Introdução ao Desenvolvimento Mobile',    'iOS Basics',                           'Criação de aplicativos para iOS.',                         3),

-- Módulos para Data Science com Python
('Data Science com Python', 'Introdução à Ciência de Dados',        'Conceitos básicos de ciência de dados.',                   1),
('Data Science com Python', 'Manipulação de Dados com Pandas',      'Como usar a biblioteca Pandas para manipulação de dados.', 2),
('Data Science com Python', 'Visualização de Dados com Matplotlib', 'Criando gráficos e visualizações com Matplotlib.',         3),

-- Módulos para Fundamentos de Inteligência Artificial
('Fundamentos de Inteligência Artificial',  'Introdução à IA',          'Conceitos básicos sobre inteligência artificial.', 1),
('Fundamentos de Inteligência Artificial',  'Aprendizado de Máquina',   'Técnicas de aprendizado de máquina.',              2),
('Fundamentos de Inteligência Artificial',  'Redes Neurais',            'Introdução às redes neurais.',                     3),

-- Módulos para DevOps para Iniciantes
('DevOps para Iniciantes',  'Fundamentos de DevOps',        'Entenda os princípios de DevOps.',                 1),
('DevOps para Iniciantes',  'Automação de Infraestrutura',  'Automatizando a configuração de infraestrutura.',  2),
('DevOps para Iniciantes',  'Monitoramento e Log',          'Introdução ao monitoramento e logging.',           3),

-- Módulos para UX/UI Design na Prática
('UX/UI Design na Prática', 'Princípios de Design',     'Conceitos fundamentais de design de interface.',       1),
('UX/UI Design na Prática', 'Ferramentas de Design',    'Ferramentas usadas para design de interfaces.',        2),
('UX/UI Design na Prática', 'Testes de Usabilidade',    'Métodos de teste de usabilidade com usuários.',        3),

-- Módulos para Segurança da Informação
('Segurança da Informação', 'Introdução à Segurança',   'Fundamentos da segurança da informação.',          1),
('Segurança da Informação', 'Tipos de Ataques',         'Conheça os tipos de ataques cibernéticos.',        2),
('Segurança da Informação', 'Práticas de Segurança',    'Práticas recomendadas para manter a segurança.',   3),

-- Módulos para Banco de Dados com SQL
('Banco de Dados com SQL',  'Introdução a SQL',         'Conceitos básicos de SQL.',                            1),
('Banco de Dados com SQL',  'Consultas e Filtros',      'Como realizar consultas e aplicar filtros.',           2),
('Banco de Dados com SQL',  'Joins e Relacionamentos',  'Entendendo joins e relacionamentos entre tabelas.',    3),

-- Módulos para Engenharia de Software
('Engenharia de Software',  'Ciclo de Vida do Software',    'Fases do desenvolvimento de software.',            1),
('Engenharia de Software',  'Metodologias Ágeis',           'Introdução às metodologias ágeis.',                2),
('Engenharia de Software',  'Gestão de Projetos',           'Fundamentos de gestão de projetos de software.',   3),

-- Módulos para Arquitetura de Software
('Arquitetura de Software', 'Conceitos de Arquitetura',     'Entendendo a arquitetura de software.',        1),
('Arquitetura de Software', 'Padrões de Arquitetura',       'Estudo de padrões comuns de arquitetura.',     2),
('Arquitetura de Software', 'Documentação de Arquitetura',  'Como documentar a arquitetura de software.',   3),

-- Módulos para Desenvolvimento de Jogos
('Desenvolvimento de Jogos',    'Introdução ao Desenvolvimento de Jogos',   'Fundamentos do desenvolvimento de jogos.',                     1),
('Desenvolvimento de Jogos',    'Criação de Jogos 2D',                      'Desenvolvimento de jogos 2D usando ferramentas populares.',    2),
('Desenvolvimento de Jogos',    'Criação de Jogos 3D',                      'Desenvolvimento de jogos 3D com Unity.',                       3),

-- Módulos para Cloud Computing para Iniciantes
('Cloud Computing para Iniciantes', 'Introdução à Nuvem',   'Conceitos básicos de computação em nuvem.',    1),
('Cloud Computing para Iniciantes', 'Serviços de Nuvem',    'Estudo dos principais serviços de nuvem.',     2),
('Cloud Computing para Iniciantes', 'Arquitetura de Nuvem', 'Princípios de arquitetura em nuvem.',          3),

-- Módulos para Redes de Computadores
('Redes de Computadores',   'Fundamentos de Redes', 'Conceitos básicos de redes de computadores.',      1),
('Redes de Computadores',   'Protocolos de Rede',   'Estudo dos principais protocolos de rede.',        2),
('Redes de Computadores',   'Segurança em Redes',   'Práticas de segurança em redes de computadores.',  3),

-- Módulos para Machine Learning com R
('Machine Learning com R',  'Introdução ao Machine Learning',   'Conceitos básicos de machine learning.',               1),
('Machine Learning com R',  'Modelos de Machine Learning',      'Estudo de diferentes modelos de machine learning.',    2),
('Machine Learning com R',  'Avaliação de Modelos',             'Métodos para avaliar a performance de modelos.',       3),

-- Módulos para Processamento de Dados com Apache Spark
('Processamento de Dados com Apache Spark', 'Introdução ao Apache Spark',   'Fundamentos do Apache Spark.',                     1),
('Processamento de Dados com Apache Spark', 'Processamento em Lote',        'Processamento de dados em lote com Spark.',        2),
('Processamento de Dados com Apache Spark', 'Processamento em Tempo Real',  'Processamento de dados em tempo real com Spark.',  3),

-- Módulos para Blockchain: Fundamentos e Aplicações
('Blockchain: Fundamentos e Aplicações',    'Introdução ao Blockchain',         'Conceitos básicos de blockchain.',                             1),
('Blockchain: Fundamentos e Aplicações',    'Aplicações de Blockchain',         'Casos de uso de blockchain no mundo real.',                    2),
('Blockchain: Fundamentos e Aplicações',    'Desenvolvimento em Blockchain',    'Fundamentos para desenvolver em plataformas de blockchain.',   3),

-- Módulos para Análise de Dados com Excel
('Análise de Dados com Excel',  'Introdução ao Excel',      'Fundamentos do uso do Excel para análise de dados.',   1),
('Análise de Dados com Excel',  'Fórmulas e Funções',       'Uso de fórmulas e funções no Excel.',                  2),
('Análise de Dados com Excel',  'Gráficos e Visualizações', 'Criando gráficos e visualizações no Excel.',           3),

-- Módulos para Automação de Testes
('Automação de Testes', 'Introdução à Automação de Testes', 'Conceitos básicos sobre automação de testes.',             1),
('Automação de Testes', 'Ferramentas de Automação',         'Ferramentas populares para automação de testes.',          2),
('Automação de Testes', 'Práticas de Testes Automatizados', 'Melhores práticas para implementar testes automatizados.', 3),

-- Módulos para Programação para Iniciantes
('Programação para Iniciantes', 'Introdução à Programação', 'Conceitos básicos de programação.',            1),
('Programação para Iniciantes', 'Estruturas de Controle',   'Entendendo estruturas de controle de fluxo.',  2),
('Programação para Iniciantes', 'Funções e Métodos',        'Como criar e usar funções e métodos.',         3),

-- Módulos para Desenvolvimento em Java
('Desenvolvimento em Java', 'Introdução ao Java',               'Fundamentos da programação em Java.',          1),
('Desenvolvimento em Java', 'Orientação a Objetos',             'Princípios de orientação a objetos em Java.',  2),
('Desenvolvimento em Java', 'Desenvolvimento de Aplicações',    'Criando aplicações usando Java.',              3),

-- Módulos para Python para Automação
('Python para Automação',              'Introdução ao Python',                     'Fundamentos da linguagem Python.',                     1),
('Python para Automação',              'Automação de Tarefas com Python',          'Automatize tarefas repetitivas utilizando Python.',    2),
('Python para Automação',              'Manipulação de Arquivos',                  'Como ler, escrever e modificar arquivos com Python.',  3),

-- Módulos para Introdução ao Power BI
('Introdução ao Power BI',             'Fundamentos do Power BI',                  'Introdução às ferramentas e interface do Power BI.',  1),
('Introdução ao Power BI',             'Criação de Relatórios',                    'Aprenda a criar relatórios básicos no Power BI.',      2),
('Introdução ao Power BI',             'Dashboards Interativos',                  'Como criar dashboards dinâmicos e interativos.',       3),

-- Módulos para Kubernetes na Prática
('Kubernetes na Prática',              'Introdução ao Kubernetes',                 'Fundamentos do Kubernetes e arquitetura de contêineres.', 1),
('Kubernetes na Prática',              'Gerenciamento de Pods',                    'Como gerenciar Pods e Deployments no Kubernetes.',     2),
('Kubernetes na Prática',              'Escalabilidade e Monitoramento',           'Escalando aplicações e monitorando o Kubernetes.',     3),

-- Módulos para Introdução ao Ruby on Rails
('Introdução ao Ruby on Rails',        'Fundamentos do Ruby on Rails',             'Introdução ao framework Ruby on Rails e sua estrutura.', 1),
('Introdução ao Ruby on Rails',        'Modelos, Visões e Controladores',          'MVC no Ruby on Rails: Como organizar suas aplicações.', 2),
('Introdução ao Ruby on Rails',        'Construção de uma Aplicação Web',          'Desenvolvendo uma aplicação web completa com Rails.',  3),

-- Módulos para JavaScript Avançado
('JavaScript Avançado',                'Funções Avançadas e Closures',             'Conceitos avançados de funções e closures no JavaScript.', 1),
('JavaScript Avançado',                'Manipulação Assíncrona com Promises',      'Como trabalhar com Promises e funções assíncronas.',  2),
('JavaScript Avançado',                'Frameworks JavaScript',                    'Introdução aos principais frameworks JavaScript (React, Vue, etc.).', 3),

-- Módulos para Construção de APIs REST
('Construção de APIs REST',             'Introdução a APIs REST',                  'Conceitos fundamentais de APIs RESTful e HTTP.',                1),
('Construção de APIs REST',             'Autenticação e Autorização',              'Implementando autenticação e autorização em APIs REST.',        2),
('Construção de APIs REST',             'Desenvolvimento e Testes de APIs',        'Desenvolvendo e testando APIs RESTful com ferramentas modernas.', 3),
('Construção de APIs REST',             'Deploy e Escalabilidade',                 'Como realizar o deploy e escalar suas APIs.',                   4),

-- Módulos para Angular Básico
('Angular Básico',                      'Introdução ao Angular',                   'Fundamentos do framework Angular para aplicações web.',       1),
('Angular Básico',                      'Componentes e Templates',                 'Como criar e usar componentes e templates no Angular.',        2),
('Angular Básico',                      'Diretivas e Serviços',                    'Introdução a diretivas e serviços no Angular.',                3),

-- Módulos para React Native para Mobile
('React Native para Mobile',            'Introdução ao React Native',              'Fundamentos do React Native e criação de aplicações móveis.',  1),
('React Native para Mobile',            'Componentes e Navegação',                 'Trabalhando com componentes e navegação em React Native.',     2),
('React Native para Mobile',            'Acesso a APIs e Usando Armazenamento Local',     'Integrando APIs e usando armazenamento local em apps móveis.', 3),
('React Native para Mobile',            'Publicação no Google Play e App Store',   'Como publicar aplicativos móveis em lojas de apps.',           4),

-- Módulos para Big Data com Hadoop
('Big Data com Hadoop',                 'Introdução ao Big Data e Hadoop',         'Conceitos de Big Data e a arquitetura do Hadoop.',              1),
('Big Data com Hadoop',                 'Processamento de Dados com MapReduce',    'Como utilizar MapReduce para processar dados no Hadoop.',       2),
('Big Data com Hadoop',                 'Armazenamento e Análise de Dados',        'Trabalhando com HDFS e realizando análises de dados em larga escala.', 3),

-- Módulos para Teste de Software na Prática
('Teste de Software na Prática',        'Introdução aos Testes de Software',       'Fundamentos do teste de software e a importância dos testes.', 1),
('Teste de Software na Prática',        'Testes Manuais',                          'Como realizar testes manuais em diferentes tipos de software.', 2),
('Teste de Software na Prática',        'Testes Automatizados',                    'Introdução aos testes automatizados usando ferramentas populares.', 3),

-- Módulos para Game Development com Unreal Engine
('Game Development com Unreal Engine',     'Introdução ao Unreal Engine',            'Fundamentos da Unreal Engine e criação do seu primeiro jogo.', 1),
('Game Development com Unreal Engine',     'Criação de Personagens e Animações',    'Como criar e animar personagens dentro da Unreal Engine.',    2),
('Game Development com Unreal Engine',     'Programação de Jogo com Blueprints',     'Aprenda a programar jogos utilizando Blueprints na Unreal Engine.', 3),
('Game Development com Unreal Engine',     'Desenvolvimento de IA para Jogos',      'Como implementar inteligência artificial para jogos.',        4),
('Game Development com Unreal Engine',     'Otimizando e Publicando seu Jogo',       'Técnicas de otimização e publicação de jogos na Unreal Engine.', 5),

-- Módulos para Introdução ao TypeScript
('Introdução ao TypeScript',               'Fundamentos do TypeScript',              'Entendendo os tipos e a sintaxe básica do TypeScript.', 1),
('Introdução ao TypeScript',               'Tipos Avançados e Generics',             'Aprofundando-se em tipos avançados e generics no TypeScript.', 2),
('Introdução ao TypeScript',               'Integrando TypeScript com JavaScript',   'Como integrar TypeScript em projetos JavaScript existentes.', 3),

-- Módulos para Gestão de Produtos Digitais
('Gestão de Produtos Digitais',            'Introdução à Gestão de Produtos Digitais', 'Conceitos fundamentais de gestão de produtos no ambiente digital.', 1),
('Gestão de Produtos Digitais',            'Metodologias Ágeis em Gestão de Produtos', 'Como utilizar metodologias ágeis como Scrum e Kanban na gestão de produtos.', 2),
('Gestão de Produtos Digitais',            'Ferramentas de Gestão de Produtos',        'Ferramentas essenciais para o gerenciamento de produtos digitais.', 3),

-- Módulos para Noções de Docker
('Noções de Docker',                       'Introdução ao Docker',                   'Fundamentos do Docker e como funciona o conceito de contêineres.', 1),
('Noções de Docker',                       'Criando e Gerenciando Contêineres',      'Como criar, gerenciar e rodar contêineres Docker.', 2),
('Noções de Docker',                       'Docker Compose e Orquestração',         'Como usar o Docker Compose para orquestrar contêineres.', 3),

-- Módulos para Desenvolvimento Backend com Node.js
('Desenvolvimento Backend com Node.js',    'Fundamentos do Node.js',                 'Introdução ao Node.js e como configurar o ambiente de desenvolvimento.', 1),
('Desenvolvimento Backend com Node.js',    'Criação de Servidores com Express.js',   'Como criar servidores robustos utilizando Express.js no Node.js.', 2),
('Desenvolvimento Backend com Node.js',    'Trabalhando com Banco de Dados',        'Como integrar bancos de dados, como MongoDB, com Node.js.', 3),
('Desenvolvimento Backend com Node.js',    'Autenticação e Segurança',              'Implementando autenticação e segurança em APIs com Node.js.', 4),
('Desenvolvimento Backend com Node.js',    'Deploy de Aplicações Backend',          'Como realizar o deploy de aplicações backend com Node.js.', 5),

-- Módulos para Django para Web
('Django para Web',                      'Introdução ao Django',                     'Fundamentos do framework Django e configuração inicial.', 1),
('Django para Web',                      'Trabalhando com Modelos',                  'Como criar e gerenciar modelos no Django.',                2),
('Django para Web',                      'Views e Templates',                        'Como criar views dinâmicas e utilizar templates no Django.', 3),
('Django para Web',                      'Formulários e Validação',                  'Criando e validando formulários com Django.',              4),
('Django para Web',                      'Deploy e Segurança',                       'Como fazer deploy de aplicativos Django e garantir a segurança.', 5),

-- Módulos para Flutter na Prática
('Flutter na Prática',                   'Introdução ao Flutter',                    'Fundamentos do Flutter e configuração de ambiente para apps móveis.', 1),
('Flutter na Prática',                   'Widgets e Layouts',                        'Como trabalhar com widgets e criar layouts no Flutter.',  2),
('Flutter na Prática',                   'Gerenciamento de Estado',                  'Como gerenciar o estado de um aplicativo Flutter.',       3),
('Flutter na Prática',                   'Acesso a APIs e Armazenamento Local',      'Integrando APIs e utilizando armazenamento local no Flutter.', 4),
('Flutter na Prática',                   'Publicação de Apps Flutter',               'Como publicar aplicativos Flutter nas lojas de apps.',    5),

-- Módulos para ElasticSearch Básico
('ElasticSearch Básico',                  'Introdução ao ElasticSearch',               'Fundamentos do ElasticSearch e sua configuração inicial.', 1),
('ElasticSearch Básico',                  'Índices e Documentos',                     'Como criar e gerenciar índices e documentos no ElasticSearch.', 2),
('ElasticSearch Básico',                  'Consultas e Busca',                        'Como realizar consultas e buscas no ElasticSearch.',       3),

-- Módulos para Inteligência Artificial com TensorFlow
('Inteligência Artificial com TensorFlow', 'Introdução ao TensorFlow',                 'Fundamentos do TensorFlow e configuração do ambiente de IA.', 1),
('Inteligência Artificial com TensorFlow', 'Redes Neurais com TensorFlow',             'Como criar e treinar redes neurais com TensorFlow.',        2),
('Inteligência Artificial com TensorFlow', 'Deep Learning e Transfer Learning',       'Técnicas avançadas de Deep Learning e Transfer Learning no TensorFlow.', 3),
('Inteligência Artificial com TensorFlow', 'Modelos de Produção com TensorFlow',       'Como levar modelos de IA para produção com TensorFlow.',    4),

-- Módulos para Introdução à Ciência de Dados
('Introdução à Ciência de Dados',         'Fundamentos da Ciência de Dados',          'Compreendendo os principais conceitos de Ciência de Dados.', 1),
('Introdução à Ciência de Dados',         'Exploração de Dados e Pré-processamento',  'Como explorar e preparar dados para análise e modelagem.', 2),
('Introdução à Ciência de Dados',         'Fundamentos de Machine Learning',           'Fundamentos de Machine Learning e como implementar modelos simples.', 3),
('Introdução à Ciência de Dados',         'Visualização de Dados',                    'Como utilizar ferramentas para visualizar dados de forma eficaz.', 4),

-- Módulos para Marketing Digital para Empresas
('Marketing Digital para Empresas',        'Introdução ao Marketing Digital',        'Fundamentos e estratégias iniciais de marketing digital para empresas.', 1),
('Marketing Digital para Empresas',        'SEO e SEM',                             'Estratégias de otimização para motores de busca (SEO) e marketing de busca (SEM).', 2),
('Marketing Digital para Empresas',        'Redes Sociais e Marketing de Conteúdo',  'Como utilizar redes sociais e criar conteúdo estratégico para engajamento.', 3),
('Marketing Digital para Empresas',        'E-mail Marketing e Automação',          'Como criar campanhas de e-mail marketing e automatizar processos de comunicação.', 4),

-- Módulos para Excel Avançado
('Excel Avançado',                         'Funções Avançadas no Excel',            'Explorando funções avançadas como PROCV, ÍNDICE, CORRESP, entre outras.', 1),
('Excel Avançado',                         'Gráficos e Visualização de Dados',      'Criando gráficos dinâmicos e visualizações para análise de dados complexos.', 2),
('Excel Avançado',                         'Macros e VBA',                          'Automatizando processos no Excel com Macros e VBA.', 3),
('Excel Avançado',                         'Análise de Dados com Power Query',      'Como usar Power Query para transformação e análise avançada de dados.', 4),

-- Módulos para PHP para Web
('PHP para Web',                           'Introdução ao PHP',                     'Fundamentos do PHP e configuração de ambiente para desenvolvimento web.', 1),
('PHP para Web',                           'Formulários e Banco de Dados',          'Como trabalhar com formulários e integrar bancos de dados no PHP.', 2),
('PHP para Web',                           'Manipulação de Sessões e Cookies',      'Trabalhando com sessões e cookies em aplicações web com PHP.', 3),
('PHP para Web',                           'Autenticação e Segurança com PHP',              'Como implementar sistemas de autenticação e segurança em PHP.', 4),

-- Módulos para MongoDB na Prática
('MongoDB na Prática',                     'Introdução ao MongoDB',                 'Fundamentos do MongoDB e como configurar o ambiente de banco NoSQL.', 1),
('MongoDB na Prática',                     'Modelagem de Dados no MongoDB',         'Como criar e gerenciar documentos e coleções no MongoDB.', 2),
('MongoDB na Prática',                     'Consultas e Agregações no MongoDB',     'Realizando consultas avançadas e operações de agregação no MongoDB.', 3),

-- Módulos para Programação Funcional com Scala
('Programação Funcional com Scala',        'Fundamentos da Programação Funcional',  'Introdução ao paradigma funcional e seus princípios em Scala.', 1),
('Programação Funcional com Scala',        'Imutabilidade e Funções de Alta Ordem', 'Compreendendo a imutabilidade e o uso de funções de alta ordem em Scala.', 2),
('Programação Funcional com Scala',        'Tratamento de Erros e Tipos',           'Como tratar erros e utilizar tipos robustos na programação funcional em Scala.', 3),
('Programação Funcional com Scala',        'Concorrência e Parallellism',           'Implementando concorrência e paralelismo na programação funcional com Scala.', 4),

-- Módulos para Introdução ao C#
('Introdução ao C#',                      'Fundamentos do C#',                        'Introdução à linguagem C# e conceitos básicos de programação.', 1),
('Introdução ao C#',                      'Estruturas de Controle com C#',                  'Como usar estruturas de controle (if, loops) em C#.', 2),
('Introdução ao C#',                      'Tipos de Dados e Variáveis',              'Trabalhando com tipos de dados e variáveis em C#.', 3),
('Introdução ao C#',                      'Orientação a Objetos em C#',                    'Introdução à programação orientada a objetos em C#.', 4),

-- Módulos para Design Thinking para Inovação
('Design Thinking para Inovação',         'Introdução ao Design Thinking',           'Compreendendo o conceito e processo de Design Thinking.', 1),
('Design Thinking para Inovação',         'Empatia e Definição do Problema',         'Como praticar empatia e definir problemas com Design Thinking.', 2),
('Design Thinking para Inovação',         'Ideação e Protótipos',                    'Gerando ideias e criando protótipos para soluções inovadoras.', 3),
('Design Thinking para Inovação',         'Testando e Implementando Soluções',       'Como testar e implementar soluções com Design Thinking.', 4),

-- Módulos para Internet das Coisas (IoT)
('Internet das Coisas (IoT)',             'Introdução à IoT',                        'Fundamentos e arquitetura básica da Internet das Coisas.', 1),
('Internet das Coisas (IoT)',             'Sensores e Dispositivos',                 'Trabalhando com sensores e dispositivos IoT.', 2),
('Internet das Coisas (IoT)',             'Conectividade e Redes',                  'Como conectar dispositivos IoT e configurar redes.', 3),
('Internet das Coisas (IoT)',             'Processamento e Análise de Dados',        'Analisando dados de dispositivos IoT e tomando decisões inteligentes.', 4),

-- Módulos para Automação com Shell Script
('Automação com Shell Script',            'Introdução ao Shell Script',              'Fundamentos do shell script e como escrever seus primeiros scripts.', 1),
('Automação com Shell Script',            'Manipulação de Arquivos e Diretórios',    'Como manipular arquivos e diretórios usando shell script.', 2),
('Automação com Shell Script',            'Automação de Tarefas Repetitivas',        'Como automatizar tarefas diárias em sistemas Unix com shell script.', 3),
('Automação com Shell Script',            'Depuração e Execução de Scripts',         'Técnicas para depurar e executar scripts de forma eficiente.', 4),

-- Módulos para Linguagem Go para Backend
('Linguagem Go para Backend',             'Introdução ao Go',                        'Fundamentos da linguagem Go e sua configuração para backend.', 1),
('Linguagem Go para Backend',             'Estruturas de Dados e Concorência',       'Como usar estruturas de dados e concorrência no Go.', 2),
('Linguagem Go para Backend',             'APIs e Web Servers com Go',               'Desenvolvendo APIs e servidores web com Go.', 3),
('Linguagem Go para Backend',             'Testes e Deploy de Aplicações Go',        'Como testar e fazer o deploy de suas aplicações Go.', 4),

-- Módulos para Sistemas Operacionais na Prática
('Sistemas Operacionais na Prática',     'Fundamentos dos Sistemas Operacionais',   'Compreendendo os conceitos fundamentais de sistemas operacionais.', 1),
('Sistemas Operacionais na Prática',     'Gerenciamento de Processos',              'Como gerenciar processos e entender a sua execução no sistema operacional.', 2),
('Sistemas Operacionais na Prática',     'Memória e Armazenamento',                 'Gerenciando memória e armazenamento em sistemas operacionais.', 3),
('Sistemas Operacionais na Prática',     'Sistemas de Arquivos e Segurança',        'Como trabalhar com sistemas de arquivos e garantir a segurança no sistema operacional.', 4);

INSERT INTO Aula (nome_modulo, nome, descricao, duracao, tipo, ordem_dentro_modulo) VALUES
-- Aulas para Módulos de Desenvolvimento Web Completo
('Introdução ao Desenvolvimento Web',   'Aula 1: O que é Desenvolvimento Web?', 'Introdução ao conceito de desenvolvimento web e suas áreas.',  30, 'video', 1),
('Introdução ao Desenvolvimento Web',   'Aula 2: Ferramentas Necessárias',      'Apresentação das ferramentas que serão utilizadas.',           25, 'texto', 2),

('HTML e CSS',  'Aula 1: Estrutura Básica do HTML', 'Aprenda sobre a estrutura básica de um documento HTML.',   40, 'video', 1),
('HTML e CSS',  'Aula 2: Estilizando com CSS',      'Introdução ao CSS e como aplicá-lo ao HTML.',              35, 'texto', 2),

('JavaScript Básico',   'Aula 1: Introdução ao JavaScript', 'Conceitos fundamentais do JavaScript.',        50, 'video', 1),
('JavaScript Básico',   'Aula 2: Manipulando o DOM',        'Como interagir com o DOM usando JavaScript.',  45, 'texto', 2),

-- Aulas para Módulos de Introdução ao Desenvolvimento Mobile
('Introdução ao Desenvolvimento Mobile',    'Aula 1: O que é Desenvolvimento Mobile?',  'Fundamentos do desenvolvimento para dispositivos móveis.',         30, 'video', 1),
('Introdução ao Desenvolvimento Mobile',    'Aula 2: Principais Plataformas',           'Comparação entre as principais plataformas de desenvolvimento.',   25, 'texto', 2),

('Android Basics',  'Aula 1: Configuração do Ambiente', 'Como configurar o ambiente de desenvolvimento para Android.',  40, 'video', 1),
('Android Basics',  'Aula 2: Primeira Aplicação',       'Desenvolvendo sua primeira aplicação Android.',                35, 'texto', 2),

('iOS Basics',  'Aula 1: Introdução ao Xcode',              'Fundamentos do uso do Xcode para desenvolvimento iOS.',    50, 'video', 1),
('iOS Basics',  'Aula 2: Criando uma Aplicação Simples',    'Passo a passo para criar uma aplicação simples em iOS.',   45, 'texto', 2),

-- Aulas para Módulos de Data Science com Python
('Introdução à Ciência de Dados',   'Aula 1: O que é Ciência de Dados?',        'Conceitos básicos sobre ciência de dados e suas aplicações.',  30, 'video', 1),
('Introdução à Ciência de Dados',   'Aula 2: Ferramentas de Ciência de Dados',  'Principais ferramentas utilizadas na ciência de dados.',       25, 'texto', 2),

('Manipulação de Dados com Pandas', 'Aula 1: Introdução ao Pandas', 'Fundamentos da biblioteca Pandas.',    40, 'video', 1),
('Manipulação de Dados com Pandas', 'Aula 2: Limpeza de Dados',     'Como limpar dados utilizando Pandas.', 35, 'texto', 2),

('Visualização de Dados com Matplotlib',    'Aula 1: Criando Gráficos Simples', 'Aprenda a criar gráficos simples com Matplotlib.', 50, 'video', 1),
('Visualização de Dados com Matplotlib',    'Aula 2: Gráficos Avançados',       'Explorando gráficos avançados e personalização.',  45, 'texto', 2),

-- Aulas para Módulos de Fundamentos de Inteligência Artificial
('Introdução à IA', 'Aula 1: História da IA',   'Breve história da inteligência artificial.',   30, 'video', 1),
('Introdução à IA', 'Aula 2: Aplicações da IA', 'Casos de uso da inteligência artificial.',     25, 'texto', 2),

('Aprendizado de Máquina',  'Aula 1: O que é Aprendizado de Máquina?',  'Conceitos básicos do aprendizado de máquina.',                 40, 'video', 1),
('Aprendizado de Máquina',  'Aula 2: Tipos de Algoritmos',              'Entendendo os diferentes tipos de algoritmos de aprendizado.', 35, 'texto', 2),

('Redes Neurais',   'Aula 1: Introdução às Redes Neurais',      'Conceitos fundamentais sobre redes neurais.',              50, 'video', 1),
('Redes Neurais',   'Aula 2: Como Funcionam as Redes Neurais',  'Explorando o funcionamento interno das redes neurais.',    45, 'texto', 2),

-- Aulas para Módulos de DevOps para Iniciantes
('Fundamentos de DevOps',   'Aula 1: O que é DevOps?',  'Conceitos e princípios de DevOps.',    30, 'video', 1),
('Fundamentos de DevOps',   'Aula 2: Cultura DevOps',   'A importância da cultura no DevOps.',  25, 'texto', 2),

('Automação de Infraestrutura', 'Aula 1: Ferramentas de Automação', 'Principais ferramentas para automação de infraestrutura.', 40, 'video', 1),
('Automação de Infraestrutura', 'Aula 2: Implantação Contínua',     'Conceitos de implantação contínua.',                       35, 'texto', 2),

('Monitoramento e Log', 'Aula 1: Introdução ao Monitoramento',  'Fundamentos do monitoramento em DevOps.',      50, 'video', 1),
('Monitoramento e Log', 'Aula 2: Ferramentas de Monitoramento', 'Ferramentas populares para monitoramento.',    45, 'texto', 2),

-- Aulas para Módulos de UX/UI Design na Prática
('Princípios de Design',    'Aula 1: Teoria das Cores', 'Introdução à teoria das cores no design.',             30, 'video', 1),
('Princípios de Design',    'Aula 2: Tipografia',       'Fundamentos de tipografia no design de interfaces.',   25, 'texto', 2),

('Ferramentas de Design',   'Aula 1: Introdução ao Figma',  'Como usar o Figma para design de interfaces.', 40, 'video', 1),
('Ferramentas de Design',   'Aula 2: Prototipagem',         'Criando protótipos no Figma.',                 35, 'texto', 2),

('Testes de Usabilidade',   'Aula 1: O que é Teste de Usabilidade?',    'Conceitos e importância dos testes de usabilidade.',   50, 'video', 1),
('Testes de Usabilidade',   'Aula 2: Métodos de Teste',                 'Explorando métodos de testes de usabilidade.',         45, 'texto', 2),

-- Aulas para Módulos de Segurança da Informação
('Introdução à Segurança',  'Aula 1: Importância da Segurança da Informação',   'Por que a segurança da informação é essencial?',       30, 'video', 1),
('Introdução à Segurança',  'Aula 2: Princípios da Segurança',                  'Princípios fundamentais de segurança da informação.',  25, 'texto', 2),

('Tipos de Ataques',    'Aula 1: Phishing', 'O que é phishing e como se proteger.',     40, 'video',    1),
('Tipos de Ataques',    'Aula 2: Malware',  'Tipos de malware e suas consequências.',   35, 'texto',    2),

('Práticas de Segurança',   'Aula 1: Criptografia', 'Conceitos básicos sobre criptografia.',                50, 'video', 1),
('Práticas de Segurança',   'Aula 2: Autenticação', 'Métodos de autenticação em segurança da informação.',  45, 'texto', 2),

-- Aulas para Módulos de Banco de Dados com SQL
('Introdução a SQL',    'Aula 1: O que é SQL?',         'Conceitos básicos sobre SQL.', 30, 'video', 1),
('Introdução a SQL',    'Aula 2: Instalando o MySQL',   'Como instalar o MySQL.',       25, 'texto', 2),

('Consultas e Filtros', 'Aula 1: SELECT e WHERE',   'Como usar SELECT e WHERE em consultas SQL.',   40, 'video', 1),
('Consultas e Filtros', 'Aula 2: ORDER BY e LIMIT', 'Organizando resultados com ORDER BY e LIMIT.', 35, 'texto', 2),

('Joins e Relacionamentos', 'Aula 1: INNER JOIN',   'Entendendo INNER JOIN em SQL.',            50, 'video', 1),
('Joins e Relacionamentos', 'Aula 2: OUTER JOIN',   'Diferença entre INNER JOIN e OUTER JOIN.', 45, 'texto', 2),

-- Aulas para Módulos de Engenharia de Software
('Ciclo de Vida do Software',   'Aula 1: O que é o Ciclo de Vida do Software?', 'Fundamentos do ciclo de vida do software.',                    30, 'video', 1),
('Ciclo de Vida do Software',   'Aula 2: Modelos de Desenvolvimento',           'Comparação entre os principais modelos de desenvolvimento.',   25, 'texto', 2),

('Metodologias Ágeis',  'Aula 1: O que são Metodologias Ágeis?',    'Conceitos básicos sobre metodologias ágeis.',  40, 'video', 1),
('Metodologias Ágeis',  'Aula 2: Scrum',                            'Como funciona o Scrum na prática.',            35, 'texto', 2),

-- Aulas para Python para Automação
('Introdução ao Python', 'Aula 1: Introdução ao Python', 'Fundamentos da linguagem Python.', 40, 'video', 1),

('Automação de Tarefas com Python', 'Aula 1: Automação de Tarefas com Python', 'Automatize tarefas repetitivas utilizando Python.', 45, 'texto', 1),

('Manipulação de Arquivos', 'Aula 1: Manipulação de Arquivos', 'Como ler, escrever e modificar arquivos com Python.', 35, 'video', 1),

-- Aulas para Introdução ao Power BI
('Fundamentos do Power BI', 'Aula 1: Fundamentos do Power BI', 'Introdução às ferramentas e interface do Power BI.', 30, 'video', 1),

('Criação de Relatórios', 'Aula 2: Criação de Relatórios', 'Aprenda a criar relatórios básicos no Power BI.', 35, 'texto', 1),

('Dashboards Interativos', 'Aula 3: Dashboards Interativos', 'Como criar dashboards dinâmicos e interativos.', 40, 'video', 1),

-- Aulas para Kubernetes na Prática
('Introdução ao Kubernetes', 'Aula 1: Introdução ao Kubernetes', 'Fundamentos do Kubernetes e arquitetura de contêineres.', 45, 'video', 1),

('Gerenciamento de Pods', 'Aula 1: Gerenciamento de Pods', 'Como gerenciar Pods e Deployments no Kubernetes.', 50, 'texto', 1),

('Escalabilidade e Monitoramento', 'Aula 1: Escalabilidade e Monitoramento', 'Escalando aplicações e monitorando o Kubernetes.', 55, 'video', 1),

-- Aulas para Introdução ao Ruby on Rails
('Fundamentos do Ruby on Rails', 'Aula 1: Fundamentos do Ruby on Rails', 'Introdução ao framework Ruby on Rails e sua estrutura.', 40, 'video', 1),

('Modelos, Visões e Controladores', 'Aula 1: Modelos, Visões e Controladores', 'MVC no Ruby on Rails: Como organizar suas aplicações.', 45, 'texto', 1),

('Construção de uma Aplicação Web', 'Aula 1: Construção de uma Aplicação Web', 'Desenvolvendo uma aplicação web completa com Rails.', 50, 'video', 1),

-- Aulas para JavaScript Avançado
('Funções Avançadas e Closures', 'Aula 1: Funções Avançadas e Closures', 'Conceitos avançados de funções e closures no JavaScript.', 40, 'video', 1),

('Manipulação Assíncrona com Promises', 'Aula 1: Manipulação Assíncrona com Promises', 'Como trabalhar com Promises e funções assíncronas.', 45, 'texto', 1),

('Construção de uma Aplicação Web', 'Aula 1: Frameworks JavaScript', 'Introdução aos principais frameworks JavaScript (React, Vue, etc.).', 50, 'video', 1),

-- Aulas para Construção de APIs REST
('Introdução a APIs REST', 'Aula 1: Introdução a APIs REST', 'Conceitos fundamentais de APIs RESTful e HTTP.', 40, 'video', 1),

('Autenticação e Autorização', 'Aula 1: Autenticação e Autorização', 'Implementando autenticação e autorização em APIs REST.', 45, 'texto', 2),

('Desenvolvimento e Testes de APIs', 'Aula 1: Desenvolvimento e Testes de APIs', 'Desenvolvendo e testando APIs RESTful com ferramentas modernas.', 50, 'video', 3),

('Deploy e Escalabilidade', 'Aula 1: Deploy e Escalabilidade', 'Como realizar o deploy e escalar suas APIs.', 55, 'texto', 4),

-- Aulas para Angular Básico
('Introdução ao Angular', 'Aula 1: Introdução ao Angular', 'Fundamentos do framework Angular para aplicações web.', 40, 'video', 1),

('Componentes e Templates', 'Aula 1: Componentes e Templates', 'Como criar e usar componentes e templates no Angular.', 45, 'texto', 1),

('Diretivas e Serviços', 'Aula 1: Diretivas e Serviços', 'Introdução a diretivas e serviços no Angular.', 50, 'video', 1),

-- Aulas para React Native para Mobile
('Introdução ao React Native', 'Aula 1: Introdução ao React Native', 'Fundamentos do React Native e criação de aplicações móveis.', 40, 'video', 1),

('Componentes e Navegação', 'Aula 1: Componentes e Navegação', 'Trabalhando com componentes e navegação em React Native.', 45, 'texto', 1),

('Acesso a APIs e Usando Armazenamento Local', 'Aula 1: Acesso a APIs e Armazenamento Local', 'Integrando APIs e usando armazenamento local em apps móveis.', 50, 'video', 1),

('Publicação no Google Play e App Store', 'Aula 1: Publicação no Google Play e App Store', 'Como publicar aplicativos móveis em lojas de apps.', 55, 'texto', 1),

-- Aulas para Big Data com Hadoop
('Introdução ao Big Data e Hadoop', 'Aula 1: Introdução ao Big Data e Hadoop', 'Conceitos de Big Data e a arquitetura do Hadoop.', 45, 'video', 1),

('Processamento de Dados com MapReduce', 'Aula 1: Processamento de Dados com MapReduce', 'Como utilizar MapReduce para processar dados no Hadoop.', 50, 'texto', 1),

('Armazenamento e Análise de Dados', 'Aula 1: Armazenamento e Análise de Dados', 'Trabalhando com HDFS e realizando análises de dados em larga escala.', 55, 'video', 1),

-- Aulas para Teste de Software na Prática
('Introdução aos Testes de Software', 'Aula 1: Introdução aos Testes de Software', 'Fundamentos do teste de software e a importância dos testes.', 40, 'video', 1),
('Testes Manuais', 'Aula 2: Testes Manuais', 'Como realizar testes manuais em diferentes tipos de software.', 45, 'texto', 2),
('Testes Automatizados', 'Aula 3: Testes Automatizados', 'Introdução aos testes automatizados usando ferramentas populares.', 50, 'video', 3),

-- Aulas para Game Development com Unreal Engine
('Introdução ao Unreal Engine', 'Aula 1: Introdução ao Unreal Engine', 'Fundamentos da Unreal Engine e criação do seu primeiro jogo.', 45, 'video', 1),

('Criação de Personagens e Animações', 'Aula 1: Criação de Personagens e Animações', 'Como criar e animar personagens dentro da Unreal Engine.', 50, 'texto', 1),

('Programação de Jogo com Blueprints', 'Aula 1: Programação de Jogo com Blueprints', 'Aprenda a programar jogos utilizando Blueprints na Unreal Engine.', 55, 'video', 1),

('Desenvolvimento de IA para Jogos', 'Aula 1: Desenvolvimento de IA para Jogos', 'Como implementar inteligência artificial para jogos.', 60, 'texto', 1),

('Otimizando e Publicando seu Jogo', 'Aula 1: Otimizando e Publicando seu Jogo', 'Técnicas de otimização e publicação de jogos na Unreal Engine.', 65, 'video', 1),

-- Aulas para Introdução ao TypeScript
('Fundamentos do TypeScript', 'Aula 1: Fundamentos do TypeScript', 'Entendendo os tipos e a sintaxe básica do TypeScript.', 40, 'video', 1),

('Tipos Avançados e Generics', 'Aula 1: Tipos Avançados e Generics', 'Aprofundando-se em tipos avançados e generics no TypeScript.', 45, 'texto', 1),

('Integrando TypeScript com JavaScript', 'Aula 1: Integrando TypeScript com JavaScript', 'Como integrar TypeScript em projetos JavaScript existentes.', 50, 'video', 1),

-- Aulas para Gestão de Produtos Digitais
('Introdução à Gestão de Produtos Digitais', 'Aula 1: Introdução à Gestão de Produtos Digitais', 'Conceitos fundamentais de gestão de produtos no ambiente digital.', 40, 'video', 1),

('Metodologias Ágeis em Gestão de Produtos', 'Aula 1: Metodologias Ágeis', 'Como utilizar metodologias ágeis como Scrum e Kanban na gestão de produtos.', 45, 'texto', 1),

('Ferramentas de Gestão de Produtos', 'Aula 1: Ferramentas de Gestão de Produtos', 'Ferramentas essenciais para o gerenciamento de produtos digitais.', 50, 'video', 1),

-- Aulas para Noções de Docker
('Introdução ao Docker', 'Aula 1: Introdução ao Docker', 'Fundamentos do Docker e como funciona o conceito de contêineres.', 40, 'video', 1),

('Criando e Gerenciando Contêineres', 'Aula 1: Criando e Gerenciando Contêineres', 'Como criar, gerenciar e rodar contêineres Docker.', 45, 'texto', 1),

('Docker Compose e Orquestração', 'Aula 1: Docker Compose e Orquestração', 'Como usar o Docker Compose para orquestrar contêineres.', 50, 'video', 1),

-- Aulas para Desenvolvimento Backend com Node.js
('Fundamentos do Node.js', 'Aula 1: Fundamentos do Node.js', 'Introdução ao Node.js e como configurar o ambiente de desenvolvimento.', 45, 'video', 1),

('Criação de Servidores com Express.js', 'Aula 1: Criação de Servidores com Express.js', 'Como criar servidores robustos utilizando Express.js no Node.js.', 50, 'texto', 1),

('Trabalhando com Banco de Dados', 'Aula 1: Trabalhando com Banco de Dados', 'Como integrar bancos de dados, como MongoDB, com Node.js.', 55, 'video', 1),

('Autenticação e Segurança', 'Aula 1: Autenticação e Segurança', 'Implementando autenticação e segurança em APIs com Node.js.', 60, 'texto', 1),

('Deploy de Aplicações Backend', 'Aula 1: Deploy de Aplicações Backend', 'Como realizar o deploy de aplicações backend com Node.js.', 65, 'video', 1),

-- Aulas para Django para Web
('Introdução ao Django', 'Aula 1: Introdução ao Django', 'Fundamentos do framework Django e configuração inicial.', 40, 'video', 1),

('Trabalhando com Modelos', 'Aula 1: Trabalhando com Modelos', 'Como criar e gerenciar modelos no Django.', 45, 'texto', 1),

('Views e Templates', 'Aula 1: Views e Templates', 'Como criar views dinâmicas e utilizar templates no Django.', 50, 'video', 1),

('Formulários e Validação', 'Aula 1: Formulários e Validação', 'Criando e validando formulários com Django.', 55, 'texto', 1),

('Deploy e Segurança', 'Aula 1: Deploy e Segurança', 'Como fazer deploy de aplicativos Django e garantir a segurança.', 60, 'video', 1),

-- Aulas para Flutter na Prática
('Introdução ao Flutter', 'Aula 1: Introdução ao Flutter', 'Fundamentos do Flutter e configuração de ambiente para apps móveis.', 40, 'video', 1),

('Widgets e Layouts', 'Aula 1: Widgets e Layouts', 'Como trabalhar com widgets e criar layouts no Flutter.', 45, 'texto', 1),

('Gerenciamento de Estado', 'Aula 1: Gerenciamento de Estado', 'Como gerenciar o estado de um aplicativo Flutter.', 50, 'video', 1),

('Acesso a APIs e Armazenamento Local', 'Aula 1: Acesso a APIs e Armazenamento Local com Flutter', 'Integrando APIs e utilizando armazenamento local no Flutter.', 55, 'texto', 1),

('Publicação de Apps Flutter', 'Aula 1: Publicação de Apps Flutter', 'Como publicar aplicativos Flutter nas lojas de apps.', 60, 'video', 1),

-- Aulas para ElasticSearch Básico
('Introdução ao ElasticSearch', 'Aula 1: Introdução ao ElasticSearch', 'Fundamentos do ElasticSearch e sua configuração inicial.', 40, 'video', 1),

('Índices e Documentos', 'Aula 1: Índices e Documentos', 'Como criar e gerenciar índices e documentos no ElasticSearch.', 45, 'texto', 1),

('Consultas e Busca', 'Aula 1: Consultas e Busca', 'Como realizar consultas e buscas no ElasticSearch.', 50, 'video', 1),

-- Aulas para Inteligência Artificial com TensorFlow
('Introdução ao TensorFlow', 'Aula 1: Introdução ao TensorFlow', 'Fundamentos do TensorFlow e configuração do ambiente de IA.', 45, 'video', 1),

('Redes Neurais com TensorFlow', 'Aula 1: Redes Neurais com TensorFlow', 'Como criar e treinar redes neurais com TensorFlow.', 50, 'texto', 1),

('Deep Learning e Transfer Learning', 'Aula 1: Deep Learning e Transfer Learning', 'Técnicas avançadas de Deep Learning e Transfer Learning no TensorFlow.', 55, 'video', 1),

('Modelos de Produção com TensorFlow', 'Aula 1: Modelos de Produção com TensorFlow', 'Como levar modelos de IA para produção com TensorFlow.', 60, 'texto', 1),

-- Aulas para Introdução à Ciência de Dados
('Fundamentos da Ciência de Dados', 'Aula 1: Fundamentos da Ciência de Dados', 'Compreendendo os principais conceitos de Ciência de Dados.', 40, 'video', 1),

('Exploração de Dados e Pré-processamento', 'Aula 1: Exploração de Dados e Pré-processamento', 'Como explorar e preparar dados para análise e modelagem.', 45, 'texto', 1),

('Fundamentos de Machine Learning', 'Aula 1: Introdução ao Machine Learning', 'Fundamentos de Machine Learning e como implementar modelos simples.', 50, 'video', 1),

('Visualização de Dados', 'Aula 1: Visualização de Dados', 'Como utilizar ferramentas para visualizar dados de forma eficaz.', 55, 'texto', 1),

-- Aulas para Marketing Digital para Empresas
('Introdução ao Marketing Digital', 'Aula 1: Introdução ao Marketing Digital', 'Fundamentos e estratégias iniciais de marketing digital para empresas.', 40, 'video', 1),

('SEO e SEM', 'Aula 1: SEO e SEM', 'Estratégias de otimização para motores de busca (SEO) e marketing de busca (SEM).', 45, 'texto', 1),

('Redes Sociais e Marketing de Conteúdo', 'Aula 1: Redes Sociais e Marketing de Conteúdo', 'Como utilizar redes sociais e criar conteúdo estratégico para engajamento.', 50, 'video', 1),

('E-mail Marketing e Automação', 'Aula 1: E-mail Marketing e Automação', 'Como criar campanhas de e-mail marketing e automatizar processos de comunicação.', 55, 'texto', 1),

-- Aulas para Excel Avançado
('Funções Avançadas no Excel', 'Aula 1: Funções Avançadas no Excel', 'Explorando funções avançadas como PROCV, ÍNDICE, CORRESP, entre outras.', 40, 'video', 1),

('Gráficos e Visualização de Dados', 'Aula 1: Gráficos e Visualização de Dados', 'Criando gráficos dinâmicos e visualizações para análise de dados complexos.', 45, 'texto', 1),

('Macros e VBA', 'Aula 1: Macros e VBA', 'Automatizando processos no Excel com Macros e VBA.', 50, 'video', 1),

('Análise de Dados com Power Query', 'Aula 1: Análise de Dados com Power Query', 'Como usar Power Query para transformação e análise avançada de dados.', 55, 'texto', 1),

-- Aulas para PHP para Web
('Introdução ao PHP', 'Aula 1: Introdução ao PHP', 'Fundamentos do PHP e configuração de ambiente para desenvolvimento web.', 40, 'video', 1),

('Formulários e Banco de Dados', 'Aula 1: Formulários e Banco de Dados', 'Como trabalhar com formulários e integrar bancos de dados no PHP.', 45, 'texto', 1),

('Manipulação de Sessões e Cookies', 'Aula 1: Manipulação de Sessões e Cookies', 'Trabalhando com sessões e cookies em aplicações web com PHP.', 50, 'video', 1),

('Autenticação e Segurança com PHP', 'Aula 1: Autenticação e Segurança com PHP', 'Como implementar sistemas de autenticação e segurança em PHP.', 55, 'texto', 1),

-- Aulas para MongoDB na Prática
('Introdução ao MongoDB', 'Aula 1: Introdução ao MongoDB', 'Fundamentos do MongoDB e como configurar o ambiente de banco NoSQL.', 40, 'video', 1),

('Modelagem de Dados no MongoDB', 'Aula 1: Modelagem de Dados no MongoDB', 'Como criar e gerenciar documentos e coleções no MongoDB.', 45, 'texto', 1),

('Consultas e Agregações no MongoDB', 'Aula 1: Consultas e Agregações no MongoDB', 'Realizando consultas avançadas e operações de agregação no MongoDB.', 50, 'video', 1),

-- Aulas para Programação Funcional com Scala
('Fundamentos da Programação Funcional', 'Aula 1: Fundamentos da Programação Funcional', 'Introdução ao paradigma funcional e seus princípios em Scala.', 45, 'video', 1),

('Imutabilidade e Funções de Alta Ordem', 'Aula 1: Imutabilidade e Funções de Alta Ordem', 'Compreendendo a imutabilidade e o uso de funções de alta ordem em Scala.', 50, 'texto', 1),

('Tratamento de Erros e Tipos', 'Aula 1: Tratamento de Erros e Tipos', 'Como tratar erros e utilizar tipos robustos na programação funcional em Scala.', 55, 'video', 1),

('Concorrência e Parallellism', 'Aula 1: Concorrência e Paralelismo', 'Implementando concorrência e paralelismo na programação funcional com Scala.', 60, 'texto', 1),

-- Aulas para Introdução ao C#
('Fundamentos do C#', 'Aula 1: Fundamentos do C#', 'Introdução à linguagem C# e conceitos básicos de programação.', 40, 'video', 1),

('Estruturas de Controle com C#', 'Aula 1: Estruturas de Controle', 'Como usar estruturas de controle (if, loops) em C#.', 45, 'texto', 1),

('Tipos de Dados e Variáveis', 'Aula 1: Tipos de Dados e Variáveis', 'Trabalhando com tipos de dados e variáveis em C#.', 50, 'video', 1),

('Orientação a Objetos em C#', 'Aula 1: Orientação a Objetos em C#', 'Introdução à programação orientada a objetos em C#.', 55, 'texto', 1),

-- Aulas para Design Thinking para Inovação
('Introdução ao Design Thinking', 'Aula 1: Introdução ao Design Thinking', 'Compreendendo o conceito e processo de Design Thinking.', 40, 'video', 1),

('Empatia e Definição do Problema', 'Aula 1: Empatia e Definição do Problema', 'Como praticar empatia e definir problemas com Design Thinking.', 45, 'texto', 1),

('Ideação e Protótipos', 'Aula 1: Ideação e Protótipos', 'Gerando ideias e criando protótipos para soluções inovadoras.', 50, 'video', 1),

('Testando e Implementando Soluções', 'Aula 1: Testando e Implementando Soluções', 'Como testar e implementar soluções com Design Thinking.', 55, 'texto', 1),

-- Aulas para Internet das Coisas (IoT)
('Introdução à IoT', 'Aula 1: Introdução à IoT', 'Fundamentos e arquitetura básica da Internet das Coisas.', 40, 'video', 1),

('Sensores e Dispositivos', 'Aula 1: Sensores e Dispositivos', 'Trabalhando com sensores e dispositivos IoT.', 45, 'texto', 1),

('Conectividade e Redes', 'Aula 1: Conectividade e Redes', 'Como conectar dispositivos IoT e configurar redes.', 50, 'video', 1),

('Processamento e Análise de Dados', 'Aula 1: Processamento e Análise de Dados', 'Analisando dados de dispositivos IoT e tomando decisões inteligentes.', 55, 'texto', 1),

-- Aulas para Automação com Shell Script
('Introdução ao Shell Script', 'Aula 1: Introdução ao Shell Script', 'Fundamentos do shell script e como escrever seus primeiros scripts.', 40, 'video', 1),

('Manipulação de Arquivos e Diretórios', 'Aula 1: Manipulação de Arquivos e Diretórios', 'Como manipular arquivos e diretórios usando shell script.', 45, 'texto', 1),

('Automação de Tarefas Repetitivas', 'Aula 1: Automação de Tarefas Repetitivas', 'Como automatizar tarefas diárias em sistemas Unix com shell script.', 50, 'video', 1),

('Depuração e Execução de Scripts', 'Aula 1: Depuração e Execução de Scripts', 'Técnicas para depurar e executar scripts de forma eficiente.', 55, 'texto', 1),

-- Aulas para Linguagem Go para Backend
('Introdução ao Go', 'Aula 1: Introdução ao Go', 'Fundamentos da linguagem Go e sua configuração para backend.', 40, 'video', 1),

('Estruturas de Dados e Concorência', 'Aula 1: Estruturas de Dados e Concorência', 'Como usar estruturas de dados e concorrência no Go.', 45, 'texto', 1),

('APIs e Web Servers com Go', 'Aula 1: APIs e Web Servers com Go', 'Desenvolvendo APIs e servidores web com Go.', 50, 'video', 1),

('Testes e Deploy de Aplicações Go', 'Aula 1: Testes e Deploy de Aplicações Go', 'Como testar e fazer o deploy de suas aplicações Go.', 55, 'texto', 1),

-- Aulas para Sistemas Operacionais na Prática
('Fundamentos dos Sistemas Operacionais', 'Aula 1: Fundamentos dos Sistemas Operacionais', 'Compreendendo os conceitos fundamentais de sistemas operacionais.', 40, 'video', 1),

('Gerenciamento de Processos', 'Aula 1: Gerenciamento de Processos', 'Como gerenciar processos e entender a sua execução no sistema operacional.', 45, 'texto', 1),

('Memória e Armazenamento', 'Aula 1: Memória e Armazenamento', 'Gerenciando memória e armazenamento em sistemas operacionais.', 50, 'video', 1),

('Sistemas de Arquivos e Segurança', 'Aula 1: Sistemas de Arquivos e Segurança', 'Como trabalhar com sistemas de arquivos e garantir a segurança no sistema operacional.', 55, 'texto', 1);

INSERT INTO Empresa (nome, localizacao, setor) VALUES
('Tech Solutions',          'São Paulo, SP',        'Tecnologia da Informação'),
('Innovatech',              'Rio de Janeiro, RJ',   'Desenvolvimento de Software'),
('Data Insights',           'Belo Horizonte, MG',   'Análise de Dados'),
('Quality First',           'Curitiba, PR',         'Teste de Software'),
('Creative Labs',           'Porto Alegre, RS',     'Design e Criação'),
('Software Dynamics',       'Brasília, DF',         'Desenvolvimento de Software'),
('OpsGenie',                'Florianópolis, SC',    'DevOps e Infraestrutura'),
('Project Hub',             'Campinas, SP',         'Gestão de Projetos'),
('SecureIT',                'Salvador, BA',         'Segurança da Informação'),
('LearnTech',               'Fortaleza, CE',        'Educação Online'),
('Mobile Innovations',      'Natal, RN',            'Desenvolvimento Mobile'),
('Digital Reach',           'Recife, PE',           'Marketing Digital'),
('Product Visionaries',     'Goiânia, GO',          'Gestão de Produtos'),
('Insight Analytics',       'Manaus, AM',           'Análise de Dados'),
('Tech Advisors',           'Vitória, ES',          'Consultoria de TI'),
('Database Masters',        'Joinville, SC',        'Banco de Dados'),
('Full Stack Agency',       'Santos, SP',           'Desenvolvimento Web'),
('AI Research Labs',        'Belo Horizonte, MG',   'Inteligência Artificial'),
('Support Solutions',       'Caxias do Sul, RS',    'Suporte Técnico'),
('Systems Analysis Inc.',   'São José, SC',         'Análise de Sistemas');

INSERT INTO Vaga (id, nome, descricao, empresa) VALUES
(1,     'Desenvolvedor Front-end',                'Responsável pela criação e manutenção de interfaces de usuário.',                  'Tech Solutions'),
(2,     'Desenvolvedor Back-end',                 'Foco em desenvolvimento de APIs e integração de sistemas.',                        'Innovatech'),
(3,     'Cientista de Dados',                     'Análise de dados e construção de modelos preditivos.',                             'Data Insights'),
(4,     'Analista de Qualidade',                  'Garantir a qualidade dos produtos através de testes manuais e automatizados.',     'Quality First'),
(5,     'Designer de UI/UX',                      'Criação de interfaces intuitivas e experiências de usuário.',                      'Creative Labs'),
(6,     'Engenheiro de Software',                 'Desenvolvimento de software em equipe e implementação de melhorias.',              'Software Dynamics'),
(7,     'Especialista em DevOps',                 'Implementação de práticas DevOps e automação de processos.',                       'OpsGenie'),
(8,     'Gerente de Projetos',                    'Liderar equipes em projetos de desenvolvimento de software.',                      'Project Hub'),
(9,     'Analista de Segurança da Informação',    'Proteger os dados e sistemas da empresa.',                                         'SecureIT'),
(10,    'Instrutor de Cursos Online',             'Criar e ministrar cursos de tecnologia.',                                          'LearnTech'),
(11,    'Estágio Desenvolvedor Mobile',           'Criação de aplicativos para Android e iOS.',                                       'Mobile Innovations'),
(12,    'Analista de Marketing Digital',          'Planejamento e execução de campanhas online.',                                     'Digital Reach'),
(13,    'Gerente de Produto',                     'Definir a visão e o roadmap do produto.',                                          'Product Visionaries'),
(14,    'Analista de Dados',                      'Coletar e interpretar dados para gerar insights.',                                 'Insight Analytics'),
(15,    'Consultor de TI',                        'Auxiliar empresas na implementação de soluções tecnológicas.',                     'Tech Advisors'),
(16,    'Especialista em Banco de Dados',         'Gerenciamento e otimização de bancos de dados.',                                   'Database Masters'),
(17,    'Desenvolvedor Full Stack',               'Atuação em todas as camadas de desenvolvimento.',                                  'Full Stack Agency'),
(18,    'Pesquisador em Inteligência Artificial', 'Desenvolver e testar algoritmos de IA.',                                           'AI Research Labs'),
(19,    'Coordenador de Suporte Técnico',         'Gerenciar a equipe de suporte e atendimento ao cliente.',                          'Support Solutions'),
(20,    'Analista de Sistemas',                   'Levantar requisitos e analisar sistemas existentes.',                              'Systems Analysis Inc.'),
(21,    'Engenheiro de Machine Learning',         'Desenvolver e implementar modelos de aprendizado de máquina.',                     'AI Research Labs'),
(22,    'Analista de Infraestrutura',             'Gerenciar e otimizar a infraestrutura de TI.',                                     'SecureIT'),
(23,    'Desenvolvedor de Jogos',                 'Criar jogos para diferentes plataformas.',                                         'Creative Labs'),
(24,    'Consultor em Segurança da Informação',   'Ajudar empresas a implementar políticas de segurança.',                            'SecureIT'),
(25,    'Desenvolvedor em Cloud Computing',       'Gerenciar serviços e soluções na nuvem.',                                          'Tech Solutions'),
(26,    'Redator Técnico',                        'Produzir documentação técnica e manuais.',                                         'LearnTech'),
(27,    'Especialista em Testes Automatizados',   'Desenvolver e executar testes automatizados.',                                     'Quality First'),
(28,    'Analista de SEO',                        'Otimizar conteúdo para mecanismos de busca.',                                      'Digital Reach'),
(29,    'Coordenador de Desenv. de Software',     'Supervisionar equipes de desenvolvimento.',                                        'Software Dynamics'),
(30,    'Estágio em IoT',                         'Desenvolver soluções para dispositivos conectados.',                               'Innovatech');

INSERT INTO Estuda (email_aluno, nome_curso, data_conclusao, nota)
SELECT 
    A.email, 
    C.nome, 
    '2021-01-01'::DATE + (FLOOR(RANDOM() * ('2024-12-31'::DATE - '2021-01-01'::DATE + 1)))::INTEGER AS data_conclusao, -- Gera uma data aleatória entre 2021 e 2024
    (5 + RANDOM() * 5)::NUMERIC(3, 1) AS nota -- Gera uma nota aleatória entre 5.0 e 10.0
FROM 
    Aluno A,
    (SELECT nome FROM Curso) C -- Seleciona todos os cursos
WHERE 
    RANDOM() < 0.07; -- Ajusta a probabilidade para controlar a quantidade de inscrições

INSERT INTO Ministra (email_professor, nome_curso) VALUES
('marcossilva@gmail.com',           'Desenvolvimento Web Completo'),
('lucianaalmeida@hotmail.com',      'Introdução ao Desenvolvimento Mobile'),
('carlossantos@gmail.com',          'Data Science com Python'),
('patriciaoliveira@hotmail.com',    'Fundamentos de Inteligência Artificial'),
('robertopereira@gmail.com',        'DevOps para Iniciantes'),
('fernandacosta@hotmail.com',       'UX/UI Design na Prática'),
('anasouza@gmail.com',              'Segurança da Informação'),
('brunorocha@hotmail.com',          'Banco de Dados com SQL'),
('deboranunes@gmail.com',           'Engenharia de Software'),
('felipecardoso@hotmail.com',       'Arquitetura de Software'),
('gabrielamendes@gmail.com',        'Desenvolvimento de Jogos'),
('joaofernandes@hotmail.com',       'Cloud Computing para Iniciantes'),
('camilaribeiro@gmail.com',         'Redes de Computadores'),
('renatocarvalho@hotmail.com',      'Machine Learning com R'),
('isabelamartins@gmail.com',        'Processamento de Dados com Apache Spark'),
('lucasmoreira@hotmail.com',        'Blockchain: Fundamentos e Aplicações'),
('larissabatista@gmail.com',        'Análise de Dados com Excel'),
('paulobarreto@hotmail.com',        'Automação de Testes'),
('vanessasilva@gmail.com',          'Programação para Iniciantes'),
('rodrigomonteiro@hotmail.com',     'Desenvolvimento em Java'),
('marcossilva@gmail.com',           'Python para Automação'),
('lucianaalmeida@hotmail.com',      'Introdução ao Power BI'),
('carlossantos@gmail.com',          'Kubernetes na Prática'),
('patriciaoliveira@hotmail.com',    'Introdução ao Ruby on Rails'),
('robertopereira@gmail.com',        'JavaScript Avançado'),
('fernandacosta@hotmail.com',       'Construção de APIs REST'),
('anasouza@gmail.com',              'Angular Básico'),
('brunorocha@hotmail.com',          'React Native para Mobile'),
('deboranunes@gmail.com',           'Big Data com Hadoop'),
('felipecardoso@hotmail.com',       'Teste de Software na Prática'),
('gabrielamendes@gmail.com',        'Game Development com Unreal Engine'),
('joaofernandes@hotmail.com',       'Introdução ao TypeScript'),
('camilaribeiro@gmail.com',         'Gestão de Produtos Digitais'),
('renatocarvalho@hotmail.com',      'Noções de Docker'),
('isabelamartins@gmail.com',        'Desenvolvimento Backend com Node.js'),
('lucasmoreira@hotmail.com',        'Django para Web'),
('larissabatista@gmail.com',        'Flutter na Prática'),
('paulobarreto@hotmail.com',        'ElasticSearch Básico'),
('vanessasilva@gmail.com',          'Inteligência Artificial com TensorFlow'),
('rodrigomonteiro@hotmail.com',     'Introdução à Ciência de Dados'),
('marcossilva@gmail.com',           'Marketing Digital para Empresas'),
('lucianaalmeida@hotmail.com',      'Excel Avançado'),
('carlossantos@gmail.com',          'PHP para Web'),
('patriciaoliveira@hotmail.com',    'MongoDB na Prática'),
('robertopereira@gmail.com',        'Programação Funcional com Scala'),
('fernandacosta@hotmail.com',       'Introdução ao C#'),
('marcossilva@gmail.com',           'Design Thinking para Inovação'),
('lucianaalmeida@hotmail.com',      'Automação com Shell Script'),
('carlossantos@gmail.com',          'Internet das Coisas (IoT)'),
('patriciaoliveira@hotmail.com',    'Linguagem Go para Backend'),
('robertopereira@gmail.com',        'Sistemas Operacionais na Prática');

INSERT INTO Se_Inscreve (email_aluno, id_vaga)
SELECT 
    A.email, 
    V.id
FROM 
    Aluno A,
    (SELECT id FROM Vaga) V -- Seleciona todas as vagas
WHERE 
    RANDOM() < 0.07; -- Ajusta a probabilidade para controlar a quantidade de inscrições

INSERT INTO Habilidade_Vaga (id_vaga, id_habilidade) VALUES
(1,     1),
(1,     2),
(2,     4),
(3,     8),
(4,     5),
(5,     3),
(6,     26),
(7,     55),
(8,     58),
(9,     8),
(10,    3),
(11,    6),
(12,    13),
(13,    58),
(14,    8),
(15,    52),
(16,    59),
(17,    1),
(18,    8),
(19,    8),
(20,    13),
(21,    8),
(21,    42),
(22,    55),
(22,    54),
(23,    35),
(24,    18),
(25,    17),
(25,    28),
(26,    56),
(26,    57),
(27,    5),
(27,    26),
(28,    44),
(29,    26),
(30,    50),
(30,    48);

-- Vaga "Desenvolvedor Front-end" (id=1) pede JavaScript Avançado (id=1) e HTML/CSS Intermediário (id=2),
-- Ou seja, para um aluno ser qualificado ele precisa ter JavaScript Avançado e HTML/CSS Intermediário ou Avançado.
-- O curso "Desenvolvimento Web Completo" oferece JavaScript, Node.js e HTML/CSS avançados, já cumprindo todos requisitos pra vaga.
-- O curso "JavaScript Avançado" oferece JavaScript e Node.js avançados, cumprindo parte requisitos pra vaga.
-- O curso "UX/UI Design na Prática" oferece UX/UI e HTML/CSS intermediários, cumprindo parte requisitos pra vaga.
-- O curso "PHP para Web" oferece HTML/CSS iniciante, não cumprindo nenhum requisito para vaga.
-- Portanto um aluno é qualificado para essa vaga se tiver feito o curso "Desenvolvimento Web Completo", ou "JavaScript Avançado" + "UX/UI Design na Prática", ou os três. 

INSERT INTO Aluno (email, nome, data_nascimento, status_plano) VALUES
('sabrina.nogueira@gmail.com', 'Sabrina Nogueira', '1984-12-06', 'ativo'),
('felipe.rodrigues@gmail.com', 'Felipe Rodrigues', '1982-05-27', 'ativo'),
('eduardo.gomes@gmail.com', 'Eduardo Gomes', '1982-01-09', 'ativo'),
('ana.laura.azevedo@gmail.com', 'Ana Laura Azevedo', '1984-10-11', 'ativo');

INSERT INTO Se_Inscreve (email_aluno, id_vaga) VALUES
('sabrina.nogueira@gmail.com', 1),
('felipe.rodrigues@gmail.com', 1),
('eduardo.gomes@gmail.com', 1),
('ana.laura.azevedo@gmail.com', 1);

INSERT INTO Estuda (email_aluno, nome_curso, data_conclusao, nota) VALUES
('sabrina.nogueira@gmail.com', 'Desenvolvimento Web Completo', '2022-12-31', 10), --Qualificado
('felipe.rodrigues@gmail.com', 'JavaScript Avançado', '2022-12-31', 10), --Qualificado
('felipe.rodrigues@gmail.com', 'UX/UI Design na Prática', '2022-12-31', 10),
('eduardo.gomes@gmail.com', 'JavaScript Avançado', '2022-12-31', 10),  --Não Qualificado
('eduardo.gomes@gmail.com', 'PHP para Web', '2022-12-31', 10),
('ana.laura.azevedo@gmail.com', 'UX/UI Design na Prática', '2022-12-31', 10); --Não Qualificado
