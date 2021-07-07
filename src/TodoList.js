// React imports
import { useEffect, useState, useRef} from 'react'

// Third party imports
import axios from 'axios';

// CSS imports
import classes from './TodoList.module.css';

// Component imports
import TodoItem from './TodoItem';



const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [toggleCreateForm, setToggleCreateForm] = useState(false);
    
    const templateRef = useRef();

    // Get all todos when app loads
    useEffect(() => {
        axios.get('http://localhost:8000/todos')
            .then((res => {
                setTodoList(res.data);
                // console.log(todoList);
            }))
            .catch((err) => {
                console.log(err)
            });
        
            // console.log(todoList[0].dueDate);
    }, []);

    const handleCreateTodo = (todoDescription, dueDate) => {
        // Toggle showCreate to dynamically render template
        setToggleCreateForm(true);
        // Get user input from template
        console.log(templateRef);
        // console.log(templateRef.current[1].value);
        // Use user input for POST request
    }


  return <div className={classes.container}>
    <ul>
        {
            todoList.map(todo => {
                return <li key={todo.id}>
                    <TodoItem
                        id={todo.id}
                        todo={todo.todo}
                        dueDate={todo.dueDate}
                    />
                </li>
            })
        }
    </ul>
    {
        toggleCreateForm ? 
            <>
                <br />
                <TodoItem
                    todo="test"
                    dueDate="22-07-07"
                    forwardedRef={templateRef} />
            </>
             : 
            <button onClick={handleCreateTodo}>Add new task!</button>
    }
  </div>;
};

export default TodoList;