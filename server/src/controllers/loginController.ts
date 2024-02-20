import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET: string | undefined = process.env.JWT_SECRET;

if (!SECRET) {
    console.error('No JWT secret set');
    process.exit(1);
}

const loginController = async (req: Request, res: Response) => {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const remember = req.body.remember;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (password && !password.match(/.{6,}/)) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    try {
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, SECRET, {
            expiresIn: remember ? '7d' : '1d',
        });

        return res
            .status(200)
            .json({ message: 'Successfully Logged In', token });
    } catch {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default loginController;
