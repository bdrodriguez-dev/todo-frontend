import axios from 'axios';

export const apiServices = {
  // URL: 'http://localhost:8000/todos',
  instance: axios.create({ baseURL: 'http://localhost:8000/todos' }),
  getTodos: function (setDataInStateFunc) {
    this.instance
      .get('/')
      .then((res) => {
        setDataInStateFunc(res.data);
      })
      .catch((err) => {
        console.log('Error from getAllTodos' + err);
      });
  },
  putTodo: function (id, updatedTodoObj) {
    const { todo, dueDate, completed } = updatedTodoObj;
    todo.replace(/\s+/g, '+');

    // create url query
    let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}`;

    console.log(this.URL + '/' + id + query);

    this.instance.put('/' + id + query).catch((err) => {
      console.log(err);
    });
  },
  postTodo: function (createdTodoObj) {
    const { todo, dueDate, completed } = createdTodoObj;
    todo.replace(/\s+/g, '+');

    // create url query
    let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}`;

    this.instance.post('/' + query).catch((err) => {
      console.log(err);
    });
  },
  deleteTodo: function (id, setDataInStateFunc) {
    console.log('http://localhost:8000/todos' + '/' + id);
    this.instance
      .delete('/' + id)
      .then(() => {
        this.getTodos(setDataInStateFunc);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
