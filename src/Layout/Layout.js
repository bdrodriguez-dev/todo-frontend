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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Styling
import classes from './Layout.module.css';

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

  const generateAndSetDisplayList = (eKey, e) => {
    // take todosByList and get the list that was selected
    const list = eKey;
    // console.log(e);
    // console.log(eKey);

    const todos = todosByList[list];
    const displayListObj = {
      name: list,
      todos: todos,
    };
    setDisplayList({ ...displayListObj });
  };

  const isProjectSelectActive = (listOption) => {
    if (listOption.name === displayList.name) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='layout'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>[0] Array of Zero</Navbar.Brand>
          <Nav className='me-auto'>
            <Dropdown
              id='dropdown-debug'
              // drop='start'
            >
              <Dropdown.Toggle variant='warning'>Debug</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={applyDummyData}>
                  Populate with dummy data.
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteAllData}>
                  Delete all data.
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    console.log(`todos: ${JSON.stringify(todos)}`);
                    console.log(`lists: ${JSON.stringify(lists)}`);
                    console.log(`todosByList: ${JSON.stringify(todosByList)}`);
                    console.log(`displayList: ${JSON.stringify(displayList)}`);
                  }}
                >
                  Print data to console.
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DropdownButton
              id='dropdown-project'
              title='Project'
              variant='primary'
              onSelect={generateAndSetDisplayList}
            >
              <Dropdown.Menu>
                {lists.map((listOption, i) => {
                  return (
                    <Dropdown.Item
                      key={i}
                      active={isProjectSelectActive(listOption)}
                      onClick={() => {
                        console.log(listOption.name);
                        console.log(displayList.name);
                      }}
                      eventKey={listOption.name}
                    >
                      {listOption.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </DropdownButton>
          </Nav>
        </Container>
      </Navbar>

      <main className={classes.main}>
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
