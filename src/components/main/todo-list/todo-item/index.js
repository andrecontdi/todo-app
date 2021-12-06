import React from "react";
import './todo-item.css';

function TodoItem({ todo }) {
    const handleChecked = () => {
        console.log(' Completed todo:', todo.id)
    }

    return (
        <li className="todo-list__item">
            <div className="checkbox--round">
                <input type="checkbox" id={`checkbox-${todo.id}`} checked={todo.completed} onChange={handleChecked}/>
                <label htmlFor={`checkbox-${todo.id}`}></label>
            </div>
            <p className="todo-list__item--text">{todo.text}</p>
        </li>
    )
}

export { TodoItem }