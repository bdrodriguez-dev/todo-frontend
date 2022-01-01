import axios from 'axios';

export const apiServices = {
  // URL: 'http://localhost:8000/todos',
  instance: axios.create({ baseURL: 'http://localhost:8000' }),
  generateTodosByList: function (todos) {
    let todosByListObj = {};

    todos.forEach((todo) => {
      const assignedList = todo.list;

      // if the listname is already a key in todosByListObj
      if (assignedList in todosByListObj) {
        // push the todo to that already existing listArray
        todosByListObj[assignedList].push(todo);
      } else {
        // create the listArray
        todosByListObj[assignedList] = [];
        // then push it to the list Array
        todosByListObj[assignedList].push(todo);
      }
    });

    return todosByListObj;
  },
  generateInitDisplayList: function (todosByList) {
    const firstKey = Object.keys(todosByList)[0];
    const firstTodos = todosByList[firstKey];
    // console.log(`firstKey: ${firstKey}`);
    // console.log(`firstTodos: ${firstTodos}`);
    const initDisplayList = {
      name: firstKey,
      todos: firstTodos,
    };

    return initDisplayList;
  },
  getTodos: function (setTodos, setTodosByList = '', setDisplayList = '') {
    this.instance
      .get('/todos')
      .then((res) => {
        // console.log(`Hello from .then callback`);
        // get and set todos
        const todos = res.data;
        // console.log(todos);
        // console.log(todos);
        setTodos([...todos]);

        if (setTodosByList !== '') {
          //get and set todosByList
          const todosByList = this.generateTodosByList(todos);
          // console.log(todosByList);
          setTodosByList({ ...todosByList });

          // get and set initDisplayList
          const initDisplayList = this.generateInitDisplayList(todosByList);
          // console.log(initDisplayList);
          setDisplayList({ ...initDisplayList });
        }
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
    const { todo, dueDate, completed, list } = updatedTodoObj;
    // console.log(JSON.stringify(updatedTodoObj));
    todo.replace(/\s+/g, '+');

    // create url query
    let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}&list=${list}`;

    this.instance.put(`/todos/${id}${query}`).catch((err) => {
      console.log(err);
    });
  },
  postTodo: function (createdTodoObj) {
    const { todo, dueDate, completed, list } = createdTodoObj;
    todo.replace(/\s+/g, '+');

    // create url query
    let query = `?todo=${todo}&dueDate=${dueDate}&completed=${completed}&list=${list}`;

    this.instance.post(`/todos${query}`).catch((err) => {
      console.log(err);
    });
  },
  deleteTodo: function (id, setTodos) {
    console.log('http://localhost:8000/todos' + '/' + id);
    this.instance
      .delete('/todos/' + id)
      .then(() => {
        this.getTodos(setTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteList: function (id, setLists) {
    console.log('http://localhost:8000/lists' + '/' + id);
    this.instance
      .delete('/todos/' + id)
      .then(() => {
        this.getLists(setLists);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  applyDummyData: function (
    setTodos,
    setLists,
    setTodosByList = '',
    setDisplayList = ''
  ) {
    this.instance
      .get('/todos/dummy')
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.getTodos(setTodos, setTodosByList, setDisplayList);
      })
      .catch((err) => {
        console.log(err);
        this.getTodos(setTodos, setTodosByList, setDisplayList);
      });
    this.instance
      .post('/lists/dummy')
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.getLists(setLists);
      })
      .catch((err) => {
        console.log(err);
        this.getLists(setLists);
      });
  },
  deleteAllData: function (setTodos, setLists, setTodosByList, setDisplayList) {
    this.instance
      .delete('/todos')
      .then(() => {
        console.log('All todos deleted...');
      })
      .then(() => {
        this.getTodos(setTodos);
      })
      .catch((err) => {
        console.log(err);
        this.getTodos(setTodos);
      });
    this.instance
      .delete('/lists')
      .then(() => {
        console.log('All lists deleted...');
      })
      .then(() => {
        this.getLists(setLists);
      })
      .catch((err) => {
        console.log(err);
        this.getLists(setLists);
      });

    //set setTodosByList
    setTodosByList({});

    // setDisplayList
    setDisplayList({});
  },
};
