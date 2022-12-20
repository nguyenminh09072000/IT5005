import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
const mongooseConnection = mongoose.connection;

export default mongooseConnection;
