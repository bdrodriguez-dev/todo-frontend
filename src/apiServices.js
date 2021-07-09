import axios from "axios";

export const apiServices = {
    // URL: 'http://localhost:8000/todos',
    instance: axios.create({baseURL: 'http://localhost:8000/todos'}),
    getAllTodos: function(setDataInStateFunc) {
        console.log('getAllTodos is being executed')
        this.instance.get('/')
            .then(res => {
                console.log('This is the response from the .then: ' + JSON.stringify(res.data, null, 2));
                setDataInStateFunc(res.data);
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
        
        this.instance.put('/' + id + query)
            .catch(err => { console.log(err) });
    }
};