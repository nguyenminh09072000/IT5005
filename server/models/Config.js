import mongoose from 'mongoose'
import db from '@root/config/mongo'

const Config = new mongoose.Schema({
  startRegisterTime: { type: Number, required: true },
  endRegisterTime: { type: Number, required: true },
})

export default db.model('Config', Config, 'Config')
