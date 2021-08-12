import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import ModalContainer from '../ModalContainer';
import classes from './TodoItemForm.module.css';

const TodoItemForm = React.forwardRef((props, ref) => {
  useEffect(() => {
    if (props.create) {
      props.setRendered(true);
    }
  }, []);

  return (
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
  );
});

export default TodoItemForm;
