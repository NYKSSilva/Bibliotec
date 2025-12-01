-- ===========================================================
-- CRIAÇÃO DO BANCO DE DADOS
-- ===========================================================
CREATE DATABASE IF NOT EXISTS dblivraria;
USE dblivraria;

-- ===========================================================
-- TABELA DE USUÁRIOS
-- ===========================================================
CREATE TABLE IF NOT EXISTS usuarios (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  matricula VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  cpf CHAR(11) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  celular VARCHAR(20),
  curso ENUM('Técnico em Administração', 'Técnico em Desenvolvimento de Sistemas', 'Técnico em Logística', 'Técnico em Metalurgia', ''),
  perfil ENUM('Aluno', 'Admin') DEFAULT 'Aluno'
);

DROP TABLE usuarios
-- ===========================================================
-- DADOS DE USUÁRIOS
-- ===========================================================
INSERT INTO usuarios (nome, matricula, email, cpf, senha, data_nascimento, celular, curso, perfil) VALUES
('Vitor Lima', '109202305', 'vitor.lima@email.com', '101202302', '1234', '1998-04-04' , '11949567824', '', 'Admin'),
('Mariana Bandoni', '25163024', 'marianabandoni@gmail.com', '53218604016', '1504', '2007-02-19' , '11966301040', 'Técnico em Logística', 'Aluno'),
('Vitor Pimentel', '25163133', 'vitorpimentel@gmail.com', '54507890860', '0403', '2009-03-04' , '11930816802', 'Técnico em Desenvolvimento de Sistemas', 'Aluno'),
('Giovanna Santana', '25161494', 'giovannasantana@gmail.com', '56509812300', '0702', '2008-02-07' , '11914562789', 'Técnico em Administração', 'Aluno'),
('Renan Mendonça', '25163704', 'renanmendoca@gmail.com', '56732908012', '0912', '200-12-09' , '11971278998', 'Técnico em Metalurgia', 'Aluno')

