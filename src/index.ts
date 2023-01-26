import {
    getAllUsers, createPurchase, getAllPurchasesFromUserId,
    deleteUserById, deleteProductById, getUserById, getUserByEmail
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


app.get('/users', (req: Request, res: Response) => {

    try {
        let users = getAllUsers()

        res.status(200).send(users)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})


app.post('/users', (req: Request, res: Response) => {

    try {
        const { id, email, password } = req.body as TUser

        let errors = validaUserBody(id, email)
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createUser(
                id,
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




app.get('/products', (req: Request, res: Response) => {
    try {
        let products = getAllProducts()

        res.status(200).send(products)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})



app.post('/products', (req: Request, res: Response) => {

    try {
        const { id, name, price, category } = req.body as TProduct

        let errors = validaProductBody(id)
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createProduct(
                id,
                name,
                price,
                category
            )

            res.status(201).send("Produto cadastrado com sucesso!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})




app.get('/product/search', (req: Request, res: Response) => {

    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400).send("query params deve possuir pelo menos um caractere.")
        }

        let result = queryProductsByName(q)

        res.status(200).send(result)
    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})

app.get("/products/:id", (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const result = getProductById(id)
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send("produto não existe")
        }


    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.post("/purchases", (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase


        let errors = validaPurchaseBody(userId, productId, quantity, totalPrice)
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            createPurchase(
                userId,
                productId,
                quantity,
                totalPrice
            )

            res.status(201).send("Compra realizada com sucesso!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }

})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        let errors = userExists(id)
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors)
        } else {
            const result = getAllPurchasesFromUserId(id)
            res.status(200).send(result)
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    let errors = userExists(id)
    if (errors.length > 0) {
        console.log(errors)
        res.status(400).send(errors)
    } else {
        deleteUserById(id)
        res.status(200).send("User apagado com sucesso!")
    }

})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    let errors = productExists(id)
    if (errors.length > 0) {
        console.log(errors)
        res.status(400).send(errors)
    } else {
        deleteProductById(id)
        res.status(200).send("Produto apagado com sucesso!")
    }

})

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const userToEdit = getUserById(id)

        if (userToEdit) {

            if (typeof newEmail !== 'undefined' && newEmail !== userToEdit.email) {
                let userExists = getUserByEmail(newEmail)
                if(userExists){
                    throw new Error('Não é possível alterar pois já existe um usuário com o mesmo email.')
                }
            }


            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
            res.status(200).send("Cadastro atualizado com sucesso!")
        } else {
            res.status(400).send("Usuário não encontrado!")
        }

    } catch (error) {
        let erro = error as Error
        console.log(error)
        res.status(500).send(erro.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

    const product = getProductById(id)

    if (product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
        res.status(200).send("Produto atualizado com sucesso!")
    } else {
        res.status(400).send("Produto não encontrado!")
    }
})

function validaUserBody(id: string, email: string): string[] {

    let errors: string[] = []

    let existId = getUserById(id)
    if (existId) {
        errors.push("não é possível criar mais de uma conta com a mesma id")
    }

    let existEmail = getUserByEmail(email)
    if (existEmail) {
        errors.push("não é possível criar mais de uma conta com o mesmo email")
    }

    return errors;
}

function validaProductBody(id: string): string[] {

    let errors: string[] = []
    let existId = getProductById(id)
    if (existId) {
        errors.push("não é possível criar mais de um produto com a mesma id")
    }

    return errors
}

function userExists(id: string): string[] {
    let errors: string[] = []
    let existId = getUserById(id)
    if (!existId) {
        errors.push("usuário de id fornecido não existe")
    }

    return errors
}

function productExists(id: string): string[] {
    let errors: string[] = []
    let existId = getProductById(id)
    if (!existId) {
        errors.push("Produto de id fornecido não existe")
    }

    return errors
}

function validaPurchaseBody(idUser: string, idProduct: string, quantidade: number, price: number): string[] {

    let errors: string[] = []

    let existIdUser = getUserById(idUser)
    if (!existIdUser) {
        errors.push("id do usuário que fez a compra deve existir no array de usuários cadastrados")
    }

    let existIdProduct = getProductById(idProduct)
    if (!existIdProduct) {
        errors.push("id do produto que foi comprado deve existir no array de produtos cadastrados")
    }

    // calculo valor produto

    let valorASerCadastrado = price / quantidade
    if (existIdProduct?.price !== valorASerCadastrado) {
        errors.push("a quantidade e o total da compra devem estar com o cálculo correto")
    }
    return errors
}


