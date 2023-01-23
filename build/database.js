"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.user = void 0;
exports.user = [{
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
        category: "doce"
    }, {
        id: "02",
        name: "Doce de Leite",
        price: 40.23,
        category: "doce"
    }
];
exports.purchases = [{
        userId: "01",
        productId: "01",
        quantity: 2,
        totalPrice: 30.22,
    }, {
        userId: "02",
        productId: "01",
        quantity: 1,
        totalPrice: 40.44,
    }
];
//# sourceMappingURL=database.js.map