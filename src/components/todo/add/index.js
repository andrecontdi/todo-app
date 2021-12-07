import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './add-todo.css';

function AddTodo({ handleModalOpening }) {
  return (
    <button className="add-button" onClick={handleModalOpening}>
      <FiPlus style={{ color: '#ffffff', fontSize: '24px' }} />
    </button>
  );
}

export { AddTodo };
