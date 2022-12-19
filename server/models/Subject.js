import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Subject = new mongoose.Schema(
  {
    subjectId: { type: String, required: true, unique: true },
    subjectName: { type: String, required: true },
    credit: { type: Number },
  },
  { timestamps: true }
)

export default db.model('Subject', Subject, 'Subject')
