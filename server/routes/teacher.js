import express from 'express'
import { createTeacher, deleteTeacher, getTeacher, getTeacherClassList, updateTeacher } from '@root/controllers/teacher'
import { verifyAccessToken } from '@root/middleware/auth'

const teacherRouter = express.Router()
teacherRouter.use(verifyAccessToken)

teacherRouter.post('/get', getTeacher)
teacherRouter.post('/update', updateTeacher)
teacherRouter.post('/create', createTeacher)
teacherRouter.post('/delete', deleteTeacher)
teacherRouter.post('/get-class-list', getTeacherClassList)

export default teacherRouter
