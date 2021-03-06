import React from 'react';
import './todo-list.css';

function TodoList({ children, handleSearchTodo }) {
  const handleSearchInput = (event) => {
    handleSearchTodo(event.target.value);
  };

  return (
    <section>
      <h3 className="section-header">Todos</h3>
      <input
        type="text"
        placeholder="Find your TODO"
        aria-placeholder="Find your TODO"
        onChange={(event) => handleSearchInput(event)}
        className="todo-app-input"
      ></input>
      <ul className="todo-list">{children}</ul>
    </section>
  );
}

export { TodoList };
