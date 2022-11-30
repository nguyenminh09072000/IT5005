import express from 'express'
import { createStudent, deleteStudent, getStudent, getStudentClassList, updateStudent } from '@root/controllers/student'

const studentRouter = express.Router()

studentRouter.get('/get', getStudent)
studentRouter.post('/update', updateStudent)
studentRouter.post('/create', createStudent)
studentRouter.put('/delete', deleteStudent)
studentRouter.delete('/get-class-list', getStudentClassList)

export default studentRouter
