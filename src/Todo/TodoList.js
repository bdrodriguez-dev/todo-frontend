import React from 'react'

const TodoList = (props) => (
  <ul>
    {React.Children.map(props.children, (child) =>
      React.cloneElement(child, {
        onChangeTodoDesHandler: props.onChangeTodoDesHandler,
        onSubmitHandler: props.onSubmitHandler,
        onFocusHandler: props.onFocusHandler,
        onBlurHandler: props.onBlurHandler,
        onChangeCheckedHandler: props.onChangeCheckedHandler,
        onChangeDateHandler: props.onChangeDateHandler,
        onDeleteHandler: props.onDeleteHandler,
      }),
    )}
  </ul>
)

export default TodoList
