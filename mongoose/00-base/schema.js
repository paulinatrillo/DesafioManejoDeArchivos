import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100},
    last_name: { type: String, required: true, max: 100},
    admin: {type: Boolean, default: false, default: false},
    age: { type: Number, required: true}
});

export const UserModel = mongoose.model('users', userSchema);