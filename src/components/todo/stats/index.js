import React from 'react';
import './todo-stats.css';

function TodoStats({ totalTodos, completedTodos, progressBar }) {
  return (
    <section className="stats-container">
      <h3 className="section-header">COMPLETED</h3>
      <div className="card">
        <h3 className="card__header">{totalTodos} todos</h3>
        <p className="card__content">{completedTodos} Completed</p>
        <div className="card__progress-bar">
          <div className="card__progress-bar--bar" style={{ width: progressBar.progress }}></div>
        </div>
      </div>
    </section>
  );
}

export { TodoStats };
