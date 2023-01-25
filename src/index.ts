import { getAllUsers, createPurchase, getAllPurchasesFromUserId,
    deleteUserById, deleteProductById, getUserById } from "./database";
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
    const users = getAllUsers()

    res.status(200).send(users)
})


app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser

    createUser(
        id, 
        email, 
        password
    )

    res.status(201).send("Cliente cadastrado com sucesso!")
})




app.get('/products', (req: Request, res: Response) => {
    const produtos = getAllProducts()

    res.status(200).send(produtos)
})



app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct

    createProduct(
        id,
        name,
        price,
        category
    )

    res.status(201).send("Produto cadastrado com sucesso!")
})




app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = queryProductsByName(q)
    
    res.status(200).send(result)
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const result = getProductById(id)

    res.status(200).send(result)
})

app.post("/purchases", (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    createPurchase(
        userId, 
        productId, 
        quantity, 
        totalPrice
    )
    
    res.status(201).send("Compra realizada com sucesso!")
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id

    const result = getAllPurchasesFromUserId(id)
        
    res.status(200).send(result)
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    deleteUserById(id)

    res.status(200).send("User apagado com sucesso!")
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    deleteProductById(id)

    res.status(200).send("Produto apagado com sucesso!")
})

app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const userToEdit = getUserById(id) 

    if (userToEdit) {
        userToEdit.email = newEmail || userToEdit.email
        userToEdit.password = newPassword || userToEdit.password
        res.status(200).send("Cadastro atualizado com sucesso!")
    } else {
        res.status(404).send("Usuário não encontrado!")
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
        res.status(404).send("Produto não encontrado!")
    }
})