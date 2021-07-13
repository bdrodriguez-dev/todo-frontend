export const helpers = {
  getIndexFromId: function (id, list) {
    // find todoIndex of element that is being changed
    const todoIndex = list.findIndex((todo) => {
      return id === todo.id;
    });

    return todoIndex;
  },
  getUpdatedTodoListAfterInput: function (inputEvent, list) {
    let update;
    const inputType = inputEvent.target.name;

    // Get the appropriate userInput
    if (inputType === 'todo' || inputType === 'dueDate') {
      update = inputEvent.target.value;
    } else {
      update = inputEvent.target.checked;
    }
    console.log(update);
    //Creating updatedList
    const todoID = inputEvent.target.id;

    const todoIndex = this.getIndexFromId(todoID, list);

    let todoListCopy = list;
    todoListCopy[todoIndex][inputType] = update;
    //inputEvent.target.value

    return { todoListCopy, todoID, todoIndex };
  },
};
