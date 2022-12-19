import express from 'express'
import { createStudent, deleteStudent, getStudent, getStudentClassList, updateStudent } from '@root/controllers/student'
import { verifyAccessToken } from '@root/middleware/auth'

const studentRouter = express.Router()
studentRouter.use(verifyAccessToken)

studentRouter.get('/get', getStudent)
studentRouter.post('/update', updateStudent)
studentRouter.post('/create', createStudent)
studentRouter.put('/delete', deleteStudent)
studentRouter.post('/get-class-list', getStudentClassList)

export default studentRouter
