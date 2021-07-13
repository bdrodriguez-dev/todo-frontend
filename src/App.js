import React, { useState, useEffect } from 'react'
import './App.css'
import TodoContainer from './Todo/TodoContainer'
import TodoList from './Todo/TodoList'
import TodoItem from './Todo/TodoItem'
import ModalComp from './Modal'
import CreateTodo from './Todo/CreateTodo'

import { apiServices } from './apiServices'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [todoList, setTodoList] = useState([])
  const [showModal, setShowModal] = useState(false)

  // Get all todos when app loads
  useEffect(() => {
    apiServices.getTodos(setTodoList);
  }, []);

  const showModalHandler = () => {
    setShowModal(true)
  }

  const hideModalHandler = () => {
    setShowModal(false)
  }

  return (
    <div className='App'>
      <h1 className='h1'>This is a todo list app.</h1>

      <ModalComp
        handleHideModal={hideModalHandler}
        show={showModal}
        modalHeader='Create a new todo!'
      >
        <CreateTodo successLabel='Create' />
      </ModalComp>

      <TodoContainer
        todoList={todoList}
        setTodoList={setTodoList}
        handleShowModal={showModalHandler}
      >
        <TodoList>
          {todoList.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                key={todo.id}
                todo={todo.todo}
                dueDate={todo.dueDate}
                completed={todo.completed}
                create={false}
              />
            );
          })}
        </TodoList>
      </TodoContainer>
    </div>
  )
}

export default App
