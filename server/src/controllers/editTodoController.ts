import { Request, Response } from 'express';
import Todo from '../models/Todo';

const editTodoController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { id, text, completed } = req.body;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    try {
        todo.text = text;
        todo.completed = completed;
        todo.updatedAt = new Date();

        await todo.save();
        return res.status(200).json(todo);
    } catch {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default editTodoController;
