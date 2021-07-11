// React imports
import React, { useEffect, useState } from 'react';

// Local utility imports
import { apiServices } from '../apiServices';
import { helpers } from './todoHelpers';
import classes from './TodoContainer.module.css';

// Component imports
import TodoList from './TodoList';
import TodoItem from './TodoItem';

const TodoContainer = props => {
    const [todoEditSavePoint, setTodoEditSavePoint] = useState('');
    
    
    // TODO: Refactor todo to todoDescription everywhere
    
    // const [toggleCreateForm, setToggleCreateForm] = useState(false);

    

    // TODO: Maybe createTodo should be outsourced to a component (Single Responsibility Rule)
    // const handleCreateTodo = (todoDescription, dueDate) => {
    //     // Show todo template (this can be a modal I think)

    //     // Get user input from template

    //     // Use user input for POST request
    // };
    
    const handleFocus = (event) => {
        // onfocus get target current value
        const savePoint = event.target.value;
        setTodoEditSavePoint(savePoint);
        // TODO: Do I need this return?
        // return;
    };

    const handleBlur = (event) => {
        const { todoListCopy } = helpers.getUpdatedTodoListFromInput(event, props.todoList);

        // Set todoList state to todoListCopy(with updated todo)
        props.setTodoList(todoListCopy);

        props.setToggleRerenderOnTodoEdit(!props.toggleRerenderOnTodoEdit);
    };

    const handleChangeForChecked = (event) => {
        const {todoListCopy, todoID, todoIndex} = helpers.getUpdatedTodoListFromInput(event, props.todoList);

        props.setTodoList(todoListCopy);

        // Make put request to server to update server data
        apiServices.editTodo(todoID, todoListCopy[todoIndex]);
    };

    const handleChangeForTodoDesInput = (event) => {
        // get id from form
        const todoID = event.target.id;
        
        // find todoIndex of element that is being changed
        const todoIndex = helpers.getIndexFromId(todoID, props.todoList);

        // copy todoList and update the specific todo with input from user
        let todoListCopy = [...props.todoList];
        todoListCopy[todoIndex].todo = event.target.value;
        // const {todoListCopy} = helpers.getUpdatedTodoListFromInput(event, todoList);


        //Set todoList equal to updatedCopy
        props.setTodoList(todoListCopy);
    };

    const handleSubmitForTodoDesInput = (event) => {
        event.preventDefault();
        // get todo input
        const todo = event.target[1].value;
        
        // Recreate the object
        let updatedTodoObj = {};

            // Get the todo object being updated
                // get id from event
        const todoID = event.target.id;
        
                // find todoIndex of element that is being changed
        const todoIndex = helpers.getIndexFromId(todoID, props.todoList);

            // Populate the object with values from og
        updatedTodoObj = {...props.todoList[todoIndex]};
        updatedTodoObj.todo = todo;
       
        // Make copy of list and replace og todo with updated todo
        const todoListCopy = [...props.todoList];
        todoListCopy[todoIndex] = updatedTodoObj;

        // Set todoList state to todoListCopy(with updated todo)
        props.setTodoList(todoListCopy);
        
        // Make put request to server to update server data
        apiServices.editTodo(todoID, updatedTodoObj);
    };
    
    return <div className={classes.todoContainer}>
            {
                React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, {
                        onChangeTodoDesHandler: handleChangeForTodoDesInput,
                        onSubmitHandler: handleSubmitForTodoDesInput,
                        onFocusHandler: handleFocus,
                        onBlurHandler: handleBlur,
                        onChangeCheckedHandler: handleChangeForChecked
                    })
                })
            }
        <button onClick={props.handleShowModal}>Add new task!</button>
    </div>
};

export default TodoContainer;