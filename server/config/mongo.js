import mongoose from 'mongoose'

mongoose
  .connect('mongodb+srv://minhnn:minhnn123@cluster0.oqpblan.mongodb.net/?retryWrites=true&w=majority')
  .catch((error) => {
    process.exit(1)
  })
const mongooseConnection = mongoose.connection

export default mongooseConnection
