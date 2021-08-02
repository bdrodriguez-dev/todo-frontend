import React from 'react';

const List = (props) => {
  return (
    <>
      <h2>{props.name}</h2>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          onChangeTodoDesHandler: props.onChangeTodoDesHandler,
          onSubmitHandler: props.onSubmitHandler,
          onBlurHandler: props.onBlurHandler,
          onChangeCheckedHandler: props.onChangeCheckedHandler,
          onChangeDateHandler: props.onChangeDateHandler,
          onDeleteHandler: props.onDeleteHandler,
        });
      })}
    </>
  );
};

export default List;
