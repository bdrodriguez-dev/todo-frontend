// React imports
import { useEffect, useState} from 'react'

// Third party imports
import axios from 'axios';

// CSS imports
import classes from './TodoList.module.css';

// Component imports
import TodoItem from './TodoItem';



const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [toggleCreateForm, setToggleCreateForm] = useState(false);
    
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
        // Show todo template

        // Get user input from template

        // Use user input for POST request
    }


  return <div className={classes.container}>
    <ul>
        {
            todoList.map(todo => {
                return <TodoItem
                    id={todo.id}
                    todo={todo.todo}
                    dueDate={todo.dueDate}
                />
            })
        }
    </ul>
    <button>Add new task!</button>
  </div>;
};

export default TodoList;