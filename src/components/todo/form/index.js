import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import './todo-form.css';

function TodoForm() {
  return (
    <React.Fragment>
      <div className="close--container">
        <button className="close">
          <FiXCircle style={{ color: '#86a2eb', fontSize: '30px' }} />
        </button>
      </div>
      <form>
        <textarea placeholder="What do you want to do?" aria-placeholder="What do you want to do?"></textarea>
        <button>Save</button>
      </form>
    </React.Fragment>
  );
}

export { TodoForm };
