import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Teacher = new mongoose.Schema(
  {
    teacherId: { type: String, required: true, unique: true },
    teacherName: { type: String, required: true },
    accountId: { type: String, required: true, unique: true },
    teacherBusyTime: { type: Array },
  },
  { timestamps: true }
)

export default db.model('Teacher', Teacher, 'Teacher')
