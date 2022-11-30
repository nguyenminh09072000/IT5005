import mongoose from 'mongoose'

mongoose.connect('mongodb://172.17.0.1:27108/IT5005').catch((error) => {
  console.log(error)
  process.exit(1)
})
const mongooseConnection = mongoose.connection

export default mongooseConnection
