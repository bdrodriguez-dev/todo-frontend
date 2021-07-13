export const helpers = {
  getIndexFromId(id, list) {
    // find todoIndex of element that is being changed
    const todoIndex = list.findIndex((todo) => id === todo.id)

    return todoIndex
  },
  getUpdatedTodoListFromInput(inputEvent, list) {
    let update
    const inputType = inputEvent.target.name

    // Get the appropriate userInput
    if (inputType === 'todo' || inputType === 'dueDate') {
      update = inputEvent.target.value
    } else {
      update = inputEvent.target.checked
    }
    console.log(update)
    // Creating updatedList
    const todoID = inputEvent.target.id

    const todoIndex = this.getIndexFromId(todoID, list)

    const todoListCopy = list
    todoListCopy[todoIndex][inputType] = update
    // inputEvent.target.value

    return { todoListCopy, todoID, todoIndex }
  },
}
