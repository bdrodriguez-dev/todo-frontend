import React, { useState, useEffect, useRef } from 'react';

// Local Components
import TodoContainer from './TodoContainer/TodoContainer';
import List from './TodoContainer/List/List';
import ModalContainer from './Modals/ModalContainer';
import CreateModal from './Modals/CreateModal/CreateModal';

// import TodoList from './List/Todo/TodoList';
// import TodoItem from './List/Todo/TodoItem';
// import ModalComponent from './Modals/ModalContainer';
// import CreateTodo from './Modals/CreateModal/CreateTodo';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Styling

// Services and 3rd Party
import { apiServices } from './../services/apiServices';

const Layout = () => {
  // Data
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [todosByList, setTodosByList] = useState({});
  const [displayList, setDisplayList] = useState({});

  // Toggles/Flags
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isDataLoadedInState, setIsDataLoadedInState] = useState(false);

  // const mounted = useRef(false);

  // useEffect(() => {
  //   mounted.current = true;
  //   return () => (mounted.current = false);
  // });

  // Get all todos when app loads
  useEffect(() => {
    // console.log('Hello from useEffect Layout.js');
    let isMounted = true;
    if (isMounted) {
      apiServices.getTodos(setTodos, setTodosByList, setDisplayList);
      apiServices.getLists(setLists);
      setIsDataLoadedInState(true);
    }
    return () => setIsDataLoadedInState(false);
  }, []);

  // useEffect(() => {
  //   if (isDataLoadedInState) {
  //     console.log(todos);
  //     console.log(lists);
  //     console.log(todosByList);
  //     console.log(displayList);
  //   }
  // }, [isDataLoadedInState]);

  // Handlers

  // const getData = () => {
  //   console.log(mounted.current);
  //   if (mounted.current) {
  //     apiServices.getTodos(setTodos, setTodosByList, setDisplayList);
  //     apiServices.getLists(setLists);
  //     setIsDataLoadedInState(true);
  //   }
  // };

  const showModalHandler = () => {
    setIsShowModal(true);
  };

  const hideModalHandler = () => {
    setIsShowModal(false);
  };

  const applyDummyData = () => {
    apiServices.applyDummyData(
      setTodos,
      setLists,
      setTodosByList,
      setDisplayList
    );
  };

  const deleteAllData = () => {
    apiServices.deleteAllData(
      setTodos,
      setLists,
      setTodosByList,
      setDisplayList
    );
  };

  const generateAndSetDisplayList = (e) => {
    // take todosByList and get the list that was selected
    const list = e.target.value;
    const todos = todosByList[list];
    const displayListObj = {
      name: list,
      todos: todos,
    };
    setDisplayList({ ...displayListObj });
  };

  return (
    <div className='layout'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>[0] Array of Zero</Navbar.Brand>
          <Nav className='me-auto'>
            <select
              // className={classes.listSelect}
              name='listSelect'
              onChange={generateAndSetDisplayList}
              className='btn btn-primary'
            >
              {lists.map((listOption, i) => {
                return (
                  <option key={i} value={listOption.name}>
                    {listOption.name}
                  </option>
                );
              })}
            </select>
            {/* ********************* Debug Mode ************** */}
            <Button
              variant='warning'
              onClick={() => setIsDebugMode(!isDebugMode)}
              size='sm'
            >
              Debug Mode
            </Button>
            {isDebugMode && (
              <>
                <Button onClick={applyDummyData} size='sm'>
                  Populate with dummy data.
                </Button>
                <Button onClick={deleteAllData} size='sm'>
                  Delete all data.
                </Button>
                <Button
                  onClick={() => {
                    console.log(`todos: ${JSON.stringify(todos)}`);
                    console.log(`lists: ${JSON.stringify(lists)}`);
                    console.log(`todosByList: ${JSON.stringify(todosByList)}`);
                    console.log(`displayList: ${JSON.stringify(displayList)}`);
                  }}
                  size='sm'
                >
                  Print data to console.
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <main>
        {/* ********************* Edit and Create Modals ************** */}

        {/* <ModalComponent
        handleHideModal={hideModalHandler}
        show={isShowModal}
        modalHeader='Create a new todo!'
      >
        <CreateTodo successLabel='Create' show={isShowModal} lists={lists} />
      </ModalComponent> */}

        <ModalContainer
          handleHideModal={hideModalHandler}
          show={isShowModal}
          modalHeader='Create a new todo!'
        >
          <CreateModal lists={lists} />
        </ModalContainer>

        {/* ********************** Main Todo List **********************/}

        {isDataLoadedInState && (
          <TodoContainer
            displayList={displayList}
            setDisplayList={setDisplayList}
            lists={lists}
            todos={todos}
          >
            <List />
          </TodoContainer>
        )}
      </main>
    </div>
  );
};

export default Layout;
