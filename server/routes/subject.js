import express from 'express'
import { createSubject, deleteSubject, getSubject, updateSubject } from '@root/controllers/subject'
import { verifyAccessToken } from '@root/middleware/auth'

const subjectRouter = express.Router()
subjectRouter.use(verifyAccessToken)

subjectRouter.get('/get', getSubject)
subjectRouter.post('/update', updateSubject)
subjectRouter.post('/create', createSubject)
subjectRouter.post('/delete', deleteSubject)

export default subjectRouter
