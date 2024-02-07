import ITodo from '../interfaces/ITodo';
import { Schema, model } from 'mongoose';

const todoSchema = new Schema<ITodo>({
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: Date.now},
    updatedAt: { type: Date, required: true, default: Date.now},
    userId: { type: String, required: true },
});

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
