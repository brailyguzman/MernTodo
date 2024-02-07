import { Document } from 'mongoose';

export default interface ITodo extends Document {
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    _id: string;
}
