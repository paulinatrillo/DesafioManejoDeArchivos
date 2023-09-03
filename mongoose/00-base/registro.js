import { initMongoDB } from "./conexion.js";
import { UserModel } from "./schema.js";

const user = {
    first_name: 'Paulina',
    last_name: 'Trillo',
    age: 36
}

const createUser = async (obj) =>{
    await UserModel.create(obj);
}

const test = async () => {
    await initMongoDB();
    await createUser(user);
    console.log('Usuario creado');
}


test();