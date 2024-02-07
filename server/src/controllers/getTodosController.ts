import { Request, Response } from 'express';
import Todo from '../models/Todo';

const getTodosController = async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const todos = await Todo.find({ userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default getTodosController;
