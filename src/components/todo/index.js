import React from 'react';

import { TodoStats } from './stats';
import { TodoList } from './list';
import { TodoItem } from './item';
import { AddTodo } from './add';
import { Modal } from '../modal';
import { TodoForm } from './form';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      totalTodos: 0,
      completedTodos: 0,
      progressBar: {
        progressBar: '',
        progressBarWitdh: 320,
        progress: 0,
      },
      openModal: false,
      searchedTodos: [],
    };

    const localStorageTodos = localStorage.getItem('todos');

    if (localStorageTodos) {
      this.state.todos = JSON.parse(localStorageTodos);
    }

    this.state.searchedTodos = this.state.todos;

    this.handleTodoSearch = this.handleTodoSearch.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleModalClosing = this.handleModalClosing.bind(this);
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

  handleTodoSearch(text) {
    this.setState({
      searchedTodos: [...this.state.todos.filter((todo) => todo.text.toLowerCase().includes(text.toLowerCase()))],
    });
  }

  handleCompleteTodo(todoId) {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...this.state.todos];

    todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;
    this.setState({ todos: todosCopy, searchedTodos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
    });
  }

  handleDeleteTodo(todoId) {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...this.state.todos];

    todosCopy.splice(todoIndex, 1);
    this.setState({ todos: todosCopy, searchedTodos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
    });
  }

  handleAddTodo(text) {
    const todosCopy = [...this.state.todos];
    todosCopy.push({
      text,
      id: todosCopy[todosCopy.length - 1].id + 1,
      completed: false,
    });
    this.setState({ todos: todosCopy, searchedTodos: todosCopy }, () => {
      this.countingTodos();
      this.handleProgressBarUpdate();
      this.handleModalClosing();
    });
  }

  handleModalOpening() {
    this.setState({ openModal: !this.state.openModal });
  }

  handleModalClosing() {
    this.setState({ openModal: false });
  }

  render() {
    return (
      <main>
        <TodoStats
          totalTodos={this.state.totalTodos}
          completedTodos={this.state.completedTodos}
          progressBar={this.state.progressBar}
        />
        <TodoList handleTodoSearch={this.handleTodoSearch}>
          {this.state.searchedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCompleteTodo={() => this.handleCompleteTodo(todo.id)}
              handleDeleteTodo={() => this.handleDeleteTodo(todo.id)}
            />
          ))}
        </TodoList>
        <Modal openModal={this.state.openModal}>
          <TodoForm handleAddTodo={this.handleAddTodo} handleModalClosing={this.handleModalClosing} />
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
