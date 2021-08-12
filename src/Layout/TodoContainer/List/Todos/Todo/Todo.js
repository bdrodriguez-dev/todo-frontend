import ListGroup from 'react-bootstrap/ListGroup';
const Todo = (props) => {
  return <ListGroup.Item>{props.todoItem.todo}</ListGroup.Item>;
};

export default Todo;
