import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const registerController = async (req: Request, res: Response) => {
    const email = req.body.email.trim();
    const name = req.body.name.trim();
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !name || !password || !confirmPassword) {
        return res
            .status(400)
            .json({ error: 'Email, username, and password are required' });
    }
    
    if ((name && name.length > 30) || name.length < 3) {
        return res
            .status(400)
            .json({ error: 'Name must be between 3 and 30 characters' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!password.match(/.{6,}/)) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 6 characters' });
    }
    
    try {
        const emailExists = await User.findOne({ email });
    
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ email, name, passwordHash });
        await user.save();

        return res.status(201).json({ message: 'User created' });
    } catch {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default registerController;
