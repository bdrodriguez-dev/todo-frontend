import { useState, useEffect } from 'react';
import './App.css';
import TodoContainer from './Todo/TodoContainer';
import TodoList from './Todo/TodoList';
import TodoItem from './Todo/TodoItem';
import Modal from './Modal';
import { apiServices } from './apiServices';





function App() {
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toggleRerenderOnTodoEdit, setToggleRerenderOnTodoEdit] = useState(false);

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getAllTodos(setTodoList);
}, [toggleRerenderOnTodoEdit]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1 className="h1">This is a todo list app.</h1>
      {showModal && <Modal handleHideModal={hideModalHandler}><div>I'm a modal! :\</div></Modal>}
      <TodoContainer>
        <TodoList>
          {todoList.map(todo => {
                    return <TodoItem
                        id={todo.id}
                        key={todo.id}
                        todo={todo.todo}
                        dueDate={todo.dueDate}   
          />})}
        </TodoList>
      </TodoContainer>
    </div>
  );
}

export default App;
