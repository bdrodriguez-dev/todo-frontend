import React, { useState, useEffect } from 'react';
import './App.css';
import TodoContainer from './Layout/List/Todo/TodoContainer';
import TodoList from './Layout/List/Todo/TodoList';
import TodoItem from './Layout/List/Todo/TodoItem';
import ModalComp from './Modal';
import CreateTodo from './Layout/List/Todo/CreateTodo';
import List from './Layout/List/List';

import { apiServices } from './services/apiServices';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [todosByList, setTodosByList] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getTodos(setTodos);
    apiServices.getLists(setLists);
  }, []);

  useEffect(() => {
    let todosByListObj = {};

    todos.forEach((todo) => {
      const assignedList = todo.listName;
      const isInObj = assignedList in todosByListObj;

      if (assignedList in todosByListObj) {
        todosByListObj[assignedList].push(todo);
      } else {
        todosByListObj[assignedList] = [];
        todosByListObj[assignedList].push(todo);
      }
    });

    setTodosByList({ ...todosByListObj });
  }, [todos, lists]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const applyDummyData = () => {
    apiServices.applyDummyData(setTodos, setLists);
  };

  const deleteAllData = () => {
    apiServices.deleteAllData(setTodos, setLists);
  };

  const makeTodoList = (listName) => {
    const todos = apiServices.getTodosByList(listName);
    return todos;
  };

  return (
    <div className='App'>
      <h1 className='h1'>This is a todo list app.</h1>
      <button onClick={applyDummyData}>Populate with dummy data.</button>
      <button onClick={deleteAllData}>Delete all data</button>

      <ModalComp
        handleHideModal={hideModalHandler}
        show={showModal}
        modalHeader='Create a new todo!'
      >
        <CreateTodo successLabel='Create' show={showModal} />
      </ModalComp>

      <TodoContainer
        todoList={todos}
        setTodoList={setTodos}
        handleShowModal={showModalHandler}
      >
        {Object.keys(todosByList).map((listKey) => {
          console.log(todosByList);
          return (
            <List name={listKey} key={listKey}>
              <TodoList>
                {todosByList[listKey].map((todo) => (
                  <TodoItem
                    id={todo._id}
                    key={todo._id}
                    todo={todo.todo}
                    dueDate={todo.dueDate}
                    completed={todo.completed}
                    create={false}
                    className={todo.completed ? 'completed' : 'incomplete'}
                    autoFocus={false}
                  />
                ))}
              </TodoList>
            </List>
          );
        })}
      </TodoContainer>
    </div>
  );
}

export default App;
