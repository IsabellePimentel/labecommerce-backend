"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield (0, database_1.getAllUsers)();
        res.status(200).send(users);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        let errors = yield validaUserBody(id, email);
        if (errors.length > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_2.createUser)(id, name, email, password);
            res.status(201).send("Cliente cadastrado com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield (0, database_2.getAllProducts)();
        res.status(200).send(products);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, price, category, image_url } = req.body;
        let errors = yield validaProductBody(id);
        if (errors.length > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_2.createProduct)(id, name, description, price, category, image_url);
            res.status(201).send("Produto cadastrado com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.get('/product/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400).send("query params deve possuir pelo menos um caractere.");
        }
        let result = yield (0, database_2.queryProductsByName)(q);
        res.status(200).send(result);
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, database_2.getProductById)(id);
        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("produto não existe");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer_id, product_id, total_price, paid, quantidade } = req.body = req.body;
        let errors = yield validaPurchaseBody(id, buyer_id, product_id, total_price, quantidade);
        if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            (0, database_1.createPurchase)(id, buyer_id, total_price, paid, product_id, quantidade);
            res.status(201).send("Compra realizada com sucesso!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let errors = yield userExists(id);
        if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
            console.log(errors);
            res.status(400).send(errors);
        }
        else {
            const result = yield (0, database_1.getAllPurchasesFromUserId)(id);
            res.status(200).send(result);
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let errors = yield userExists(id);
    if (errors.length > 0) {
        console.log(errors);
        res.status(400).send(errors);
    }
    else {
        yield (0, database_1.deleteUserById)(id);
        res.status(200).send("User apagado com sucesso!");
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let errors = productExists(id);
    if (errors.length > 0) {
        console.log(errors);
        res.status(400).send(errors);
    }
    else {
        yield (0, database_1.deleteProductById)(id);
        res.status(200).send("Produto apagado com sucesso!");
    }
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const userToEdit = yield (0, database_1.getUserById)(id);
        if (userToEdit) {
            if (typeof newEmail !== 'undefined' && newEmail !== userToEdit.email) {
                let userExists = yield (0, database_1.getUserByEmail)(newEmail);
                if (userExists) {
                    throw new Error('Não é possível alterar pois já existe um usuário com o mesmo email.');
                }
            }
            userToEdit.email = newEmail || userToEdit.email;
            userToEdit.password = newPassword || userToEdit.password;
            res.status(200).send("Cadastro atualizado com sucesso!");
        }
        else {
            res.status(400).send("Usuário não encontrado!");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = yield (0, database_2.getProductById)(id);
    if (product) {
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.category = newCategory || product.category;
        res.status(200).send("Produto atualizado com sucesso!");
    }
    else {
        res.status(400).send("Produto não encontrado!");
    }
}));
function validaUserBody(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        let existId = yield (0, database_1.getUserById)(id);
        if ((existId === null || existId === void 0 ? void 0 : existId.id) === id) {
            errors.push("não é possível criar mais de uma conta com a mesma id");
        }
        let existEmail = yield (0, database_1.getUserByEmail)(email);
        if ((existEmail === null || existEmail === void 0 ? void 0 : existEmail.email) === email) {
            errors.push("não é possível criar mais de uma conta com o mesmo email");
        }
        return errors;
    });
}
function validaProductBody(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        let existId = yield (0, database_2.getProductById)(id);
        if ((existId === null || existId === void 0 ? void 0 : existId.id) === id) {
            errors.push("não é possível criar mais de um produto com a mesma id");
        }
        return errors;
    });
}
function userExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        let existId = yield (0, database_1.getUserById)(id);
        if (!existId) {
            errors.push("usuário de id fornecido não existe");
        }
        return errors;
    });
}
function productExists(id) {
    let errors = [];
    let existId = (0, database_2.getProductById)(id);
    if (!existId) {
        errors.push("Produto de id fornecido não existe");
    }
    return errors;
}
function validaPurchaseBody(id, idUser, idProduct, total_price, quantidade) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        let existIdUser = yield (0, database_1.getUserById)(idUser);
        if (!existIdUser) {
            errors.push("id do usuário que fez a compra deve existir no array de usuários cadastrados");
        }
        let existIdProduct = yield (0, database_2.getProductById)(idProduct);
        if (!existIdProduct) {
            errors.push("Produto não existe");
        }
        let existIdPurchase = yield (0, database_1.getPurchaseExist)(id);
        if ((existIdPurchase === null || existIdPurchase === void 0 ? void 0 : existIdPurchase.id) === id) {
            errors.push("id do purchase já existe");
        }
        let valorASerCadastrado = total_price / quantidade;
        if ((existIdProduct === null || existIdProduct === void 0 ? void 0 : existIdProduct.price) !== valorASerCadastrado) {
            errors.push("a quantidade e o total da compra devem estar com o cálculo correto");
        }
        return errors;
    });
}
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, database_1.getPurchaseById)(id);
        if (result) {
            result.productsList = yield (0, database_1.getPurchaseProductListById)(id);
            res.status(200).send(result);
        }
        else {
            res.status(400).send("produto não existe");
        }
    }
    catch (error) {
        let erro = error;
        console.log(error);
        res.status(500).send(erro.message);
    }
}));
//# sourceMappingURL=index.js.map