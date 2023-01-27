import { db } from "./database/knex";
import { TUser, TProduct, TPurchase,Category, TPurchaseQuery } from "./types";

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

export const createPurchase = async (id: string, buyer_id: string, total_price: number, paid: number, product_id: string, quantity: number) :Promise<void> => {
   
    await db.raw(`
            INSERT INTO purchases (id, buyer_id, total_price, paid)
            VALUES ("${id}","${buyer_id}","${total_price}","${paid}")
        ;`)
    
        await db.raw(`
            INSERT INTO purchases_products (purchase_id, product_id, quantity)
            VALUES ("${id}","${product_id}","${quantity}")
        ;`)


    console.log("Compra realizada com sucesso")
}

export const getAllPurchasesFromUserId = async (userIdToSearch:string) :Promise<TPurchase[]>=> {
    
    const purchases = await db.raw(`SELECT * FROM purchases WHERE buyer_id = "${userIdToSearch}";`)
    return purchases

}

export const deleteUserById = async (id: string) : Promise<void> => {

    const user = await db.raw(`DELETE FROM users WHERE id = "${id}";`)
   
}

export const deleteProductById = async (id: string) : Promise<void> => {
    const user = await db.raw(`DELETE FROM products WHERE id = "${id}";`)
    
}

export const getUserById = async (id: string) : Promise< TUser > =>{

    const user = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)

    return user?.[0];
}

export const getUserByEmail = async (email: string) : Promise<TUser> =>{
    const user = await db.raw(`SELECT * FROM users WHERE email = "${email}";`)
    
    return user?.[0];
}

export const getPurchaseExist = async (id: string) : Promise< TPurchase > =>{
    const user = await db.raw(`SELECT p.id FROM purchases p WHERE p.id = "${id}";`)

    return user?.[0];
}

export const getPurchaseById = async (id: string) : Promise< TPurchaseQuery > =>{

    const user = await db.raw(`SELECT p.id as purchaseId, 
    p.buyer_id as buyerId, 
    p.total_price as totalPrice, 
    p.paid as idPaid, 
    p.created_at as createdAt, 
    u.name as name, 
    u.email as email FROM purchases p 
    INNER JOIN users u ON p.buyer_id = u.id 
    WHERE p.id = "${id}";`)

    return user?.[0];
}


export const getPurchaseProductListById = async (id: string) : Promise< TProduct[] > =>{

    const list = await db.raw(`SELECT id, name, price, description, image_url as imageUrl, quantity from  products  pr
    INNER JOIN purchases_products pp on pp.product_id = pr.id
    WHERE pp.purchase_id = "${id}";`)

    return list;
}
