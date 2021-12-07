import React from 'react';

import { TodoStats } from './stats';
import { TodoList } from './list';
import { TodoItem } from './item';
import { AddTodo } from './add';
import { Modal } from "../modal";
import { TodoForm } from './form';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, text: 'Daily meeting with team', completed: false },
        { id: 2, text: 'Pay for rent', completed: true },
        { id: 3, text: 'Check emails', completed: false },
      ],
      totalTodos: 0,
      completedTodos: 0,
      progressBar: {
        progressBar: '',
        progressBarWitdh: 320,
        progress: 0,
      },
      openModal: false,
    };
  }

  handleModalOpening() {
    this.setState({ openModal: !this.state.openModal });
  }

  countingTodos() {
    let totalTodos = this.state.todos.length;
    let completedTodos = this.state.todos.filter((todo) => !!todo.completed).length;

    this.setState({ totalTodos, completedTodos });

    return { totalTodos, completedTodos };
  }

  handleProgressBarUpdate() {
    const { totalTodos, completedTodos } = this.countingTodos();
    const progressBar = document.querySelector('.card__progress-bar');
    const progressBarWitdh = progressBar.offsetWidth;
    const progress = (completedTodos * progressBarWitdh) / totalTodos;

    this.setState({ progressBar: { progressBar, progressBarWitdh, progress } });
  }

  handleCompleteTodo(todoId) {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...this.state.todos];

    todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;
    this.setState({ todos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
    });
  }

  handleDeleteTodo(todoId) {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...this.state.todos];

    todosCopy.splice(todoIndex, 1);
    this.setState({ todos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
    });
  }

  /*   handleAddTodo(text) {
    const todosCopy = [...this.state.todos];
    todosCopy.push({ 
      text,
      id: todosCopy[todosCopy.length - 1].id + 1, 
      completed: false 
    })

    this.setState({ todos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
    });
  } */

  render() {
    return (
      <main>
        <TodoStats
          totalTodos={this.state.totalTodos}
          completedTodos={this.state.completedTodos}
          progressBar={this.state.progressBar}
        />
        <TodoList>
          {this.state.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCompleteTodo={() => this.handleCompleteTodo(todo.id)}
              handleDeleteTodo={() => this.handleDeleteTodo(todo.id)}
            />
          ))}
        </TodoList>
        <Modal openModal={this.state.openModal}>
          <TodoForm />
        </Modal>
        <AddTodo handleModalOpening={() => this.handleModalOpening()} />
      </main>
    );
  }

  componentDidMount() {
    this.countingTodos();
    this.handleProgressBarUpdate();

    window.addEventListener('resize', () => this.handleProgressBarUpdate());

    this.handleProgressBarUpdate = this.handleProgressBarUpdate.bind(this);
  }
}

export { Todo };
