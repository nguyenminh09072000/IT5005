import mongoose from 'mongoose';

mongoose
    .connect(
        'mongodb+srv://minhnn:minhnn123@cluster0.oqpblan.mongodb.net/?retryWrites=true&w=majority' ||
            process.env.MONGO_DB_URL
    )
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
const mongooseConnection = mongoose.connection;

export default mongooseConnection;
