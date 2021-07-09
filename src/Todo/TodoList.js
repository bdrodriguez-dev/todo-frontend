// Local utility imports
import classes from './TodoList.module.css';

const TodoList = props => {
    console.warn('RENDERED -> TodoList');
    return <ul>{props.children}</ul>
};

export default TodoList;