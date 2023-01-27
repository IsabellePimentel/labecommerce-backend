import { db } from "./database/knex";
import { TUser, TProduct, TPurchase,Category } from "./types";

export const users: TUser[] = [{
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
}]

export const products:TProduct[]=[{
    id: "01",
    name: "chocolate",
    description: "teste",
    price: 30.22,
    category: Category.FOOD,
    image_url: "teste"
},{
    id: "02",
    name: "Doce de Leite",
    description: "teste",
    price: 40.23,
    category: Category.FOOD,
    image_url: "teste"
}]

export const purchases:TPurchase[]=[{
    userId: "01",
    productId: "01",
    quantity: 2,
    totalPrice: 60.44,
},{
    userId: "02",
    productId: "01",
    quantity: 1,
    totalPrice: 30.22,
}]


export const  createUser = async (idUser: string, name:string, emailUser: string, passwordUser:string) =>{
    await db.raw(`
            INSERT INTO users(id, name, email, password)
            VALUES("${idUser}", "${name}", "${emailUser}", "${passwordUser}");
        `)
}

export const getAllUsers = async (): Promise<TUser[]>=> {

    const users = await db.raw(`SELECT * FROM users;`)

    return users
}

export const createProduct= async (id:string, name: string, description: string, price: number, category: Category, image_url: string) =>{
    await db.raw(`
    INSERT INTO products(id, name, description, price, category, image_url )
    VALUES("${id}", "${name}", "${description}", "${price}", "${category}", "${image_url}");
`)
}

export const getAllProducts = async (): Promise<TProduct[]>=> {
    const products = await db.raw(`SELECT * FROM products;`)
    return products
}

export const getProductById = async (idToSearch: string) : Promise<TProduct> =>{

    const products = await db.raw(`SELECT * FROM products WHERE id = "${idToSearch}";`)
    return products?.[0]

}


export const queryProductsByName = async (q:string) : Promise<TProduct[]> => {

    const produtos = await db.raw(`
        SELECT * FROM products 
        WHERE UPPER(name) like UPPER("%${q}%");
    `)
    
    return produtos
}

export const createPurchase = async (userId: string, buyer_id: string, total_price: number, paid: number) :Promise<void> => {
   
    await db.raw(`
            INSERT INTO purchases (id, buyer_id, total_price, paid)
            VALUES ("${userId}","${buyer_id}","${total_price}","${paid}")
        ;`)
    

    console.log("Compra realizada com sucesso")
    console.table(purchases)
}

export const getAllPurchasesFromUserId = async (userIdToSearch:string) :Promise<TPurchase[]>=> {
    
    const purchases = await db.raw(`SELECT * FROM purchases WHERE buyer_id = "${userIdToSearch}";`)
    return purchases

}

export const deleteUserById = (id: string) : void => {
    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    
    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }

}

export const deleteProductById = (id: string) : void => {
    const productIndex = products.findIndex((product) => {
        return product.id === id
    })
    
    if (productIndex >= 0) {
        products.splice(productIndex, 1)    
    }
    
}

export const getUserById = async (id: string) : Promise< TUser > =>{

    const user = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)

    return user?.[0];
}

export const getUserByEmail = async (email: string) : Promise<TUser> =>{
    const user = await db.raw(`SELECT * FROM users WHERE email = "${email}";`)
    
    return user?.[0];
}

export const getPurchaseById = async (id: string) : Promise< TUser > =>{

    const user = await db.raw(`SELECT * FROM purchases WHERE id = "${id}";`)

    return user?.[0];
}