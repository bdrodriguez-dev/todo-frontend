import classes from './TodoItem.module.css';

const TodoItem = (props) => {
    return <li key={props.id}>
        <form className={classes.todoContainer}>
                <div className={classes.checkContainer}>
                    <input type="checkbox"
                        className={classes.checkbox} />
                </div>
                <input type="text"
                    className={classes.todoText}
                    defaultValue={props.todo} />
                <input type="date"
                    className={classes.todoDueDate}
                    defaultValue={props.dueDate}/>
        </form>
    </li>   
};

export default TodoItem;