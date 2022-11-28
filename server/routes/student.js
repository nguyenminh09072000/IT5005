import express from 'express'
import {} from '@root/controllers/student'

const studentRouter = express.Router()

studentRouter.get('/info')
studentRouter.get('/líst')
studentRouter.post('/')
studentRouter.put('/')
studentRouter.delete('/')

export default studentRouter
