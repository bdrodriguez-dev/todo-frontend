import classes from './TodoItem.module.css';

const TodoItem = (props) => {
    return <li key={props.id}>
        <form className={classes.todoContainer}
            onSubmit={props.onSubmitHandler}
            id={props.id}
            >
                <div className={classes.checkContainer}>
                    <input type="checkbox"
                        className={classes.checkbox}
                        name="completed"
                         />
                </div>
                <input type="text"
                    className={classes.todoText}
                    name="todo"
                    id={props.id}
                    defaultValue={props.todo}
                    onChange={props.onChangeHandler}
                     />
                <input type="date"
                    className={classes.todoDueDate}
                    name="dueDate"
                    defaultValue={props.dueDate}
                    />
        </form>
    </li>   
};

export default TodoItem;