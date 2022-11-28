import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Teacher = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    teacherName: { type: String, required: true },
    accountId: { type: String, required: true },
    teacherBusyTime: { type: Array },
    teacherClasses: { type: Array },
  },
  { timestamps: true }
)

export default db.model('Teacher', Teacher, 'Teacher')
