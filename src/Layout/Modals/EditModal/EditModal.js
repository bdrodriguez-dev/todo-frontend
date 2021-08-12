import TodoItemForm from '../TodoItemForm/TodoItemForm';

const CreateModal = (props) => {
  const [rendered, setRendered] = useState(false);

  const focusRef = useRef(null);

  useEffect(() => {
    if (rendered) {
      findDOMNode(focusRef.current).focus();
      // console.log(focusRef.current);
      // focusRef.current.focus();
    }
  }, [rendered]);

  const handleBlur = () => {
    apiServices.getTodos(props.setTodoList);
  };

  const handleCompletedChange = (event) => {
    const { todoListCopy, todoID, todoIndex } =
      helpers.getUpdatedTodoListAfterInput(event, props.todoList);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, todoListCopy[todoIndex]);

    props.setTodoList([...todoListCopy]);
  };

  const handleTodoDescriptionChange = (event) => {
    const { todoListCopy } = helpers.getUpdatedTodoListAfterInput(
      event,
      props.todoList
    );
    console.log(todoListCopy);
    //Set todoList equal to updatedCopy
    props.setTodoList([...todoListCopy]);

    // No put request because we don't want to update the server on every change, only when the user is happy with the change and submits
  };

  const handleOnChangeForList = (event) => {
    const { todoListCopy, todoID, todoIndex } =
      helpers.getUpdatedTodoListAfterInput(event, props.todoList);

    apiServices.putTodo(todoID, todoListCopy[todoIndex]);

    props.setTodoList([...todoListCopy]);
  };

  const handleDueDateChange = (event) => {
    const { todoListCopy, todoID, todoIndex } =
      helpers.getUpdatedTodoListAfterInput(event, props.todoList);

    props.setTodoList(todoListCopy);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, todoListCopy[todoIndex]);
  };

  const handleSubmitForTodoDesInput = (event) => {
    // get todo input
    event.preventDefault();
    const todoDescription = event.target[1].value;

    // Recreate the object
    let updatedTodoObj = {};

    // Get the todo object being updated
    // get id from event
    const todoID = event.target.id;

    // find todoIndex of element that is being changed
    const todoIndex = helpers.getIndexFromId(todoID, props.todoList);

    // Populate the object with values from og
    updatedTodoObj = { ...props.todoList[todoIndex] };
    updatedTodoObj.todo = todoDescription;

    // Make copy of list and replace og todo with updated todo
    const todoListCopy = [...props.todoList];
    todoListCopy[todoIndex] = updatedTodoObj;

    // Set todoList state to todoListCopy(with updated todo)
    props.setTodoList(todoListCopy);

    // Make put request to server to update server data
    apiServices.putTodo(todoID, updatedTodoObj);
    document.activeElement.blur();
  };

  const handleDeleteTodo = (event) => {
    console.log('running delete handler');
    // get id
    const todoId = event.target.id;
    // make delete request

    apiServices.deleteTodo(todoId, props.setTodoList);
    apiServices.getTodos(props.setTodoList);
  };

  return (
    <TodoItemForm
      dueDate={getTodaysDate()}
      id={'template'}
      create={true}
      successLabel={props.successLabel}
      createOnSubmitHandler={handleCreateTodo}
      ref={focusRef} //
      setRendered={setRendered} //
      lists={props.lists}
      onChangeCheckedHandler={handleCompletedChange}
      onChangeTodoDesHandler={handleTodoDescriptionChange}
      onSubmitHandler={handleSubmitForTodoDesInput}
      onBlurHandler={handleBlur}
      onChangeDateHandler={handleDueDateChange}
      onDeleteHandler={handleDeleteTodo}
    />
  );
};

export default CreateModal;
