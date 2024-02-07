import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
            <div id="not-found">
                <h1 id="not-found-title">404 Page Not Found</h1>
                <p id="not-found-text">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link id="not-found-link" to={'/'}>
                    Go to home page
                </Link>
            </div>
    );
};

export default NotFound;
