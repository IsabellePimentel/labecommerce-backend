import { TUser, TProduct, TPurchase,Category } from "./types";

export const users: TUser[] = [{
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
    category: Category.FOOD,
},{
    id: "02",
    name: "Doce de Leite",
    price: 40.23,
    category: Category.FOOD,
}
]

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
}

]


export const  createUser = (idUser: string, emailUser: string, passwordUser:string) =>{

    let newUser = {
        id:idUser,
        email: emailUser,
        password: passwordUser
    }
    users.push(newUser)
    return console.log("Cadastro realizado com sucesso")
}

export const createProduct= (id:string, name: string, price: number, category: Category): string =>{
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    return("Produto criado com sucesso")
}


export const getAllProducts = (): TProduct[ ]=> {
    return products
}

export const getProductById = (idToSearch: string) : TProduct[] | undefined =>{
    return  products.filter((product)=>{
        if(product.id === idToSearch){
            return product
        }
    })
    
}

export const queryProductsByName = (q:string) :void => {
    const query =  products.filter(
        (product) => {
          return(product.name.toLowerCase().includes(q.toLowerCase()))
        }
      ) 

      console.table(query)
}

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) :void => {
    const newPurchase:TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    console.log("Compra realizada com sucesso")
    console.table(purchases)
}

export const getAllPurchasesFromUserId = (userIdToSearch:string) :TPurchase[]=> {
    return purchases.filter(
        (purchase) => {
          return(purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
      ) 
}
