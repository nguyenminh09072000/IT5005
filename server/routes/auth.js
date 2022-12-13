import express from 'express'
import { getAuth, Register, Login, Delete } from '@root/controllers/auth'
const router = express.Router()

router.get('/', getAuth)

router.post('/register', Register)
router.post('/login', Login)

router.delete('/delete/:email', Delete)

export default router
