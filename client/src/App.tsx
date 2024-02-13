import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ITodos from './interfaces/ITodos';
import verify from './utils/verify';
import preferredTheme from './utils/preferredTheme';
import getTodos from './utils/getTodos';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
    const [theme, setTheme] = React.useState(() => {
        const theme = preferredTheme();
        return theme;
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );
    const [todos, setTodos] = useState<ITodos[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const verifyToken = async () => {
            try {
                await verify(token);
                setIsAuthenticated(true);
                const todos = await getTodos();
                setTodos(todos);
            } catch (error) {
                console.error('Error verifying token', error);
                localStorage.removeItem('token');
                axios.defaults.headers.common['Authorization'] = '';
                setIsAuthenticated(false);
            }
        };
        verifyToken();
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <div id="app">
            <Router>
                <Header
                    setTheme={setTheme}
                    theme={theme}
                    isAuthenticated={isAuthenticated}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Landing isAuthenticated={isAuthenticated} />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                todos={todos}
                                setTodos={setTodos}
                                isAuthenticated={isAuthenticated}
                            />
                        }
                    />
                    {!isAuthenticated && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