-- ===========================================================
-- TABELA DE LIVROS
-- ===========================================================
CREATE TABLE IF NOT EXISTS livros (
    idLivro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(100),
    editora VARCHAR(100),
    ano_publicacao SMALLINT,
    isbn_10 CHAR(10),
    isbn_13 CHAR(14),
    idioma VARCHAR(50) DEFAULT 'Português',
    formato ENUM('Físico', 'E-book', 'Audiobook') DEFAULT 'Físico',
    caminho_capa VARCHAR(255),
    sinopse TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE livros

-- ===========================================================
-- DADOS DE LIVROS
-- ===========================================================
INSERT INTO livros (titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo)
VALUES
('O Melhor Do JavaScript', 'Douglas Crockford', 'Livro Didático', 'Alta Books', 2009, '8576082799', '978-8576082798','Português', 'Físico', 'https://m.media-amazon.com/images/I/81csG1Z+6eL._SY425_.jpg', 'O Melhor do JavaScript, de Douglas Crockford, apresenta um conjunto selecionado das partes mais seguras, claras e poderosas do JavaScript, separando-as de suas várias características problemáticas. O autor, referência mundial na linguagem, mostra como aproveitar apenas o que há de melhor no JavaScript para escrever código mais elegante, confiável e fácil de manter.', 0),
('Metalurgia Do pó: Produtos Sinterizados e Manufatura Aditiva', 'Daniel Rodrigues', 'Livro Didático', 'Blucher', 2024, '8521223552', '978-8521223559', 'Português', 'E-book', 'https://staticbv.bvirtual.com.br/publicacoes/219118/thumbs/thumbnail_397_x_595.jpg', 'O livro oferece uma visão completa da metalurgia do pó, cobrindo desde a produção e caracterização de pós metálicos até processos de conformação, sinterização e manufatura aditiva. Explica métodos como atomização, redução, moagem, compactação, moldagem por injeção e impressão 3D, além dos mecanismos e condições de sinterização. Também descreve os principais produtos sinterizados, como aços, metais duros, materiais magnéticos e porosos. Com abordagem didática, ilustrações e foco técnico, a obra serve tanto para iniciantes quanto para profissionais que buscam aplicação industrial.', 1),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Ficção/Fantasia', 'Pottermore Publishing', 2015, '', '978-1781103685', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/81pB+joKL4L._SY466_.jpg', 'Harry, um garoto que nunca soube de seu verdadeiro passado, começa a receber misteriosas cartas de Hogwarts, sempre confiscadas por seus tios. No dia de seu aniversário de onze anos, Hagrid aparece e revela que Harry é um bruxo e foi aceito na famosa escola de magia. A partir daí, sua vida muda completamente e uma grande aventura tem início.', 0)
('Diário de um Banana. Dias de Cão - Volume 4', 'Jeff Kinney', 'Infantil', 'Vergara e Riba', 2011, '8576832763', '978-8576832768', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/41XZpFdwsLL._SY445_SX342_ControlCacheEqualizer_.jpg', 'No quarto volume da série, Greg Heffley decide começar o seu verão cheio de planos para descansar, jogar videogame e evitar qualquer tipo de responsabilidade. Porém, seus sonhos são destruídos quando sua mãe insiste para que ele saia de casa e aproveite o “ar livre”. Para piorar, conflitos com seu melhor amigo Rowley e situações constrangedoras típicas de Greg transformam as férias em um verdadeiro caos. Entre brigas, fracassos e aventuras inesperadas, Greg descobre que o verão perfeito está longe de acontecer.', 0),
('Vidas Secas', 'Graciliano Ramos', 'Romance', 'Principis', 2024, '6550971292', '978-6550971298', 'Português', 'Audiobook', 'https://m.media-amazon.com/images/I/618-b9Im6dL._SY466_.jpg', 'A história acompanha uma família de retirantes — Fabiano, Sinhá Vitória, os dois filhos e a cadela Baleia — que luta para sobreviver à seca brutal do sertão nordestino. Em meio à fome, pobreza e deslocamentos constantes, eles enfrentam a dureza da vida com esperança limitada, sempre sonhando com um futuro melhor, mas presos a um ciclo de miséria e sofrimento imposto pela seca e pelas injustiças sociais.', 1),
('O bosque das coisas perdidas', 'Shea Ernshaw', 'Fantasia', 'Galera', 2022, '6559810860', '978-6559810864', 'Português', 'E-book', 'https://m.media-amazon.com/images/I/51d-LmLdCaL._SY445_SX342_ControlCacheEqualizer_.jpg', 'A história acompanha Evie, uma garota que, após a morte da mãe, muda-se para uma pequena cidade onde existe um bosque misterioso. Dizem que nele aparecem objetos perdidos… e também pessoas. Quando Evie entra no bosque, acaba descobrindo segredos sombrios, criaturas mágicas e verdades sobre si mesma que nunca imaginou. É uma jornada de coragem, descoberta e reconciliação com o passado.', 1),
('1984', 'George Orwell', 'Ficção Científica', 'Companhia das Letras', 2009, '', '978-8580864458', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/91g5gcjTxsL._SY466_.jpg', 'Em uma sociedade totalmente controlada pelo Estado, Winston Smith trabalha reescrevendo documentos para que o governo sempre pareça certo. O Grande Irmão vigia tudo e todos. Insatisfeito com a opressão, Winston passa a questionar o regime e inicia um romance proibido. Porém, em um mundo onde até pensar é perigoso, a busca pela liberdade pode custar muito caro.', 1),
('A Metarmofose', 'Franz Kafka', 'Ficção', 'Principis', 2019, '8594318782', '978-8594318787', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/51H+90dUjzL._SY445_SX342_ControlCacheEqualizer_.jpg', 'Gregor Samsa, um caixeiro-viajante, acorda certa manhã transformado em um inseto gigante. Enquanto tenta lidar com a nova condição, vê sua família oscilar entre preocupação, vergonha e rejeição. Preso ao próprio quarto e incapaz de comunicar-se como antes, Gregor enfrenta o isolamento e a perda de sua humanidade, revelando a fragilidade dos laços familiares e sociais.', 1),
('Noites Brancas', 'Fyodor Dostoevsky', 'Romance', 'Editora 34', 2009, '8573263350', '978-8573263350', 'Português', 'E-book', 'https://m.media-amazon.com/images/I/7143D7foVmL._SY466_.jpg', 'A novela acompanha um jovem sonhador solitário que, durante quatro noites em São Petersburgo, conhece Nástienka, uma jovem triste à espera do homem que ama. Enquanto os dois compartilham histórias, esperanças e medos, o narrador se apaixona por ela. Porém, sua felicidade é ameaçada quando o passado de Nástienka retorna, deixando-o dividido entre o sonho e a realidade.', 1),
('O Assasino de Roger Ackroyd', 'Agatha Christie', 'Mistério', 'Globo Livros', 2014, '8525057002', '978-8525057006', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/619Yb0M3jpL._SY445_SX342_ControlCacheEqualizer_.jpg', 'Na pequena vila de King’s Abbot, o rico Roger Ackroyd é encontrado morto em sua mansão logo após receber informações comprometedores sobre um segredo perigoso. O famoso detetive Hercule Poirot, que vivia aposentado na vila, é chamado para investigar. Conforme desvenda pistas e contradições entre os moradores, Poirot revela uma verdade surpreendente que muda completamente a compreensão do crime.', 1),
('A Hora da Estrela', 'Clarice Lispector', 'Romance', 'New Directions', 2020, '', '978-0811230995', 'Português', 'Audiobook', 'https://m.media-amazon.com/images/I/611IB4Nvf6L._SY466_.jpg', 'O romance narra a vida de Macabéa, uma jovem nordestina pobre que vive no Rio de Janeiro em completa invisibilidade social. Ingênua e sem grandes perspectivas, ela tenta sobreviver entre um trabalho precário e sonhos mínimos. A história é contada pelo narrador Rodrigo S. M., que reflete sobre a existência frágil da protagonista. A trajetória de Macabéa culmina em um desfecho trágico, revelando a dureza e a injustiça da vida daqueles que passam despercebidos pelo mundo.', 0),
('Dom Casmurro', 'Machado de Assis', 'Ficção/Romance', 'Liveright Publishing Corporation', 2024, '1324095148', '978-1324095149', 'Português', 'Físico', 'https://m.media-amazon.com/images/I/81DX-YcL09L._SY466_.jpg', 'Bento Santiago, já adulto, decide escrever suas memórias para tentar “atar as duas pontas da vida”. Ele relembra sua juventude, seu romance com Capitu e o casamento que depois se deteriora. Consumido pelo ciúme, Bento passa a desconfiar que Capitu o traiu com seu melhor amigo, Escobar. Sem provas concretas, sua versão levanta dúvidas sobre o que realmente aconteceu, fazendo do livro um clássico sobre memória, ciúme e ambiguidade.', 1)
-- ===========================================================
-- TABELA DE AVALIAÇÕES
-- ===========================================================
CREATE TABLE IF NOT EXISTS avaliacoes (
    idAvaliacao INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,
    nota DECIMAL(2,1) CHECK (nota >= 0 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idLivro) REFERENCES livros(idLivro) ON DELETE CASCADE
);

DROP TABLE avaliacoes

-- ===========================================================
-- DADOS DE AVALIAÇÕES
-- ===========================================================
INSERT INTO avaliacoes (idUsuario, idLivro, nota, comentario)
VALUES
(1, 1, 5.0, 'História envolvente e personagens cativantes.'),
(2, 1, 4.5, 'Ótima leitura, final surpreendente.'),
(3, 2, 4.0, 'Excelente abordagem sobre tecnologia e negócios.'),
(1, 2, 5.0, 'Leitura obrigatória para todo desenvolvedor.'),
(2, 3, 3.5, 'Ideia interessante, mas um pouco confusa em alguns trechos.'),
(3, 3, 4.8, 'Um clássico atemporal, narrativa impecável.');

-- ===========================================================
-- TABELA DE RESERVAS
-- ===========================================================

CREATE TABLE IF NOT EXISTS reservas (
  idReservas int(11) NOT NULL AUTO_INCREMENT,
  idUsuario int(11) NOT NULL,
  idLivro int(11) NOT NULL,
  data_retirada date NOT NULL,
  data_devolucao date NOT NULL,
  confirmado_email tinyint(1) DEFAULT 0,
  criado_em timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (idReservas),
  KEY idUsuario (idUsuario),
  KEY idLivro (idLivro),
  CONSTRAINT reservas_ibfk_1 FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE,
  CONSTRAINT reservas_ibfk_2 FOREIGN KEY (idLivro) REFERENCES livros (idLivro) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- ===========================================================
-- DADOS DE RESERVAS
-- ===========================================================

INSERT INTO `reservas` (idReservas, idUsuario, idLivro, data_retirada, data_devolucao, confirmado_email, criado_em) VALUES
    (2, 1, 2, '2025-11-06', '2025-11-16', 0, '2025-11-06 13:18:14'),
    (3, 1, 2, '2025-11-01', '2025-11-04', 0, '2025-11-06 13:18:37');
   
-- ===========================================================
-- TABELA DE FAVORITOS
-- ===========================================================

CREATE TABLE IF NOT EXISTS favoritos (
  idFavorito int(11) NOT NULL AUTO_INCREMENT,
  idUsuario int(11) NOT NULL,
  idLivro int(11) NOT NULL,
  data_favoritado timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (idFavorito),
  KEY idUsuario (idUsuario),
  KEY idLivro (idLivro),
  CONSTRAINT favoritos_ibfk_1 FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE,
  CONSTRAINT favoritos_ibfk_2 FOREIGN KEY (idLivro) REFERENCES livros (idLivro) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- ===========================================================
-- DADOS DE RESERVAS
-- ===========================================================

INSERT INTO favoritos (idFavorito, idUsuario, idLivro, data_favoritado) VALUES
    (2, 5, 2, '2025-11-06 13:43:39');