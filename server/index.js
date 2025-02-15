import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { recipeRouter } from './routes/recipeRoutes.js'

// load env variables
dotenv.config()

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log("Connected")})
    .catch((error) => console.log(`Error connecting to DB: ${error}`))

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// uncaught errors
app.use((err, req, res, next) => {
    console.log(`Uncaught error: ${err}`);
    res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later."
    })
})

// map the routes
app.use('/api/auth', userRouter)

app.use('/api/recipes', recipeRouter)

app.listen(process.env.PORT, () => {
    console.log("server listening ...")
})

