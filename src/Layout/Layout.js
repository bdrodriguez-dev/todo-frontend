import React, { useState, useEffect } from 'react';
// Local Components
import TodoContainer from './List/Todo/TodoContainer/TodoContainer';
// import TodoList from './List/Todo/TodoList';
// import TodoItem from './List/Todo/TodoItem';
import ModalComp from './Modals/Modal';
import CreateTodo from './Modals/CreateTodo';
// import List from './List/List';
// Services and 3rd Party
import { apiServices } from './../services/apiServices';

const Layout = () => {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [todosByList, setTodosByList] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getTodos(setTodos);
    apiServices.getLists(setLists);
  }, []);

  // Get an object with all todos organized by list with lists as keys
  useEffect(() => {
    let todosByListObj = {};

    todos.forEach((todo) => {
      const assignedList = todo.list;

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
    <div className='layout'>
      <ModalComp
        handleHideModal={hideModalHandler}
        show={showModal}
        modalHeader='Create a new todo!'
      >
        <CreateTodo successLabel='Create' show={showModal} lists={lists} />
      </ModalComp>

      <h1 className='h1'>[0]</h1>
      <button onClick={() => setIsDebugMode(!isDebugMode)}>Debug Mode</button>
      {isDebugMode && (
        <>
          <button onClick={applyDummyData}>Populate with dummy data.</button>
          <button onClick={deleteAllData}>Delete all data.</button>
          <button onClick={() => console.log(todosByList)}>
            Print data to console.
          </button>
        </>
      )}

      <TodoContainer
        todoList={todos}
        setTodoList={setTodos}
        todosByList={todosByList}
        handleShowModal={showModalHandler}
        lists={lists}
      />
      {/* {Object.keys(todosByList).map((listKey) => {
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
      </TodoContainer> */}
    </div>
  );
};

export default Layout;
