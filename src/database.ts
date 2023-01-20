import { TUser, TProduct, TPurchase } from "./types";

export const user: TUser[] = [{
    id: "01",
    email: "Bananinha@teste.com",
    password: "54321",
},
{
    id: "02",
    email: "pedro@teste.com",
    password: "123456",  
}]

export const products:TProduct[]=[{
    id: "01",
    name: "chocolate",
    price: 30.22,
    category: "doce"
},{
    id: "02",
    name: "Doce de Leite",
    price: 40.23,
    category: "doce"
}
]

export const purchases:TPurchase[]=[{
    userId: "01",
    productId: "01",
    quantity: 2,
    totalPrice: 30.22,
},{
    userId: "02",
    productId: "01",
    quantity: 1,
    totalPrice: 40.44,
}

]