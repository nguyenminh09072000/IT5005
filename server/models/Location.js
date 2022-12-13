import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Location = new mongoose.Schema(
  {
    locationName: { type: String, required: true, unique: true },
    locationBusyTime: { type: Array },
  },
  { timestamps: true }
)

export default db.model('Location', Location, 'Location')
