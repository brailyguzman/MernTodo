import express, { Router, Request, Response } from 'express';
import validateToken from '../middleware/validateToken';
import addTodoController from '../controllers/addTodoController';
import removeTodoController from '../controllers/removeTodoController';
import editTodoController from '../controllers/editTodoController';
import getTodosController from '../controllers/getTodosController';

const todos: Router = express.Router();

todos
    .post('/add', validateToken, addTodoController)
    .put('/edit', validateToken, editTodoController)
    .delete('/remove', validateToken, removeTodoController)
    .get('/', validateToken, getTodosController);

export default todos;
