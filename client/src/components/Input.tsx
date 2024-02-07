import axios from 'axios';
import { useState } from 'react';
import ITodos from '../interfaces/ITodos';
import AxiosRequestError from '../interfaces/AxiosRequestError';

interface InputProps {
    todos: ITodos[];
    setTodos: React.Dispatch<React.SetStateAction<ITodos[]>>;
}

interface Todo {
    text: string;
    completed: boolean;
}

const Input = ({ todos, setTodos }: InputProps) => {
    const [todo, setTodo] = useState<Todo>({
        text: '',
        completed: false,
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/todos/add', {
                text: todo.text,
                completed: todo.completed,
            });
            setTodos([...todos, response.data]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosRequestError;
                console.error(
                    'Error adding todo',
                    axiosError.response.data.error
                );
            }
        }
    };
    return (
        <form className="todo-input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                id="todo-text"
                name="todo-text"
                className="todo-text"
                placeholder="Enter a todo"
                value={todo.text}
                onChange={(e) => setTodo({ ...todo, text: e.target.value })}
                maxLength={25}
                required
            />
        </form>
    );
};

export default Input;
