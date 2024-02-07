import { Router, Request, Response } from 'express';
import validateToken from '../middleware/validateToken';

const verify: Router = Router();

verify.get('/', validateToken, (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Token is valid' });
});

export default verify;