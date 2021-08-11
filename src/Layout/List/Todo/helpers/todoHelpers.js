export const helpers = {
  getIndexFromId: function (id, list) {
    // find todoIndex of element that is being changed
    const todoIndex = list.findIndex((todo) => {
      return id === todo._id;
    });

    return todoIndex;
  },
  getUpdatedTodoListAfterInput: function (inputEvent, list) {
    let update;
    const inputType = inputEvent.target.name;

    // Get the appropriate userInput
    if (
      inputType === 'todo' ||
      inputType === 'dueDate' ||
      inputType === 'list'
    ) {
      update = inputEvent.target.value;
    } else {
      update = inputEvent.target.checked;
    }

    //Creating updatedList
    const todoID = inputEvent.target.id;

    const todoIndex = this.getIndexFromId(todoID, list);

    let todoListCopy = [...list];
    // let todoListCopy = list;

    // console.log('list: ' + JSON.stringify(list));
    // console.log('todoListCopy: ' + JSON.stringify(todoListCopy));
    // console.log('todoIndex: ' + todoIndex);
    // console.log('todoListCopy[todoIndex]: ' + todoListCopy[todoIndex]);

    todoListCopy[todoIndex][inputType] = update;
    //inputEvent.target.value

    return { todoListCopy, todoID, todoIndex };
  },
};
