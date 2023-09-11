import mongoose from "mongoose";

const connectionString = 'mongodb://127.0.0.1:27017/coderhouse'


export const initMongoDB = async () => {
try {
    await mongoose.connect(connectionString)
    console.log ('Conectado a mongoDB')
}catch (error) {
    console.error(error);
}  
} 