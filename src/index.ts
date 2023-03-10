import {
    getAllUsers, createPurchase, getAllPurchasesFromUserId,
    deleteUserById, deleteProductById, getUserById, getUserByEmail, getPurchaseById, getPurchaseExist, getPurchaseProductListById
} from "./database";
import { createUser, createProduct, getAllProducts, queryProductsByName, getProductById } from "./database";
import { TProduct, TPurchase, TUser } from "./types";
import { Category } from "./types";
import express, { Request, Response } from "express";
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando localhost 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


app.get('/users', async (req: Request, res: Response) => {

    try {
        let users = await getAllUsers()

        res.status(200).send(users)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})


app.post('/users', async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body as TUser

        let errors = await validaUserBody(id, email)

        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createUser(
                id,
                name,
                email,
                password
            )

            res.status(201).send("Cliente cadastrado com sucesso!")
        }



    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})




app.get('/products', async (req: Request, res: Response) => {
    try {
        let products = await getAllProducts()

        res.status(200).send(products)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})



app.post('/products', async (req: Request, res: Response) => {

    try {
        const { id, name, description, price, category, image_url } = req.body as TProduct

        let errors = await validaProductBody(id)
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createProduct(
                id,
                name,
                description,
                price,
                category,
                image_url
            )

            res.status(201).send("Produto cadastrado com sucesso!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})




app.get('/product/search', async (req: Request, res: Response) => {

    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400).send("query params deve possuir pelo menos um caractere.")
        }

        let result = await queryProductsByName(q)

        res.status(200).send(result)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})

app.get("/products/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const result = await getProductById(id)
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send("produto n??o existe")
        }


    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, product_id, total_price, paid, quantidade } = req.body = req.body 


        let errors = await validaPurchaseBody(id, buyer_id, product_id, total_price, quantidade)
        if (errors?.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createPurchase(
                id, buyer_id, total_price, paid, product_id, quantidade
            )

            res.status(201).send("Compra realizada com sucesso!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        let errors = await userExists(id)
        if (errors?.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            const result = await getAllPurchasesFromUserId(id)
            res.status(200).send(result)
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    let errors = await userExists(id)
    if (errors.length > 0) {
        console.log(errors)
        res.status(400).send(errors)
    } else {
        await deleteUserById(id)
        res.status(200).send("User apagado com sucesso!")
    }

})

app.delete("/products/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    let errors = productExists(id)
    if (errors.length > 0) {
        console.log(errors)
        res.status(400).send(errors)
    } else {
        await deleteProductById(id)
        res.status(200).send("Produto apagado com sucesso!")
    }

})

app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const userToEdit = await getUserById(id)

        if (userToEdit) {

            if (typeof newEmail !== 'undefined' && newEmail !== userToEdit.email) {
                let userExists = await getUserByEmail(newEmail)
                if(userExists){
                    throw new Error('N??o ?? poss??vel alterar pois j?? existe um usu??rio com o mesmo email.')
                }
            }


            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
            res.status(200).send("Cadastro atualizado com sucesso!")
        } else {
            res.status(400).send("Usu??rio n??o encontrado!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

    const product = await getProductById(id)

    if (product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
        res.status(200).send("Produto atualizado com sucesso!")
    } else {
        res.status(400).send("Produto n??o encontrado!")
    }
})

async function validaUserBody(id: string, email: string): Promise<string[]> {

    let errors: string[] = []

    let existId = await getUserById(id)
    if (existId?.id === id) {
        errors.push("n??o ?? poss??vel criar mais de uma conta com a mesma id")
    }

    let existEmail = await getUserByEmail(email)
    if (existEmail?.email === email) {
        errors.push("n??o ?? poss??vel criar mais de uma conta com o mesmo email")
    }

    return errors;
}

async function validaProductBody(id: string): Promise<string[]> {

    let errors: string[] = []
    let existId = await getProductById(id)
    if (existId?.id === id) {
        errors.push("n??o ?? poss??vel criar mais de um produto com a mesma id")
    }

    return errors
}

async function userExists(id: string): Promise<string[]> {
    let errors: string[] = []
    let existId = await getUserById(id)
    if (!existId) {
        errors.push("usu??rio de id fornecido n??o existe")
    }

    return errors
}

function productExists(id: string): string[] {
    let errors: string[] = []
    let existId = getProductById(id)
    if (!existId) {
        errors.push("Produto de id fornecido n??o existe")
    }

    return errors
}

async function validaPurchaseBody(id: string, idUser: string, idProduct: string, total_price: number, quantidade: number): Promise<string[]> {

    let errors: string[] = []

    let existIdUser = await getUserById(idUser)
    if (!existIdUser) {
        errors.push("id do usu??rio que fez a compra deve existir no array de usu??rios cadastrados")
    }

    let existIdProduct = await getProductById(idProduct)
    if (!existIdProduct) {
        errors.push("Produto n??o existe")
    }

    let existIdPurchase = await getPurchaseExist(id)
    if (existIdPurchase?.id === id) {
        errors.push("id do purchase j?? existe")
    }

    // calculo valor produto

    let valorASerCadastrado = total_price / quantidade
   if (existIdProduct?.price !== valorASerCadastrado) {
        errors.push("a quantidade e o total da compra devem estar com o c??lculo correto")
    }
    return errors
}


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const result = await getPurchaseById(id)
        if (result) {

            result.productsList = await getPurchaseProductListById(id)


            res.status(200).send(result)
        } else {
            res.status(400).send("produto n??o existe")
        }


    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})