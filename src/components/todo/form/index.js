import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import './todo-form.css';

function TodoForm({ handleAddTodo, handleModalClosing }) {
  const [inputValue, setInputValue] = React.useState();
  const [inputValueError, setInputValueError] = React.useState();

  const handleNewTodoInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
      setInputValueError(true);
      return;
    }

    setInputValueError(false);
    handleAddTodo(inputValue);
  };

  return (
    <React.Fragment>
      <div className="close--container">
        <button className="close" onClick={() => handleModalClosing()}>
          <FiXCircle style={{ color: '#86a2eb', fontSize: '30px' }} />
        </button>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <textarea
          placeholder="What do you want to do?"
          aria-placeholder="What do you want to do?"
          value={inputValue}
          onChange={(event) => handleNewTodoInput(event)}
        ></textarea>
        {!!inputValueError && (
          <div className="error--container">
            <p>Ther's no TODO to add.</p>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </React.Fragment>
  );
}

export { TodoForm };
