import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import classes from './TodoItem.module.css';

const TodoItem = React.forwardRef((props, ref) => {
  useEffect(() => {
    if (props.create) {
      props.setRendered(true);
    }
  }, []);

  return (
    <li key={props.id}>
      {/* {!props.create && (
        <button
          id={props.id}
          className={classes.deleteBtn}
          onClick={props.onDeleteHandler}
        >
          Delete
        </button>
      )} */}
      <Card className='card-body h-100'>
        <Form
          className={classes.form}
          onSubmit={
            !props.create ? props.onSubmitHandler : props.createOnSubmitHandler
          }
          id={props.id}
        >
          <div className={classes.mainInputs}>
            <Form.Group className={classes.checkbox} controlId={props.id}>
              <Form.Control
                type='checkbox'
                // id={props.id}
                onClick={props.onChangeCheckedHandler}
                defaultChecked={props.completed}
                size='sm'
                name='completed'
              />
            </Form.Group>
            <Form.Group controlId={props.id} className='w-75'>
              <Form.Control
                type='text'
                // id={props.id}
                value={props.todo}
                onChange={props.onChangeTodoDesHandler}
                ref={ref}
                size='sm'
                className={`border border-primary ${classes.todo}`}
                name='todo'
              />
            </Form.Group>
          </div>
          <div className={classes.subInputs}>
            <div className='form-group'>
              <select
                className={classes.listSelect}
                name='list'
                onChange={props.onChangeListHandler}
                id={props.id}
                defaultValue={props.list}
              >
                {props.lists.map((listOption, i) => {
                  return (
                    <option key={i} value={listOption.name}>
                      {listOption.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Form.Group className={classes.dueDate} controlId={props.id}>
              <Form.Control
                type='date'
                name='dueDate'
                defaultValue={props.dueDate}
                // id={props.id}
                onChange={props.onChangeDateHandler}
                size='sm'
                className={classes.dateInput}
              />
            </Form.Group>
          </div>

          {props.create && (
            <Button
              className={classes.createBtn + ' ml-1'}
              variant='success'
              type='submit'
            >
              {props.successLabel}
            </Button>
          )}
        </Form>
      </Card>
      {/* <form
        className={classes.todoForm}
        onSubmit={
          !props.create ? props.onSubmitHandler : props.createOnSubmitHandler
        }
        id={props.id}
      >
        <div className={classes.checkContainer}>
          <input
            type='checkbox'
            className={classes.checkbox}
            name='completed'
            id={props.id}
            onClick={props.onChangeCheckedHandler}
            defaultChecked={props.completed}
          />
        </div>
        <input
          type='text'
          className={classes.todoText}
          name='todo'
          id={props.id}
          value={props.todo}
          onChange={props.onChangeTodoDesHandler}
          ref={ref}
        />
        <input
          type='date'
          className={classes.todoDueDate}
          name='dueDate'
          defaultValue={props.dueDate}
          id={props.id}
          onChange={props.onChangeDateHandler}
        />
        <input
          type='text'
          name='listName'
          defaultValue={props.listName}
          id={props.id}
          onChange={props.onChangeDateHandler}
        />

        {props.create && (
          <Button
            className={classes.createBtn + ' ml-1'}
            variant='success'
            type='submit'
          >
            {props.successLabel}
          </Button>
        )}
      </form> */}
    </li>
  );
});

export default TodoItem;
