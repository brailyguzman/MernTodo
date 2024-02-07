import axios from 'axios';

const verify = async (token: string): Promise<boolean> => {
    const response = await axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return true;
    }

    return false;
};

export default verify;
