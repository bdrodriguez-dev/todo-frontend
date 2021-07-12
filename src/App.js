import { useState, useEffect } from 'react';
import './App.css';
import TodoContainer from './Todo/TodoContainer';
import TodoList from './Todo/TodoList';
import TodoItem from './Todo/TodoItem';
import ModalComp from './Modal';
import { apiServices } from './apiServices';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toggleRerenderOnTodoEdit, setToggleRerenderOnTodoEdit] = useState(false);

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getTodos(setTodoList);
}, [toggleRerenderOnTodoEdit]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const getTodaysDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  const handleCreateTodo = (event) => {
    const completed = event.target[0].checked;
    const todoDescription = event.target[1].value; 
    const dueDate = event.target[2].value; 
    
    // Get user input from template
        const createdObject = {
            todo: todoDescription,
            dueDate: dueDate,
            completed: completed
        }
    // Use user input for POST request
    apiServices.postTodo(createdObject);
};

  return (
    <div className="App">
      <h1 className="h1">This is a todo list app.</h1>
      
      <ModalComp handleHideModal={hideModalHandler} show={showModal}>
        <TodoItem className="template" 
          todo="" 
          dueDate={getTodaysDate()}
          id={"template"}/>
      </ModalComp>
      
      <TodoContainer
        todoList={todoList}
        setTodoList={setTodoList}
        setToggleRerenderOnTodoEdit={setToggleRerenderOnTodoEdit}
        handleShowModal={showModalHandler}>
        <TodoList>
          {
            todoList.map(todo => {
                      return <TodoItem
                          id={todo.id}
                          key={todo.id}
                          todo={todo.todo}
                          dueDate={todo.dueDate} />})
          }
        </TodoList>
      </TodoContainer>
    </div>
  );
}

export default App;
