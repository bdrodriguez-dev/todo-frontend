import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8000' });

const ServerHub = (props) => {
  useEffect(() => {
    makeHttpRequest(props.request);
  }, [props.request]);

  const makeHttpRequest = (serverHubRequest) => {
    switch (REQUEST_TYPE) {
      case 'getLists':
        instance
          .get('/todos')
          .then((res) => {
            // console.log(`Hello from .then callback`);
            // get and set todos
            const todos = res.data;
            // console.log(todos);
            // console.log(todos);
            props.updateTodos(todos);
          })
          .catch((err) => {
            console.log(`Error from getLists in ServerHub ${err}`);
          });
        break;
      case 'getTodos':
        instance.get();
        break;
      case 'getTodosByList':
        instance.get();
        break;
      case 'getDummyData':
        instance.get();
        break;
      case 'putList':
        // code
        break;
      case 'putTodo':
        // code
        break;
      case 'postList':
        // code
        break;
      case 'postTodo':
        // code
        break;
      case 'deleteList':
        // this one is a special case because when you delete the list you must either delete associated todos or move them to inbox
        break;
      case 'deleteTodo':
        // code
        break;
      case 'deleteAll':
        // code
        break;
    }
  };
};

export default ServerHub;
