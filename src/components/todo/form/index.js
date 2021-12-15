import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import './todo-form.css';

function TodoForm({ handleAddTodo, handleShowModal }) {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValueError, setInputValueError] = React.useState(false);

  const handleNewTodoInput = (event) => {
    if (event.target.value) {
      setInputValueError(false);
    }

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
    setInputValue('');
  };

  return (
    <React.Fragment>
      <div className="close--container">
        <button className="close" onClick={() => handleShowModal()}>
          <FiXCircle style={{ color: '#86a2eb', fontSize: '30px' }} />
        </button>
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <textarea
          placeholder="What do you want to do?"
          aria-placeholder="What do you want to do?"
          value={inputValue}
          onChange={(event) => handleNewTodoInput(event)}
          className="todo-text-input"
        ></textarea>
        {!!inputValueError && (
          <div className="error--container">
            <p>Ther's no TODO to add.</p>
          </div>
        )}
        <button type="submit" className="todo-text-button">
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export { TodoForm };
