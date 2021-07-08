// React imports
import { useEffect, useState } from 'react';

// Local utility imports
import { apiServices } from '../apiServices';
import { helpers } from './todoHelpers';
import classes from './TodoContainer.module.css';

// Component imports
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";

const TodoContainer = props => {
    const [todoList, setTodoList] = useState([]);
    // const [toggleCreateForm, setToggleCreateForm] = useState(false);

    // Get all todos when app loads
    useEffect(() => {
        apiServices.getAllTodos(setTodoList);
        console.log("useEffect called");
        // TODO: How to get all todos from server after a put request
    }, []);

    // TODO: Think about whether to make a func or not
    const handleMapTodosToTodoItems = () => {
        
    };

    // TODO: Maybe createTodo should be outsourced to a component (Single Responsibility Rule)
    const handleCreateTodo = (todoDescription, dueDate) => {
        // Show todo template

        // Get user input from template

        // Use user input for POST request
    };

    // TODO: Control input value via state, then pass to <TodoItem>
    
    const handleChange = (event) => {
        //get initial value
        // const prevValue = helpers.usePrevious(event.target.value);
        // console.log('prevValue: ' + prevValue);

        // get id from form
        const todoID = event.target.id;
        
        // find todoIndex of element that is being changed
        const todoIndex = helpers.getIndexFromId(todoID, todoList);

        // copy todoList and update the specific todo with input from user
        let updatedTodoList = [...todoList];
        updatedTodoList[todoIndex].todo = event.target.value;

        //Set todoList equal to updatedCopy
        setTodoList(updatedTodoList);
        console.log(todoList);
    };

    // When submitted I want to send a put request
        // get changes
        // create new todo object (maybe not)
    const handleSubmit = (event) => {
        event.preventDefault();

        // what input did the submit come from and get proper inputValue
        const completed = event.target[0].checked
        const todo = event.target[1].value;
        const dueDate = event.target[2].value;

        console.log(completed + ',' + todo + ',' + dueDate);
        
        // const input = event.target;
        // const inputName = input.name;
        // let inputValue;

        // if (inputName === 'completed') {
        //     inputValue = input.checked;
        // } else {
        //     inputValue = input.value;
        // }

        // // Recreate the object
        // let updatedTodoObj = {};

        //     // Get object being updated
        //         // get id from event
        // const todoID = event.target.id;
        
        //         // find todoIndex of element that is being changed
        // const todoIndex = helpers.getIndexFromId(todoID, todoList);

        // const todoToUpdate = todoList[todoIndex];

        //     // Set the object properties

        //         // Set todo property
        // if (inputName === 'todo') {
        //     updatedTodoObj.todo = inputValue;
        // } else {
        //     updatedTodoObj.todo = todoToUpdate.todo;
        // }

        //         // Set dueDate property
        // if (inputName === 'dueDate') {
        //     updatedTodoObj.dueDate = inputValue;
        // } else {
        //     updatedTodoObj.dueDate = todoToUpdate.dueDate;
        // }

        //         // Set completed property
        // if (inputName === 'completed') {
        //     updatedTodoObj.completed = inputValue;
        // } else {
        //     updatedTodoObj.completed = todoToUpdate.completed;
        // }
        // console.log('Im from the submit handler');
        // apiServices.editTodo(input.id, updatedTodoObj);
    };

    return <div className={classes.todoContainer}>
        <TodoList>
            {todoList.map(todo => {
                return <TodoItem
                    id={todo.id}
                    todo={todo.todo}
                    dueDate={todo.dueDate}
                    onChangeHandler={handleChange}
                    onSubmitHandler={handleSubmit}
                />
            })}
        </TodoList>
        <button>Add new task!</button>
    </div>
};

export default TodoContainer;