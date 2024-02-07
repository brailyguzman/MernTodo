import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginRegister.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginMessage from '../interfaces/LoginMessage';
import axios from 'axios';
import '../styles/LoginRegister.css';
import AxiosRequestError from '../interfaces/AxiosRequestError';

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<LoginMessage | null>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        message && setMessage(null);

        if (password !== confirmPassword) {
            setMessage({
                type: 'error',
                message: 'Passwords do not match',
            });
            return;
        }

        try {
            const response = await axios.post('/users/register', {
                name,
                email,
                password,
                confirmPassword
            });

            if (response.status === 201) {
                setMessage({
                    type: 'success',
                    message: 'Account created successfully',
                });

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosRequestError;
                setMessage({
                    type: 'error',
                    message: axiosError.response.data.error,
                });
            }
        }
    };

    return (
        <form className="login-register" onSubmit={handleRegister}>
            <h1 className="login-register-title">Create an account</h1>

            <input
                type="text"
                name="name"
                id="name"
                className="login-register-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={30}
                required
                pattern='[a-zA-Z]+[a-zA-Z ]+'
            />

            <input
                type="email"
                name="email"
                id="email"
                className="login-register-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            />

            <div className="login-register-password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="login-register-input login login-register-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    pattern='.{6,}'
                />
                <div
                    className="login-register-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <div className="icon-wrapper">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            <div className="login-register-password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirm-password"
                    name="password"
                    className="login-register-input login login-register-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    required
                    pattern='.{6,}'
                />
                <div
                    className="login-register-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <div className="icon-wrapper">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            <button type="submit" className="login-register-submit">
                REGISTER
            </button>

            <p className="login-register-link-container">
                Already a user?{' '}
                <Link to={'/login'} className="login-register-link">
                    Login
                </Link>
            </p>

            {message && (
                <p
                    className={`login-register-message ${
                        message.type === 'error' ? 'error' : 'success'
                    }`}
                >
                    {message.type.charAt(0).toUpperCase() +
                        message.type.slice(1)}
                    : {message.message}
                </p>
            )}
        </form>
    );
};

export default Register;
