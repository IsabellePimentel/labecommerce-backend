-- Active: 1673873949173@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES ('01', 'Maria', 'maria@email.com', "12345A"),
       ('02', 'Joao', 'joao@email.com', "54321B"),
       ('03', 'Pedro', 'pedro@email.com', "C15234");

       
SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO     products (id, name, price, description, category, image_url)
VALUES ('01', 'Bolo de chocolate', 30, 'Massa Diet', 'Comida', 'https://picsum.photos/200'),
       ('02', 'Bolo de cenoura', 35, 'Vegano', 'Comida', 'https://picsum.photos/200'),
       ('03', 'Espatula', 80, 'Silicone', 'Acessorio', 'https://picsum.photos/200'),
       ('04', 'Colher', 50, 'Madeira', 'Acessorio', 'https://picsum.photos/200'),
       ('05', 'Avental', 200, 'Customizado', 'Roupa', 'https://picsum.photos/200');


SELECT * FROM products;


SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name='Bolo de cenoura';

INSERT INTO users(id, name, email, password) VALUES ('04','Joana', 'joana@gmail.com','D12354');

INSERT INTO products(id, name, price, description, category, image_url) VALUES ('06', 'Luva', 20, 'Borracha', 'Roupa', 'https://picsum.photos/200');

SELECT * FROM products
WHERE id='04';

DELETE FROM users
WHERE id='04';

DELETE FROM products
WHERE id='02';

UPDATE users SET password='e123456' WHERE id='01';

UPDATE products SET price='150' WHERE id='05';


SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products;

SELECT * FROM products
ORDER BY price ASC
limit 0, 20
;


SELECT * FROM products
WHERE price BETWEEN 20 AND 30
ORDER BY price ASC;

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, buyer_id, total_price, paid)
VALUES 
    ('01', '01', 60, 0 ), 
    ('02', '01', 80, 1), 
    ('03', '01', 50, 0), 
    ('04', '01', 70, 0), 
    ('05', '03',  200, 0 ), 
    ('06', '03', 80, 0);

UPDATE purchases
SET paid = 1
WHERE id = '02';

SELECT * FROM purchases
INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "02";

CREATE TABLE purchases_products (
    product_id TEXT NOT NULL,
    purchase_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
    ("01", "01", 2), 
    ("02", "03", 1), 
    ("03", "04", 1);

SELECT * FROM purchases_products pp 
INNER JOIN purchases pu ON pp.purchase_id = pu.id
INNER JOIN products pr ON pp.product_id = pr.id;