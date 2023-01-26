export type TUser = {
    id: string;
    email: string;
    password:string;
}

export type TProduct= {
    id: string;
    name: string;
    price: number;
    category: Category;
}
export type TPurchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
}

export enum Category {
    FOOD = "Comida",
    SHOES= "Roupas",
    ACESSORIES = "Acessórios"
}