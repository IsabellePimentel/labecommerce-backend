-- Active: 1673873949173@@127.0.0.1@3306

CREATE Table
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO users (id, email, password)
VALUES ('01', 'maria@email.com', "12345A"),
       ('02', 'joao@email.com', "54321B"),
       ('03', 'pedro@email.com', "C15234");

       
SELECT * FROM users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO products (id, name, price, category)
VALUES ('01', 'Bolo de chocolate', 30, 'Comida'),
       ('02', 'Bolo de cenoura', 35, 'Comida'),
       ('03', 'Espatula', 80, 'Acessorio'),
       ('04', 'Colher', 50, 'Acessorio'),
       ('05', 'Avental', 200, 'Roupa');


SELECT * FROM products;


SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name='Bolo de cenoura';

INSERT INTO users VALUES ('04','joana@gmail.com','D12354');

INSERT INTO products VALUES ('06', 'Luva',20, 'Roupa');

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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL, 
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL, 
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES 
    ('01', 60, 0, NULL, '01'), 
    ('02', 80, 1, NULL, '01'), 
    ('03', 50, 0, NULL, '02'), 
    ('04', 70, 0, NULL, '02'), 
    ('05', 200, 0, NULL, '03'), 
    ('06', 80, 0, NULL, '03');

UPDATE purchases
SET delivered_at = DATETIME('now'),
    paid = 1
WHERE id = '02';

SELECT * FROM purchases
INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "02";

