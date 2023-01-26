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
    try {
        let users = (0, database_1.getAllUsers)();
        res.status(200).send(users);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
});
app.post('/users', (req, res) => {
    try {
        const { id, email, password } = req.body;
        let errors = validaUserBody(id, email);
        if (errors.length > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_2.createUser)(id, email, password);
            res.status(201).send("Cliente cadastrado com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
});
app.get('/products', (req, res) => {
    try {
        let products = (0, database_2.getAllProducts)();
        res.status(200).send(products);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
});
app.post('/products', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        let errors = validaProductBody(id);
        if (errors.length > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_2.createProduct)(id, name, price, category);
            res.status(201).send("Produto cadastrado com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
});
app.get('/product/search', (req, res) => {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400).send("query params deve possuir pelo menos um caractere.");
        }
        let result = (0, database_2.queryProductsByName)(q);
        res.status(200).send(result);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = (0, database_2.getProductById)(id);
    res.status(200).send(result);
});
app.post("/purchases", (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        let errors = validaPurchaseBody(userId, productId, quantity, totalPrice);
        if (errors.length > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
            res.status(201).send("Compra realizada com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
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
function validaUserBody(id, email) {
    let errors = [];
    let existId = (0, database_1.getUserById)(id);
    if (existId) {
        errors.push("não é possível criar mais de uma conta com a mesma id");
    }
    let existEmail = (0, database_1.getUserByEmail)(email);
    if (existEmail) {
        errors.push("não é possível criar mais de uma conta com o mesmo email");
    }
    return errors;
}
function validaProductBody(id) {
    let errors = [];
    let existId = (0, database_2.getProductById)(id);
    if (existId) {
        errors.push("não é possível criar mais de um produto com a mesma id");
    }
    return errors;
}
function validaPurchaseBody(idUser, idProduct, quantidade, price) {
    let errors = [];
    let existIdUser = (0, database_1.getUserById)(idUser);
    if (!existIdUser) {
        errors.push("id do usuário que fez a compra deve existir no array de usuários cadastrados");
    }
    let existIdProduct = (0, database_2.getProductById)(idProduct);
    if (!existIdProduct) {
        errors.push("id do produto que foi comprado deve existir no array de produtos cadastrados");
    }
    let valorASerCadastrado = price / quantidade;
    if ((existIdProduct === null || existIdProduct === void 0 ? void 0 : existIdProduct.price) !== valorASerCadastrado) {
        errors.push("a quantidade e o total da compra devem estar com o cálculo correto");
    }
    return errors;
}
//# sourceMappingURL=index.js.map