import { findDOMNode } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import TodoItem from '../List/Todo/TodoItem/TodoItem';
import { apiServices } from '../../services/apiServices';

import classes from './CreateTodo.module.css';
import Container from 'react-bootstrap/Container';

const CreateTodo = (props) => {
  const [rendered, setRendered] = useState(false);

  const focusRef = useRef(null);

  useEffect(() => {
    if (rendered) {
      findDOMNode(focusRef.current).focus();
      // console.log(focusRef.current);
      // focusRef.current.focus();
    }
  }, [rendered]);

  const handleCreateTodo = (event) => {
    // event.preventDefault();
    const completed = event.target[0].checked;
    const todoDescription = event.target[1].value;
    const dueDate = event.target[3].value;
    const list = event.target[2].value;
    console.log(`completed is: ${completed}`);
    console.log(`todoDescription is: ${todoDescription}`);
    console.log(`dueDate is: ${dueDate}`);
    console.log(`list is: ${list}`);

    // Get user input from template
    const createdObject = {
      todo: todoDescription,
      dueDate: dueDate,
      completed: completed,
      list: list,
    };
    // Use user input for POST request
    apiServices.postTodo(createdObject);
  };

  const getTodaysDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  return (
    <>
      <TodoItem
        dueDate={getTodaysDate()}
        id={'template'}
        create={true}
        successLabel={props.successLabel}
        createOnSubmitHandler={handleCreateTodo}
        ref={focusRef} //
        setRendered={setRendered} //
        lists={props.lists}
      />
      <Container className='d-flex justify-content-center'></Container>
    </>
  );
};

export default CreateTodo;
