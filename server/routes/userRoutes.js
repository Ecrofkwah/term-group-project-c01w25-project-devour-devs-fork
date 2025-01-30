import express from 'express'
import { signUserUp, logUserIn} from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signUserUp)
router.post('/login', logUserIn)

export { router as userRouter }