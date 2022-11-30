import express from 'express'
import { createTeacher, deleteTeacher, getTeacher, updateTeacher } from '@root/controllers/teacher'

const teacherRouter = express.Router()

teacherRouter.get('/get', getTeacher)
teacherRouter.post('/update', updateTeacher)
teacherRouter.post('/create', createTeacher)
teacherRouter.post('/delete', deleteTeacher)

export default teacherRouter
