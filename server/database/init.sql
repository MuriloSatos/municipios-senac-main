

--crie a databse
CREATE DATABASE municipiosdb;



--se conecte a database municipiosdb antes de rodar o script abaixo
CREATE TABLE municipios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  caracteristica TEXT
);

INSERT INTO municipios (nome, estado, caracteristica) VALUES
('Rio de Janeiro', 'RJ', 'Cristo Redentor e praias famosas'),
('São Paulo', 'SP', 'Centro financeiro e cultural do Brasil'),
('Salvador', 'BA', 'Carnaval e arquitetura colonial'),
('Brasília', 'DF', 'Capital do país e cidade planejada'),
('Curitiba', 'PR', 'Cidade modelo em planejamento urbano'),
('Fortaleza', 'CE', 'Praias e culinária nordestina'),
('Porto Alegre', 'RS', 'Cultura gaúcha e qualidade de vida'),
('Recife', 'PE', 'Veneza brasileira e polo tecnológico'),
('Belo Horizonte', 'MG', 'Culinária mineira e vida noturna'),
('Florianópolis', 'SC', 'Ilhas e praias paradisíacas');
