import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const SECRET: string | undefined = process.env.JWT_SECRET;

if (!SECRET) {
    console.error('No JWT secret set');
    process.exit(1);
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET, async (err: Error | null, decoded: any) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Failed to authenticate token' });
        }
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = decoded;
        next();
    });
};

export default validateToken;
