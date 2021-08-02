import React, { useState, useEffect } from 'react';
// Local Components
import TodoContainer from './List/Todo/TodoContainer';
import TodoList from './List/Todo/TodoList';
import TodoItem from './List/Todo/TodoItem';
import ModalComp from './Modal/Modal';
import CreateTodo from './List/Todo/CreateTodo';
import List from './List/List';
// Services and 3rd Party
import { apiServices } from './../services/apiServices';

const Layout = (props) => {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [todosByList, setTodosByList] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getTodos(setTodos);
    apiServices.getLists(setLists);
  }, []);

  // Get an object with all todos organized by list with lists as keys
  useEffect(() => {
    let todosByListObj = {};

    todos.forEach((todo) => {
      const assignedList = todo.listName;

      if (assignedList in todosByListObj) {
        todosByListObj[assignedList].push(todo);
      } else {
        todosByListObj[assignedList] = [];
        todosByListObj[assignedList].push(todo);
      }
    });

    setTodosByList({ ...todosByListObj });
  }, [todos, lists]);

  // Handlers

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
};

export default Layout;
