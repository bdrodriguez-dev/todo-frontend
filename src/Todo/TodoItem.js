import classes from './TodoItem.module.css';

const TodoItem = (props) => {
    return <li key={props.id} className={classes[props.className]}>
        <form className={classes.todoContainer}
            onSubmit={props.onSubmitHandler}
            id={props.id}>
                <div className={classes.checkContainer}>
                    <input type="checkbox"
                        className={classes.checkbox}
                        name="completed"
                        id={props.id}
                        onChange={props.onChangeCheckedHandler} />
                </div>
                <input type="text"
                    className={classes.todoText}
                    name="todo"
                    id={props.id}
                    value={props.todo}
                    onChange={props.onChangeTodoDesHandler}
                    onFocus={props.onFocusHandler}
                    onBlur={props.onBlurHandler} />
                <input type="date"
                    className={classes.todoDueDate}
                    name="dueDate"
                    defaultValue={props.dueDate}
                    id={props.id} />
        </form>
    </li>   
};

export default TodoItem;