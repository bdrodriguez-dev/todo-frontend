import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import classes from './TodoItem.module.css';

const TodoItem = React.forwardRef((props, ref) => {
  useEffect(() => {
    if (props.create) {
      props.setRendered(true);
    }
  }, []);

  return (
    <li
      key={props.id}
      className={classes[props.className] + ' ' + classes.todoLi}
      // className={classes.todoLi}
    >
      {!props.create && (
        <button
          id={props.id}
          className={classes.deleteBtn}
          onClick={props.onDeleteHandler}
        >
          Delete
        </button>
      )}
      <form
        className={classes.todoForm}
        onSubmit={
          !props.create ? props.onSubmitHandler : props.createOnSubmitHandler
        }
        id={props.id}
      >
        <div className={classes.checkContainer}>
          <input
            type='checkbox'
            className={classes.checkbox}
            name='completed'
            id={props.id}
            onClick={props.onChangeCheckedHandler}
            defaultChecked={props.completed}
          />
        </div>
        <input
          type='text'
          className={classes.todoText}
          name='todo'
          id={props.id}
          value={props.todo}
          onChange={props.onChangeTodoDesHandler}
          ref={ref}
        />
        <input
          type='date'
          className={classes.todoDueDate}
          name='dueDate'
          defaultValue={props.dueDate}
          id={props.id}
          onChange={props.onChangeDateHandler}
        />
        <input
          type='text'
          name='listName'
          defaultValue={props.listName}
          id={props.id}
          onChange={props.onChangeDateHandler}
        />

        {props.create && (
          <Button
            className={classes.createBtn + ' ml-1'}
            variant='success'
            type='submit'
          >
            {props.successLabel}
          </Button>
        )}
      </form>
    </li>
  );
});

export default TodoItem;
