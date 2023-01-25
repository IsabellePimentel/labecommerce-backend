"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteProductById = exports.deleteUserById = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [{
        id: "01",
        email: "Bananinha@teste.com",
        password: "54321",
    },
    {
        id: "02",
        email: "pedro@teste.com",
        password: "123456",
    }];
exports.products = [{
        id: "01",
        name: "chocolate",
        price: 30.22,
        category: types_1.Category.FOOD,
    }, {
        id: "02",
        name: "Doce de Leite",
        price: 40.23,
        category: types_1.Category.FOOD,
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
const createUser = (idUser, emailUser, passwordUser) => {
    let newUser = {
        id: idUser,
        email: emailUser,
        password: passwordUser
    };
    exports.users.push(newUser);
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    const produto = exports.products.find((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    });
    return produto;
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    const produtos = exports.products.filter((product) => {
        return (product.name.toLowerCase().includes(q.toLowerCase()));
    });
    return produtos;
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
    console.table(exports.purchases);
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()));
    });
};
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
const getUserById = (id) => {
    const user = exports.users.find((user) => {
        if (user.id === id) {
            return user;
        }
    });
    return user;
};
exports.getUserById = getUserById;
//# sourceMappingURL=database.js.map