
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