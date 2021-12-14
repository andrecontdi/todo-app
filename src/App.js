import React from 'react';
import { Header } from './components/header';
import { Todo } from './components/todo';

import './App.css';

function App() {
  localStorage.setItem(
    'todos',
    JSON.stringify([
      { id: 1, text: 'Daily meeting with team', completed: false },
      { id: 2, text: 'Pay for rent', completed: true },
      { id: 3, text: 'Check emails', completed: false },
    ])
  );

  return (
    <React.Fragment>
      <Header />
      <Todo />
    </React.Fragment>
  );
}

export default App;
