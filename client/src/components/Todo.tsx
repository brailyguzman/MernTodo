import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import ITodos from '../interfaces/ITodos';
import axios from 'axios';
import AxiosRequestError from '../interfaces/AxiosRequestError';

interface TodoProps {
    id: string;
    text: string;
    completed: boolean;
    setTodos: React.Dispatch<React.SetStateAction<ITodos[]>>;
}

const Todo = ({ id, text, completed, setTodos }: TodoProps) => {
    const handleCompleted = async () => {
        completed = !completed;
        try {
            const response = await axios.put('/todos/edit', {
                text,
                completed: completed,
                id: id,
            });
            if (response.status === 200) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => {
                        if (todo._id === id) {
                            return { ...todo, completed };
                        }
                        return todo;
                    })
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosRequestError;
                console.error(
                    'Error updating todo',
                    axiosError.response.data.error
                );
            }
        }
    };

    const handleRemove = async (id: string) => {
        try {
            const response = await axios.delete('/todos/remove', {
                data: { id },
            });
            if (response.status === 200) {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo._id !== id)
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosRequestError;
                console.error(
                    'Error deleting todo',
                    axiosError.response.data.error
                );
            }
        }
    };

    return (
        <li className="todo">
            <input
                type="text"
                value={text}
                className={`todo-text ${completed ? 'completed' : ''}`}
                readOnly
            />
            <button
                className="completed-btn"
                onClick={() => {
                    handleCompleted();
                }}
            >
                <FaCheck />
            </button>
            <button className="delete-btn" onClick={() => handleRemove(id)}>
                <FaX />
            </button>
        </li>
    );
};

export default Todo;
