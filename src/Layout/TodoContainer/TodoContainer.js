// React imports
import React from 'react';

const TodoContainer = (props) => {
  return (
    <>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          displayList: props.displayList,
          setDisplayList: props.setDisplayList,
          lists: props.lists,
          todos: props.todos,
        });
      })}
    </>
  );
};

export default TodoContainer;
