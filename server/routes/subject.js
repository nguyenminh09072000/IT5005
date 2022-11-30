import express from 'express'
import { createSubject, deleteSubject, getSubject, updateSubject } from '@root/controllers/subject'

const subjectRouter = express.Router()

subjectRouter.get('/get', getSubject)
subjectRouter.post('/update', updateSubject)
subjectRouter.post('/create', createSubject)
subjectRouter.post('/delete', deleteSubject)

export default subjectRouter
