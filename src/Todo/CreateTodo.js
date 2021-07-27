import TodoItem from './TodoItem';
import { apiServices } from '../apiServices';

import classes from './CreateTodo.module.css';
import Container from 'react-bootstrap/Container';

const CreateTodo = (props) => {
  const handleCreateTodo = (event) => {
    const completed = event.target[0].checked;
    const todoDescription = event.target[1].value;
    const dueDate = event.target[2].value;

    // Get user input from template
    const createdObject = {
      todo: todoDescription,
      dueDate: dueDate,
      completed: completed,
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
      />
      <Container className='d-flex justify-content-center'></Container>
    </>
  );
};

export default CreateTodo;
