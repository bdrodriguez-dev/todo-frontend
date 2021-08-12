import React from 'react';
import Todos from './Todos/Todos';
import Todo from './Todos/Todo/Todo';
import Button from 'react-bootstrap/Button';

const List = (props) => {
  return (
    <>
      <h2>{props.displayList.name}</h2>
      <Todos>
        {Object.keys(props.displayList).length === 0
          ? null
          : props.displayList.todos.map((todoItem) => {
              return <Todo todoItem={todoItem} key={todoItem._id} />;
            })}
      </Todos>

      <Button variant='success' onClick={props.handleShowModal}>
        Add new task!
      </Button>
    </>
  );
};

export default List;
