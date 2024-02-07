import { FaMoon, FaSun } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

interface HeaderProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean | null;
}

const Header = ({ theme, setTheme, isAuthenticated }: HeaderProps) => {
    const onThemeChange = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header id="header">
            <h1>
                <NavLink to={'/'}>MernTodo</NavLink>
            </h1>
            <div className="header-buttons-container">
                {isAuthenticated && (
                    <button className="logout-button" onClick={onLogout}>
                        <CiLogout />
                    </button>
                )}
                <button onClick={onThemeChange} className="theme-button">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </header>
    );
};

export default Header;
