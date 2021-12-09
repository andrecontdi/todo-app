import React from 'react';
import './todo-list.css';

function TodoList({ children }) {
  return (
    <section className="list-container">
      <h3 className="section-header">Today's tasks</h3>
      <ul className="todo-list">{children}</ul>
    </section>
  );
}

export { TodoList };
