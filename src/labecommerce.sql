-- Active: 1695683221724@@127.0.0.1@3306




CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
     created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
		ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);

INSERT INTO users (id, name, email, password)
VALUES
  ('001', 'Marcos', 'marcos@email.com', '123496'),
  ('002', 'Amanda', 'amanda@email.com', '654320'),
  ('003', 'Marcela', 'marcela@email.com', '131313'),
  ('004', 'Ozéias', 'ozeias@email.com', '111111');


DELETE FROM users WHERE id = '001';

SELECT * FROM users;
DROP TABLE users;

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
    ('01', 'Camiseta', 70.99, 'Algodão', 'url_imagem_1.jpg'),
    ('02', 'Calça Jeans', 59.99, 'Jeans preto', 'url_imagem_2.jpg'),
    ('03', 'Shorts', 299.99, 'Tactel', 'url_imagem_3.jpg'),
    ('04', 'Terno', 1099.99, 'Branco', 'url_imagem_4.jpg'),
    ('05', 'Vestido', 99.99, 'Florido', 'url_imagem_5.jpg'),
    ('06', 'Saia', 199.99, 'Mini-saia', 'url_imagem_6.jpg');

SELECT * FROM products;

SELECT * FROM products
WHERE name = 'Calça Jeans';

DELETE FROM products WHERE id = '01';

UPDATE products SET price = 200.99 WHERE id = '02';

UPDATE products SET 
  name = 'Gravata',
  price = 9.79,
  description = 'Gravata lisa',
  image_url = 'novaimagemurl.jpg'
WHERE id = '05';

DROP TABLE products;


DROP TABLE purchases;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    product_id TEXT, 
    product_description TEXT,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- a) Crie um pedido para cada pessoa cadastrada
INSERT INTO purchases (id, buyer_id, total_price, product_id, product_description)
VALUES 
('p001', '001', 75.50, '01', ' produto 1'),
('p002', '002', 100.25, '02', 'produto 2');

INSERT INTO purchases (id, buyer_id, total_price, product_id, product_description)
VALUES 
('p003', '003', 75.50, '03', 'Descrição produto 3');



-- Todos os pedidos
SELECT * FROM purchases;

 -- b) Edite o preço total do pedido (só pra praticar)
UPDATE purchases
SET total_price = 97.00
WHERE id = 'p001';

UPDATE purchases
SET total_price = 29.99
WHERE id = 'U002';

SELECT
    p.id AS id_da_compra,
    u.id AS id_de_quem_fez_a_compra,
    u.name AS nome_de_quem_fez_a_compra,
    u.email AS email_de_quem_fez_a_compra,
    p.total_price AS preco_total_da_compra,
    p.created_at AS data_da_compra
FROM
    purchases AS p
JOIN
    users AS u ON p.buyer_id = u.id
WHERE
    p.id = '01';

DROP TABLE purchases_products;

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
	ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("p001", "01", 10),
("p002", "02", 10),
("p003", "03", 5);

SELECT * FROM purchases_products;