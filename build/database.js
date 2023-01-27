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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchaseById = exports.getUserByEmail = exports.getUserById = exports.deleteProductById = exports.deleteUserById = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const knex_1 = require("./database/knex");
const types_1 = require("./types");
exports.users = [{
        id: "01",
        name: "bananinha",
        email: "Bananinha@teste.com",
        password: "54321",
    },
    {
        id: "02",
        name: "pedro",
        email: "pedro@teste.com",
        password: "123456",
    }];
exports.products = [{
        id: "01",
        name: "chocolate",
        description: "teste",
        price: 30.22,
        category: types_1.Category.FOOD,
        image_url: "teste"
    }, {
        id: "02",
        name: "Doce de Leite",
        description: "teste",
        price: 40.23,
        category: types_1.Category.FOOD,
        image_url: "teste"
    }];
exports.purchases = [{
        userId: "01",
        productId: "01",
        quantity: 2,
        totalPrice: 60.44,
    }, {
        userId: "02",
        productId: "01",
        quantity: 1,
        totalPrice: 30.22,
    }];
const createUser = (idUser, name, emailUser, passwordUser) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.raw(`
            INSERT INTO users(id, name, email, password)
            VALUES("${idUser}", "${name}", "${emailUser}", "${passwordUser}");
        `);
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield knex_1.db.raw(`SELECT * FROM users;`);
    return users;
});
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, description, price, category, image_url) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.raw(`
    INSERT INTO products(id, name, description, price, category, image_url )
    VALUES("${id}", "${name}", "${description}", "${price}", "${category}", "${image_url}");
`);
});
exports.createProduct = createProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield knex_1.db.raw(`SELECT * FROM products;`);
    return products;
});
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield knex_1.db.raw(`SELECT * FROM products WHERE id = "${idToSearch}";`);
    return products === null || products === void 0 ? void 0 : products[0];
});
exports.getProductById = getProductById;
const queryProductsByName = (q) => __awaiter(void 0, void 0, void 0, function* () {
    const produtos = yield knex_1.db.raw(`
        SELECT * FROM products 
        WHERE UPPER(name) like UPPER("%${q}%");
    `);
    return produtos;
});
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, buyer_id, total_price, paid) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.raw(`
            INSERT INTO purchases (id, buyer_id, total_price, paid)
            VALUES ("${userId}","${buyer_id}","${total_price}","${paid}")
        ;`);
    console.log("Compra realizada com sucesso");
    console.table(exports.purchases);
});
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const purchases = yield knex_1.db.raw(`SELECT * FROM purchases WHERE buyer_id = "${userIdToSearch}";`);
    return purchases;
});
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
const deleteUserById = (id) => {
    const userIndex = exports.users.findIndex((user) => {
        return user.id === id;
    });
    if (userIndex >= 0) {
        exports.users.splice(userIndex, 1);
    }
};
exports.deleteUserById = deleteUserById;
const deleteProductById = (id) => {
    const productIndex = exports.products.findIndex((product) => {
        return product.id === id;
    });
    if (productIndex >= 0) {
        exports.products.splice(productIndex, 1);
    }
};
exports.deleteProductById = deleteProductById;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`SELECT * FROM users WHERE id = "${id}";`);
    return user === null || user === void 0 ? void 0 : user[0];
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`SELECT * FROM users WHERE email = "${email}";`);
    return user === null || user === void 0 ? void 0 : user[0];
});
exports.getUserByEmail = getUserByEmail;
const getPurchaseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`SELECT * FROM purchases WHERE id = "${id}";`);
    return user === null || user === void 0 ? void 0 : user[0];
});
exports.getPurchaseById = getPurchaseById;
//# sourceMappingURL=database.js.map