import React from 'react';
import classes from './TodoList.module.css';
const TodoList = (props) => {
  return (
    <ul className={classes.ul}>
      {/* {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          onChangeTodoDesHandler: props.onChangeTodoDesHandler,
          onSubmitHandler: props.onSubmitHandler,
          onFocusHandler: props.onFocusHandler,
          onBlurHandler: props.onBlurHandler,
          onChangeCheckedHandler: props.onChangeCheckedHandler,
          onChangeDateHandler: props.onChangeDateHandler,
          onDeleteHandler: props.onDeleteHandler,
        });
      })} */}
      {props.children}
    </ul>
  );
};

export default TodoList;
