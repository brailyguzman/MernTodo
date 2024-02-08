import axios from 'axios';

const checkToken = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        axios.defaults.headers.common['Authorization'] = '';
        return false;
    }
    return true;
};

export default checkToken;
