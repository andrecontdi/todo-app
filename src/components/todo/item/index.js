import React from 'react';
import { FiTrash } from 'react-icons/fi';
import './todo-item.css';

function TodoItem({ todo, handleCompleteTodo, handleDeleteTodo }) {
  return (
    <li className="todo-list__item">
      <div className="todo-list__container">
        <div className="checkbox--round">
          <input type="checkbox" id={`checkbox-${todo.id}`} checked={todo.completed} onChange={handleCompleteTodo} />
          <label htmlFor={`checkbox-${todo.id}`}></label>
        </div>
        <div className="todo-text--container">
          <p className="todo-text">{todo.text}</p>
        </div>
        <button className="delete-button">
          <FiTrash style={{ color: '#86a2eb', fontSize: '20px' }} onClick={handleDeleteTodo} />
        </button>
      </div>
    </li>
  );
}

export { TodoItem };
