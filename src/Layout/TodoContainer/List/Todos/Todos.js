import React from 'react';
import classes from './Todos.module.css';
import ListGroup from 'react-bootstrap/ListGroup';

const Todos = (props) => {
  return <ListGroup>{props.children}</ListGroup>;
};

export default Todos;
