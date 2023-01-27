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
exports.getPurchaseProductListById = exports.getPurchaseById = exports.getPurchaseExist = exports.getUserByEmail = exports.getUserById = exports.deleteProductById = exports.deleteUserById = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
const knex_1 = require("./database/knex");
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
const createPurchase = (id, buyer_id, total_price, paid, product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex_1.db.raw(`
            INSERT INTO purchases (id, buyer_id, total_price, paid)
            VALUES ("${id}","${buyer_id}","${total_price}","${paid}")
        ;`);
    yield knex_1.db.raw(`
            INSERT INTO purchases_products (purchase_id, product_id, quantity)
            VALUES ("${id}","${product_id}","${quantity}")
        ;`);
    console.log("Compra realizada com sucesso");
});
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const purchases = yield knex_1.db.raw(`SELECT * FROM purchases WHERE buyer_id = "${userIdToSearch}";`);
    return purchases;
});
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`DELETE FROM users WHERE id = "${id}";`);
});
exports.deleteUserById = deleteUserById;
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`DELETE FROM products WHERE id = "${id}";`);
});
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
const getPurchaseExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`SELECT p.id FROM purchases p WHERE p.id = "${id}";`);
    return user === null || user === void 0 ? void 0 : user[0];
});
exports.getPurchaseExist = getPurchaseExist;
const getPurchaseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield knex_1.db.raw(`SELECT p.id as purchaseId, 
    p.buyer_id as buyerId, 
    p.total_price as totalPrice, 
    p.paid as idPaid, 
    p.created_at as createdAt, 
    u.name as name, 
    u.email as email FROM purchases p 
    INNER JOIN users u ON p.buyer_id = u.id 
    WHERE p.id = "${id}";`);
    return user === null || user === void 0 ? void 0 : user[0];
});
exports.getPurchaseById = getPurchaseById;
const getPurchaseProductListById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield knex_1.db.raw(`SELECT id, name, price, description, image_url as imageUrl, quantity from  products  pr
    INNER JOIN purchases_products pp on pp.product_id = pr.id
    WHERE pp.purchase_id = "${id}";`);
    return list;
});
exports.getPurchaseProductListById = getPurchaseProductListById;
//# sourceMappingURL=database.js.map