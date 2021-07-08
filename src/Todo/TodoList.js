// Local utility imports
import classes from './TodoList.module.css';

const TodoList = props => {
    return <ul>{props.children}</ul>
};

export default TodoList;