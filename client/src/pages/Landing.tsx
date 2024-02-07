import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/Landing.css';

interface LandingProps {
    isAuthenticated: boolean | null;
}

const Landing = ({ isAuthenticated }: LandingProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        isAuthenticated === false && (
            <div id="landing">
                <h1>MernTodo</h1>
                <p>A Full-stack To-do List made using the Mern Stack</p>

                <div className="cta-container">
                    <NavLink to="/login" className="cta">
                        Login
                    </NavLink>

                    <NavLink to="/register" className="cta">
                        Register
                    </NavLink>
                </div>
            </div>
        )
    );
};

export default Landing;
