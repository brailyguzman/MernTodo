import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const registerController = async (req: Request, res: Response) => {
    const email = req.body.email.trim();
    const name = req.body.name.trim();
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();

    if (email && !email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password && !password.match(/.{6,}/)) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 6 characters' });
    }

    if (!email || !name || !password) {
        return res
            .status(400)
            .json({ error: 'Email, username, and password are required' });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ email, name, passwordHash });
        await user.save();

        return res.status(201).json({ message: 'User created' });
    } catch {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default registerController;
