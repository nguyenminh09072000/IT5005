import express from 'express'
import {} from '@root/controllers/admin'

const adminRouter = express.Router()

adminRouter.get('/get')

export default adminRouter
