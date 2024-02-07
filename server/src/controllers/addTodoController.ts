import Todo from '../models/Todo';
import { Request, Response } from 'express';

const addTodoController = async (req: Request, res: Response) => {
    const text = req.body.text.trim();
    const completed = req.body.completed;
    const userId = req.user.id;
    
    if (!text || completed === undefined) {
        return res
            .status(400)
            .json({ message: 'Title, status and userId are required' });
    }

    const todo = new Todo({
        text,
        completed,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    try {
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default addTodoController;
