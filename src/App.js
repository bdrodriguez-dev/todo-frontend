import { useState } from 'react';
import './App.css';
import TodoContainer from './Todo/TodoContainer';
import Modal from './Modal';


function App() {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1 className="h1">This is a todo list app.</h1>
      {showModal && <Modal handleHideModal={hideModalHandler}><div>I'm a modal! :\</div></Modal>}
      <TodoContainer handleShowModal={ showModalHandler } />
    </div>
  );
}

export default App;
