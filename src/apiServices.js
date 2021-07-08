import axios from "axios";

export const apiServices = {
    URL: 'http://localhost:8000/todos',
    getAllTodos: function(setDataInStateFunc) {
        axios.get(this.URL)
            .then(res => {
                setDataInStateFunc(res.data)
            })
            .catch(err => {
                console.log('Error from getAllTodos' + err);
            })
    },
    editTodo: function(id, updatedTodo) {
        const { todo, dueDate, completed } = updatedTodo;
        console.log('From api services:');
        console.log('todo: ' + todo);
        console.log('dueDate: ' + dueDate);
        console.log('completed: ' + completed);
        const todoWithDelimiter = todo.replace(/\s+/g, '+');
        console.log(todoWithDelimiter);

        // create url query
        let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}`;

        console.log(this.URL + '/' + id + query);
        
        axios.put(this.URL + '/' + id + query)
            .catch(err => { console.log(err) });
    }
};