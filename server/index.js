console.log(process.env)
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { mealRouter } from './routes/mealRoutes.js'
import { plannerRouter } from './routes/plannerRoutes.js'
import { imageRouter } from './routes/imageRoutes.js'
import { intakeRouter } from './routes/intakeRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { aiAssistantRouter } from './routes/aiAssistantRoutes.js'
import { voiceRouter } from './routes/voiceRoutes.js'

// load env variables
console.log(process.env.MONGODB_URI)
if (process.env.NODE_ENV === 'test-cy') {
    dotenv.config({ path: './.env.test', override: true })
    console.log('test-cy env loaded')
    console.log(process.env.MONGODB_URI)
}
else {
    dotenv.config()
}

const app = express()
app.use(express.json())
app.use(cookieParser())

// cors setup
const corsConfig = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:8000'],
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
app.use('/api/planner', plannerRouter)
if (process.env.NODE_ENV !== 'test') {
    app.use('/api/image', imageRouter)
}
app.use('/api/intake', intakeRouter)
app.use('/api/voice', voiceRouter)

// set up static files path
if (process.env.NODE_ENV !== 'test') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
}
// app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/api/ai', aiAssistantRouter)

console.log('process.env.NODE_ENV:');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test-cy') {
    console.log('connected to test server')
}
if (process.env.NODE_ENV !== 'test') {
    // connect to mongoDB
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => { console.log("Connected") })
        .catch((error) => console.log(`Error connecting to DB: ${error}`))

    // listen to port
    app.listen(process.env.PORT, () => {
        console.log("server listening ...")
    })
}

export default app;


