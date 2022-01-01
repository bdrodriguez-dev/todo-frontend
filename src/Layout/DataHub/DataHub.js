import React, { useState, useEffect, useRef } from 'react';
const DataHub = (props) => {
  const [serverHubRequest, setServerHubRequest] = useState({});
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [todosByList, setTodosByList] = useState({});
  const [displayList, setDisplayList] = useState({});

  // ************************ Side Effects ************************

  useEffect(() => {
    // send serverHub request to get todos and lists
    makeServerHubRequest('getLists');
    makeServerHubRequest('getTodos');

    const todosByList = generateTodosByList(todos);
    setTodosByList({ ...todosByList });
    return () => {
      cleanup;
    };
  }, []);

  /**
   * [todos, lists] -> generate todosByList and (init)displayList
   */
  useEffect(() => {
    const todosByList = generateTodosByList(todos);
    setTodosByList({ ...todosByList });
  }, [todos, lists]);

  // ********************** Function Definitions **********************

  /**
   * Makes a ServerHub request -- sets it in state to get picked up by a useEffect that runs whenever there is a new ServerHub request -- which will then trigger an HTTP request in ServerHub
   *
   * @param {string} reqType: type of HTTP request
   * 'getLists' | 'getTodos' | 'getTodosByList' | 'put' | 'post' |
   * @param {object} [reqBody = {}]: put or post reqBody object
   */

  const makeServerHubRequest = (reqType, reqBody = {}) => {
    let reqObj = { type: reqType };

    // If a put or a post add a request body to the request object.
    if (reqType === 'put' || reqType === 'post') {
      reqObj.reqBody = reqBody;
      return setServerHubRequest({ ...reqObj });
    }

    // set serverHubRequest to request object.
    return setServerHubRequest({ ...reqObj });
  };

  /**
   *
   * @param {*} updatedTodosArr
   */

  const updateTodosForDataHub = (updatedTodosArr) => {
    setTodos([...updatedTodosArr]);
  };

  /**
   *
   * @param {*} updatedTodosArr
   */

  const updateListsForDataHub = (updatedListArr) => {
    setLists([...updatedListArr]);
  };

  /**
   *
   * @param {*} todos
   * @returns
   */
  const generateTodosByList = (todos) => {
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
  };

  /**
   *
   * @param {*} todosByList
   * @returns
   */

  const generateInitDisplayList = (todosByList) => {
    const firstKey = Object.keys(todosByList)[0];
    const firstTodos = todosByList[firstKey];
    // console.log(`firstKey: ${firstKey}`);
    // console.log(`firstTodos: ${firstTodos}`);
    const initDisplayList = {
      name: firstKey,
      todos: firstTodos,
    };

    return initDisplayList;
  };

  return (
    <>
      <ServerHub
        request={serverHubRequest}
        updateTodos={updateTodosForDataHub}
        updateLists={updateListsForDataHub}
      />
    </>
  );
};

export default DataHub;
