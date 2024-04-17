const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL,)
        console.log('Database connected');
    }catch(err){
        console.log('DB Connection Error');
    }
}

module.exports = { connectDB };