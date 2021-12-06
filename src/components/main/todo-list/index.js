import React from "react";
import { TodoItem } from "./todo-item";
import './todo-list.css'

function TodoList() {
    const todos = [
        {id: 1, text: 'Daily meeting with team', completed: false},
        {id: 2, text: 'Pay for rent', completed: true},
        {id: 3, text: 'Check emails', completed: false},
        {id: 4, text: 'Lunch with Emma', completed: true},
        {id: 5, text: 'Meditation', completed: false},
        {id: 6, text: 'Beat Thanos', completed: false},
        {id: 7, text: 'Call mom', completed: false},
    ]

    return (
        <section>
            <h3 className="section-header">Today's tasks</h3>
            <ul className="todo-list"> { 
                todos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo}
                    />
                ))} 
            </ul>
        </section>
    )
}

export { TodoList }