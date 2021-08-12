import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import classes from './Todo.module.css';

const Todo = (props) => {
  return (
    <ListGroup.Item>
      <div className={classes.container}>
        <Form.Check type='checkbox' inline className={classes.checkbox} />
        {props.todoItem.todo}
      </div>
    </ListGroup.Item>
  );
};

export default Todo;
