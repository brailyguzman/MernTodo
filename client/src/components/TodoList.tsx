import Todos from '../interfaces/ITodos';
import Todo from './Todo';
import '../styles/TodoList.css';

interface TodoListProps {
    todos: Todos[];
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoList = ({ todos, setTodos }: TodoListProps) => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const remainingTodos = todos.filter((todo) => !todo.completed);
    return (
        <div id="todolist">
            <div className="todo-list-info">
                <h1>Todo List</h1>
                <p id="todos-count">
                    {todos.length === 0 && 'No todos yet! - '}
                    Completed: {completedTodos.length} Remaining:{' '}
                    {remainingTodos.length}
                </p>
            </div>
            <ul className="todos-container">
                {todos.length > 0
                    ? todos.map((todo, i) => (
                          <Todo
                              id={todo._id}
                              text={todo.text}
                              completed={todo.completed}
                              setTodos={setTodos}
                              key={i}
                          />
                      ))
                    : null}
            </ul>
        </div>
    );
};

export default TodoList;
