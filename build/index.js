"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando localhost 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    const users = (0, database_1.getAllUsers)();
    res.status(200).send(users);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    (0, database_2.createUser)(id, email, password);
    res.status(201).send("Cliente cadastrado com sucesso!");
});
app.get('/products', (req, res) => {
    const produtos = (0, database_2.getAllProducts)();
    res.status(200).send(produtos);
});
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;
    (0, database_2.createProduct)(id, name, price, category);
    res.status(201).send("Produto cadastrado com sucesso!");
});
app.get('/product/search', (req, res) => {
    const q = req.query.q;
    const result = (0, database_2.queryProductsByName)(q);
    res.status(200).send(result);
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = (0, database_2.getProductById)(id);
    res.status(200).send(result);
});
app.post("/purchases", (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
    res.status(201).send("Compra realizada com sucesso!");
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const result = (0, database_1.getAllPurchasesFromUserId)(id);
    res.status(200).send(result);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.deleteUserById)(id);
    res.status(200).send("User apagado com sucesso!");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.deleteProductById)(id);
    res.status(200).send("Produto apagado com sucesso!");
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const userToEdit = (0, database_1.getUserById)(id);
    if (userToEdit) {
        userToEdit.email = newEmail || userToEdit.email;
        userToEdit.password = newPassword || userToEdit.password;
        res.status(200).send("Cadastro atualizado com sucesso!");
    }
    else {
        res.status(404).send("Usuário não encontrado!");
    }
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = (0, database_2.getProductById)(id);
    if (product) {
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.category = newCategory || product.category;
        res.status(200).send("Produto atualizado com sucesso!");
    }
    else {
        res.status(404).send("Produto não encontrado!");
    }
});
//# sourceMappingURL=index.js.map