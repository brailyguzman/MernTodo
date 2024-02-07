import { Document } from 'mongoose';

export default interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
