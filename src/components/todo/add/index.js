import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './add-todo.css';

function AddTodo({ handleShowModal }) {
  return (
    <button className="add-button" onClick={handleShowModal}>
      <FiPlus style={{ color: '#ffffff', fontSize: '24px' }} />
    </button>
  );
}

export { AddTodo };
