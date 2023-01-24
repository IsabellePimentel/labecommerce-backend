import { users, products, purchases } from "./database";
import { createUser,createProduct,getAllProducts, getProductById } from "./database";
import { TProduct, TPurchase, TUser } from "./types";
import express, { Request, Response } from "express";


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando localhost 3003")
})


app.get('/ping' ,(req: Request, res: Response)=>{

    res.send('Pong!')
    })

    
    app.get('/users', (req: Request, res: Response)=>{
        res.status(200).send(users)

    })


    app.post('/users', (req: Request, res: Response) =>{
        const {id, email, password}= req.body as TUser

        const newuser ={
            id,
            email,
            password
        }

        users.push(newuser)
        res.status(201).send("Cliente cadastrado com sucesso!")
    })


    

    app.get('/products', (req: Request, res:Response) =>{
        res.status(200).send(products)
    })



      app.post('/products', (req: Request, res: Response) =>{
        const {id, name, price, category}= req.body as TProduct

        const newProduct ={
            id,
            name,
            price,
            category
        }

        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso!")
    })


    

    app.get('/products/search', (req: Request, res:Response) =>{
        const q = req.query.q as string

        const result = products.filter((product)=>{
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        res.status(200).send(result)
    })


    app.post('/purchases', (req: Request, res: Response) =>{
        const {userId,productId,quantity,totalPrice}= req.body as TPurchase

        const newpurchases ={
            userId,
            productId,
            quantity,
            totalPrice
        }

        purchases.push(newpurchases)
        res.status(201).send("Compra cadastrada com sucesso!")
    })