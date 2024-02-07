import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginMessage from '../interfaces/LoginMessage';
import axios from 'axios';
import '../styles/LoginRegister.css';
import AxiosRequestError from '../interfaces/AxiosRequestError';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<LoginMessage | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        message && setMessage(null);

        try {
            const response = await axios.post('/users/login', {
                email,
                password,
                remember,
            });

            setMessage({
                type: 'success',
                message: 'Logged in successfully. Redirecting to dashboard...',
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
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
        <form className="login-register" onSubmit={handleSubmit}>
            <h1 className="login-register-title">Sign In</h1>

            <input
                type="email"
                id="email"
                name="email"
                className="login-register-input"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            />
            <div className="login-register-password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="login-register-input login login-register-password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <div id="login-options">
                <div className="login-remember-container">
                    <label htmlFor="login-register-remember">
                        <input
                            type="checkbox"
                            checked={remember}
                            id="login-register-remember"
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        &zwnj; Remember me
                    </label>
                </div>
            </div>

            <button type="submit" className="login-register-submit">
                Log in
            </button>

            <p className="login-register-link-container">
                Don&apos;t have an account?{' '}
                <Link to={'/register'} className="login-register-link">
                    Register
                </Link>
            </p>

            {message && (
                <p
                    className={`login-register-message ${
                        message.type === 'error' ? 'error' : 'success'
                    }`}
                >
                    {message.message}
                </p>
            )}
        </form>
    );
};

export default Login;
