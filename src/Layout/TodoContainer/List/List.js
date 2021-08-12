import React from 'react';
import Todos from './Todos/Todos';
import Todo from './Todos/Todo/Todo';
import Button from 'react-bootstrap/Button';

// Styling
import classes from './List.module.css';

const List = (props) => {
  // const [isDisplayListEmpty, setIsDisplayListEmpty] = true
  const formatListName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className={classes.container}>
      {Object.keys(props.displayList).length === 0 ? null : (
        <h3 className={classes.h2}>{formatListName(props.displayList.name)}</h3>
      )}

      <Todos>
        {Object.keys(props.displayList).length === 0
          ? null
          : props.displayList.todos.map((todoItem) => {
              return <Todo todoItem={todoItem} key={todoItem._id} />;
            })}
      </Todos>

      <Button
        className={classes.createButton}
        variant='success'
        onClick={props.handleShowModal}
      >
        Add new task!
      </Button>
    </div>
  );
};

export default List;
