import { initMongoDB } from "./conexion.js";
import { UserModel } from "./schema.js";

const test = async () =>{
    await initMongoDB();
    const update1 = await UserModel.findByIdAndUpdate (
        '64f4db2829790fe73f7ac652',
        { admin: true},
        { new: true},
    )
    console.log(update1);
}

test()