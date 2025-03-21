import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { mealRouter } from './routes/mealRoutes.js'
import { imageRouter } from './routes/imageRoutes.js'
import {intakeRouter} from './routes/intakeRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

// load env variables
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

// cors setup
const corsConfig = {
    origin: 'http://localhost:5173', // frontend url
    credentials: true,
}
app.use(cors(corsConfig))

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
app.use('/api/meals', mealRouter)
app.use('/api/image', imageRouter)
app.use('/api/intake', intakeRouter)

// set up static files path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use('/assets', express.static(path.join(__dirname, 'assets')))

if(process.env.NODE_ENV !== 'test'){
    // connect to mongoDB
    mongoose.connect(process.env.MONGODB_URI)
     .then(() => {console.log("Connected")})
     .catch((error) => console.log(`Error connecting to DB: ${error}`))

    // listen to port
    app.listen(process.env.PORT, () => {
        console.log("server listening ...")
    })
}

export default app;


