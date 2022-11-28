import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Class = new mongoose.Schema(
  {
    classId: { type: String, required: true },
    subjectId: { type: String, required: true },
    teacherId: { type: String },
    students: { type: Array },
    locationName: { type: String, required: true },
    day: { type: String },
    timeStart: { type: Number },
    timeEnd: { type: Number },
  },
  { timestamps: true }
)

export default db.model('Class', Class, 'Class')
