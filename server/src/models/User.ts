import IUser from '../interfaces/IUser';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const User = model<IUser>('User', userSchema);

export default User;
