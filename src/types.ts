export type TUser = {
    id: string;
    name: string;
    email: string;
    password:string;
}

export type TProduct= {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    image_url: string;
}
export type TPurchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
}

export enum Category {
    FOOD = "Comida",
    SHOES= "Roupa",
    ACESSORIES = "Acessorio"
}