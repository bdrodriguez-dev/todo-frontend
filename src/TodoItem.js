import React from 'react';
import classes from './TodoItem.module.css';

class TodoItem extends React.Component {
    render() {
        return <form className={classes.todoContainer}>
            <div className={classes.checkContainer}>
                <input type="checkbox"
                    className={classes.checkbox} />
            </div>
            <input type="text"
                ref={this.props.forwardedRef}
                className={classes.todoText}
                defaultValue={this.props.todo} />
            <input type="date"
                className={classes.todoDueDate}
                defaultValue={this.props.dueDate}/>
        </form> 
    }
};

export default TodoItem;