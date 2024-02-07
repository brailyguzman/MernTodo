import Todo from '../models/Todo';
import { Request, Response } from 'express';

const removeTodoController = async (req: Request, res: Response) => {
    const { id } = req.body;
    const userId = req.user.id;

    try {
        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await Todo.deleteOne({ _id: id, userId });

        res.json({ message: 'Todo removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default removeTodoController;
