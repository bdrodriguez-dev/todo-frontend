import { useEffect, useState} from 'react'
import todoList from './dummyTodos';
import classes from './TodoList.module.css';




const TodoList = () => {
  return <div className={classes.container}>
    {
        todoList.map(todo => {
            return <form className={classes.todoContainer}>
                    <div className={classes.checkContainer}>
                        <input type="checkbox"
                            className={classes.checkbox} />
                    </div>
                    <input type="text" 
                        className={classes.todoText} 
                        defaultValue={todo.todo} />
                    <input type="date" 
                        className={classes.todoDueDate}
                        defaultValue={todo.dueDate}/>
            </form>
        })
    }
  </div>;
};

export default TodoList;