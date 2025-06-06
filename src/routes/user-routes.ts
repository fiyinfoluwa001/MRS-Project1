import express from 'express'
const router = express.Router()
import { authentication } from '../middleware/authentication'
import { handleRegisterUser, handleGetUser, handleLoginUser } from '../controllers/user-controller'

router.post('/register',  handleRegisterUser)
router.post('/login',authentication, handleLoginUser)
router.get('/get-user/:id', authentication, handleGetUser)

export default router;