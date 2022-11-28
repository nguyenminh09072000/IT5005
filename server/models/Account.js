import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Account = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
)

export default db.model('Account', Account, 'Account')
