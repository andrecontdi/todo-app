import React from 'react';

import { Header } from './components/header';
import { TodoStats } from './components/main/todo-stats';
import { TodoList } from './components/main/todo-list';
import { TodoItem } from './components/main/todo-item';
import { AddTodo } from './components/main/add-todo';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, text: 'Daily meeting with team', completed: false },
        { id: 2, text: 'Pay for rent', completed: true },
        { id: 3, text: 'Check emails', completed: false },
        { id: 4, text: 'Lunch with Emma', completed: true },
        { id: 5, text: 'Meditation', completed: false },
        { id: 6, text: 'Beat Thanos', completed: false },
        { id: 7, text: 'Call mom', completed: false },
      ],
      totalTodos: 0,
      completedTodos: 0,
      progressBar: {
        progressBar: '',
        progressBarWitdh: 320,
        progress: 0,
      },
    };
  }

  countingTodos() {
    let totalTodos = this.state.todos.length;
    let completedTodos = this.state.todos.filter((todo) => !!todo.completed).length;

    this.setState({ totalTodos, completedTodos });

    return { totalTodos, completedTodos };
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

  handleProgressBarUpdate() {
    const { totalTodos, completedTodos } = this.countingTodos();
    const progressBar = document.querySelector('.card__progress-bar');
    const progressBarWitdh = progressBar.offsetWidth;
    const progress = (completedTodos * progressBarWitdh) / totalTodos;

    this.setState({ progressBar: { progressBar, progressBarWitdh, progress } });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
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
          <AddTodo />
        </main>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.countingTodos();
    this.handleProgressBarUpdate();

    window.addEventListener('resize', () => this.handleProgressBarUpdate());

    this.handleProgressBarUpdate = this.handleProgressBarUpdate.bind(this);
  }
}

export default App;
