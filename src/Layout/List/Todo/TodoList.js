import React from 'react';

const TodoList = (props) => {
  return (
    <ul>
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
