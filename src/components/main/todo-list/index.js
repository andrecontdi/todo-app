import React from "react";
import { TodoItem } from "./todo-item";
import './todo-list.css'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, text: 'Daily meeting with team', completed: false},
                {id: 2, text: 'Pay for rent', completed: true},
                {id: 3, text: 'Check emails', completed: false},
                {id: 4, text: 'Lunch with Emma', completed: true},
                {id: 5, text: 'Meditation', completed: false},
                {id: 6, text: 'Beat Thanos', completed: false},
                {id: 7, text: 'Call mom', completed: false},
            ]
        }
    }

    handleCompleteTodo(todoId) {
        const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
        const todosCopy = [...this.state.todos]
        todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;
        this.setState({todos: todosCopy})

    }

    handleDeleteTodo(todoId) {
        const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
        const todosCopy = [...this.state.todos]
        todosCopy.splice(todoIndex,1)
        this.setState({ todos: todosCopy })
    }

    render() {
        return (
            <section>
                <h3 className="section-header">Today's tasks</h3>
                <ul className="todo-list"> { 
                    this.state.todos.map((todo) => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo}
                            handleCompleteTodo={() => this.handleCompleteTodo(todo.id)}
                            handleDeleteTodo={() => this.handleDeleteTodo(todo.id)}
                        />
                    ))} 
                </ul>
            </section>
        )
    }
}

export { TodoList }