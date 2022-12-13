import express from 'express'
import { createTeacher, deleteTeacher, getTeacher, getTeacherClassList, updateTeacher } from '@root/controllers/teacher'

const teacherRouter = express.Router()

teacherRouter.get('/get', getTeacher)
teacherRouter.post('/update', updateTeacher)
teacherRouter.post('/create', createTeacher)
teacherRouter.post('/delete', deleteTeacher)
teacherRouter.post('/get-class-list', getTeacherClassList)

export default teacherRouter
