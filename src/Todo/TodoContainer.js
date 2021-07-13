// React imports
import React from 'react';

// Local utility imports
import { apiServices } from '../apiServices';
import { helpers } from './todoHelpers';
import classes from './TodoContainer.module.css';

const TodoContainer = (props) => {
  console.warn('Rendering -> TodoContainer');
  // const [todoEditSavePoint, setTodoEditSavePoint] = useState('');

  // TODO: How is this working? lol
  const handleFocus = (event) => {
    // onfocus get target current value
    // const savePoint = event.target.value;
    // setTodoEditSavePoint(savePoint);
    // TODO: Do I need this return?
    // return;
  };

  const handleBlur = (event) => {
    apiServices.getTodos(props.setTodoList);
  };

  const handleCompletedChange = (event) => {
    const { todoListCopy, todoID, todoIndex } =
      helpers.getUpdatedTodoListFromInput(event, props.todoList);

    props.setTodoList(todoListCopy);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, todoListCopy[todoIndex]);
    console.log(todoListCopy[todoIndex]);
  };

  const handleTodoDescriptionChange = (event) => {
    // get id from form
    const todoID = event.target.id;

    // find todoIndex of element that is being changed
    const todoIndex = helpers.getIndexFromId(todoID, props.todoList);

    // copy todoList and update the specific todo with input from user
    let todoListCopy = [...props.todoList];
    todoListCopy[todoIndex].todo = event.target.value;
    // const {todoListCopy} = helpers.getUpdatedTodoListFromInput(event, todoList);

    //Set todoList equal to updatedCopy
    props.setTodoList(todoListCopy);

    // No put request because we dont want to update the server on every change, only when the user is happy with the change and submits
  };

  const handleDueDateChange = (event) => {
    console.log(event);
    const { todoListCopy, todoID, todoIndex } =
      helpers.getUpdatedTodoListFromInput(event, props.todoList);

    props.setTodoList(todoListCopy);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, todoListCopy[todoIndex]);
    console.log(todoListCopy[todoIndex]);
  };

  const handleSubmitForTodoDesInput = (event) => {
    event.preventDefault();
    // get todo input
    const todo = event.target[1].value;

    // Recreate the object
    let updatedTodoObj = {};

    // Get the todo object being updated
    // get id from event
    const todoID = event.target.id;

    // find todoIndex of element that is being changed
    const todoIndex = helpers.getIndexFromId(todoID, props.todoList);

    // Populate the object with values from og
    updatedTodoObj = { ...props.todoList[todoIndex] };
    updatedTodoObj.todo = todo;

    // Make copy of list and replace og todo with updated todo
    const todoListCopy = [...props.todoList];
    todoListCopy[todoIndex] = updatedTodoObj;

    // Set todoList state to todoListCopy(with updated todo)
    props.setTodoList(todoListCopy);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, updatedTodoObj);
  };

  const handleDeleteTodo = (event) => {
    // get id
    const todoId = event.target.id;
    // make delete request

    apiServices.deleteTodo(todoId, props.setTodoList);
    apiServices.getTodos(props.setTodoList);
    console.log(props.todoList);
  };

  return (
    <div className={classes.todoContainer}>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          onChangeTodoDesHandler: handleTodoDescriptionChange,
          onSubmitHandler: handleSubmitForTodoDesInput,
          onFocusHandler: handleFocus,
          onBlurHandler: handleBlur,
          onChangeCheckedHandler: handleCompletedChange,
          onChangeDateHandler: handleDueDateChange,
          onDeleteHandler: handleDeleteTodo,
        });
      })}
      <button onClick={props.handleShowModal}>Add new task!</button>
    </div>
  );
};

export default TodoContainer;
