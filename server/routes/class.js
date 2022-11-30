import express from 'express'
import {
  addStudentToClass,
  createClass,
  deleteClass,
  deleteStudentFromClass,
  getClass,
  getStudentOfClass,
  setScore,
  updateClass,
} from '@root/controllers/class'

const classRouter = express.Router()

classRouter.get('/get', getClass)
classRouter.post('/update', updateClass)
classRouter.post('/create', createClass)
classRouter.post('/delete', deleteClass)
classRouter.post('/get-student-list', getStudentOfClass)
classRouter.post('/set-score', setScore)
classRouter.post('/delete-student', deleteStudentFromClass)
classRouter.post('/add-student', addStudentToClass)

export default classRouter
