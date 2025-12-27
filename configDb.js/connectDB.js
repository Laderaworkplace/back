import mongoose from 'mongoose';

const connectingDB = async()=>{

    mongoose.connection.on("connected",()=>{
        console.log("DataBase Connected")
    });
    try {
        await mongoose.connect(`${process.env.MONGO_DB}`)
    } catch (error) {
        console.log("Database connection failed",error)   
    }
}
export default connectingDB;