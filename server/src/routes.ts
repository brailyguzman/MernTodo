import express, { Router, Request, Response } from 'express';
import users from './routes/users';
import todos from './routes/todos';
import verify from './routes/verify';

const router: Router = express.Router();

router.use('/users', users);
router.use('/todos', todos);
router.use('/verify', verify);

export default router;
