import express, { Router, Request, Response } from 'express';
import loginController from '../controllers/loginController';
import registerController from '../controllers/registerController';

const users: Router = express.Router();

users.post('/login', loginController);
users.post('/register', registerController);

export default users;
