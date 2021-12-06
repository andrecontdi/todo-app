import React from "react";
import { FiPlus } from 'react-icons/fi';
import './add-todo.css'

function AddTodo() {
    return (
        <button className="add-button"><FiPlus style={{color: '#ffffff', fontSize: '24px'}}/></button>
    )
}

export { AddTodo }