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
    const [todoEditSavePoint, setTodoEditSavePoint] = useState('');
    const [toggleRerenderOnTodoEdit, setToggleRerenderOnTodoEdit] = useState(false);
    
    
    // const [toggleCreateForm, setToggleCreateForm] = useState(false);

    // Get all todos when app loads
    useEffect(() => {
        apiServices.getAllTodos(setTodoList);
        console.log("useEffect called");
        console.log(JSON.stringify(todoList, null, 2));
        // TODO: How to get all todos from server after a put request
    }, [toggleRerenderOnTodoEdit]);

    // TODO: Maybe createTodo should be outsourced to a component (Single Responsibility Rule)
    const handleCreateTodo = (todoDescription, dueDate) => {
        // Show todo template

        // Get user input from template

        // Use user input for POST request
    };
    
    const handleFocus = (event) => {
        //onfocus get target current value
        const savePoint = event.target.value;
        console.log('savePoint(onFocus): ' + savePoint);
        setTodoEditSavePoint(savePoint);
        return;
    };

    const handleBlur = (event) => {
        const savePoint = todoEditSavePoint;
        console.log('savePoint(onBlur): ' + savePoint); // OnBlur has access to todoEditSavePoint

        // get id from form
        const todoID = event.target.id;
        // console.log('todoID(onBlur): ' + todoID);

        // find todoIndex of element that is being changed
        const todoIndex = helpers.getIndexFromId(todoID, todoList);
        // console.log('todoIndex(onBlur): ' + todoIndex);

        // copy todoList and update the specific todo with input from user
        let updatedTodoList = [...todoList];
        updatedTodoList[todoIndex].todo = savePoint;
        // const updatedTodoItem = updatedTodoList[todoIndex];
        // console.log(updatedTodoList);
        

        //Set todoList equal to updatedCopy
        setTodoList(updatedTodoList);
        setToggleRerenderOnTodoEdit(!toggleRerenderOnTodoEdit);
    };

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
    const handleSubmitForTodoDesInput = (event) => {
        event.preventDefault();

        // get todo input
        // TODO: Refactor todo to todoDescription everywhere
        const todo = event.target[1].value;
        
        // Recreate the object
        let updatedTodoObj = {};

            // Get the todo object being updated
                // get id from event
        const todoID = event.target.id;
        
                // find todoIndex of element that is being changed
        const todoIndex = helpers.getIndexFromId(todoID, todoList);

        updatedTodoObj = {...todoList[todoIndex], todo: todo};
        setTodoList([...todoList, updatedTodoObj]);
        console.log('The new updated todoList State: ');
        todoList.map(todo => {
            console.log(JSON.stringify(todo));
        });
        apiServices.editTodo(todoID, updatedTodoObj);


        // TODO: Check this out
        // const onKeyPress = event => {
        //     if (event.key === "Enter") {
        //       console.log("Set name with value", event.target.value);
        //       setName(event.target.value);
        //     }
        //   };

    };
    console.warn('RENDERED -> Container');
    return <div className={classes.todoContainer}>
        <TodoList>
            {todoList.map(todo => {
                return <TodoItem
                    id={todo.id}
                    key={todo.id}
                    todo={todo.todo}
                    dueDate={todo.dueDate}
                    onChangeHandler={handleChange}
                    onSubmitHandler={handleSubmitForTodoDesInput}
                    onFocusHandler={handleFocus}
                    onBlurHandler={handleBlur}
                    
                />
            })}
        </TodoList>
        <button>Add new task!</button>
    </div>
};

export default TodoContainer;