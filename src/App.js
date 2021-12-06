import React from 'react';

import { Header } from './components/header';
import { TodoStats } from './components/main/todo-stats';
import { TodoList } from './components/main/todo-list';
import { AddTodo } from './components/main/add-todo';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <TodoStats />
        <TodoList />
        <AddTodo />
      </main>
    </React.Fragment>
  );
}

export default App;
