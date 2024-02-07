import Input from '../components/Input';
import ITodos from '../interfaces/ITodos';
import TodoList from '../components/TodoList';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
    todos: ITodos[];
    setTodos: React.Dispatch<React.SetStateAction<ITodos[]>>;
    isAuthenticated: boolean | null;
}

const Dashboard = ({ todos, setTodos, isAuthenticated }: DashboardProps) => {
    const navigate = useNavigate();
    if (isAuthenticated === false) {
        navigate('/');
    }

    return (
        isAuthenticated && (
            <div id="dashboard">
                <Input todos={todos} setTodos={setTodos} />
                <TodoList todos={todos} setTodos={setTodos} />
            </div>
        )
    );
};

export default Dashboard;
