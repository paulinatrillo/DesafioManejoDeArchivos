import mongoose from "mongoose";

const connectionString = 'mongodb://localhost:27017/coderhouse';

export const initMingoDB = async () => {
try {
    await mongoose.connect(connectionString)
    console.log ('Conectado a mongoDB')
}catch (error) {
    console.error(error);
}  
} 