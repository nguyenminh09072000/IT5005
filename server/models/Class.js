import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Class = new mongoose.Schema(
  {
    classId: { type: String, required: true, unique: true },
    subjectId: { type: String, required: true },
    teacherId: { type: String },
    students: { type: Array },
    locationName: { type: String, required: true },
    classBusyTime: { type: Array },
    maxSlot: { type: Number, required: true },
  },
  { timestamps: true }
)

export default db.model('Class', Class, 'Class')
