import React from 'react';
import './todo-list.css';

function TodoList({ children, handleTodoSearch }) {
  const handleSearchInput = (event) => {
    console.log(event.target.value);
    handleTodoSearch(event.target.value);
  };

  return (
    <section className="list">
      <h3 className="section-header">Today's tasks</h3>
      <input
        type="text"
        placeholder="Find your TODO"
        aria-placeholder="Find your TODO"
        onChange={(event) => handleSearchInput(event)}
      ></input>
      <ul className="todo-list">{children}</ul>
    </section>
  );
}

export { TodoList };
