// React imports
import React, { useEffect, useState } from 'react';
import Todos from './List/Todos/Todos';
import Todo from './List/Todos/Todo/Todo';
import List from './List/List';

// Local utility imports
import { apiServices } from '../../services/apiServices';
import { helpers } from './List/Todos/helpers/todoHelpers';

const TodoContainer = (props) => {
  // const [firstListName, setFirstListName] = useState('');
  // const [firstListArray, setFirstListArray] = useState([]);
  // const [isFirstListArraySetInState, setIsFirstListArraySetInState] =
  //   useState(false);

  // useEffect(() => {
  //   const keys = Object.keys(props.todosByList);
  //   const firstKey = keys[0];
  //   setFirstListName(firstKey);
  //   setFirstListArray(props.todosByList[firstKey]);
  //   setIsFirstListArraySetInState(true);
  // }, []);

  return (
    <>
      {/* {props.children} */}
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          displayList: props.displayList,
          setDisplayList: props.setDisplayList,
          lists: props.lists,
          todos: props.todos,
        });
      })}
    </>
  );
};

export default TodoContainer;
