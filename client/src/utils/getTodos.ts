import axios from 'axios';
import AxiosRequestError from '../interfaces/AxiosRequestError';
import checkToken from './checkToken';

const getTodos = async () => {
    if (!checkToken()) return;
    try {
        const response = await axios.get('/todos');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosRequestError;
            console.error(
                `Error fetching todos: ${axiosError.response.status} ${axiosError.response.data.error}`
            );
        }
        console.error('Error fetching todos', error);
        return [];
    }
};

export default getTodos;
