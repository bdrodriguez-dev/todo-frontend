import axios from 'axios';

export const apiServices = {
  // URL: 'http://localhost:8000/todos',
  instance: axios.create({ baseURL: 'http://localhost:8000/' }),
  getTodos: function (setDataInStateFunc) {
    this.instance
      .get('/todos')
      .then((res) => {
        setDataInStateFunc(res.data);
      })
      .catch((err) => {
        console.log('Error from getAllTodos' + err);
      });
  },
  getLists: function (setDataInStateFunc) {
    this.instance
      .get('/lists')
      .then((res) => {
        setDataInStateFunc(res.data);
      })
      .catch((err) => {
        console.log('Error from getAllLists' + err);
      });
  },
  putTodo: function (id, updatedTodoObj) {
    const { todo, dueDate, completed } = updatedTodoObj;
    todo.replace(/\s+/g, '+');

    // create url query
    let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}`;

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
  applyDummyData: function (setTodosInStateFunc, setListsInStateFunc) {
    this.instance
      .post('/todos/dummy')
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.getTodos(setTodosInStateFunc);
      })
      .catch((err) => {
        console.log(err);
        this.getTodos(setTodosInStateFunc);
      });
    this.instance
      .post('/lists/dummy')
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.getLists(setListsInStateFunc);
      })
      .catch((err) => {
        console.log(err);
        this.getLists(setListsInStateFunc);
      });
  },
  deleteAllData: function (setTodosInStateFunc, setListsInStateFunc) {
    this.instance
      .delete('/todos')
      .then(() => {
        console.log('All todos deleted...');
      })
      .then(() => {
        this.getTodos(setTodosInStateFunc);
      })
      .catch((err) => {
        console.log(err);
        this.getTodos(setTodosInStateFunc);
      });
    this.instance
      .delete('/lists')
      .then(() => {
        console.log('All lists deleted...');
      })
      .then(() => {
        this.getLists(setListsInStateFunc);
      })
      .catch((err) => {
        console.log(err);
        this.getLists(setListsInStateFunc);
      });
  },
  getTodosByList: function (listName) {
    this.instance
      .get(`/lists/${listName}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
