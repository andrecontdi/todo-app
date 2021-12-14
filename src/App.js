import React from 'react';
import { Header } from './components/header';
import { Todo } from './components/todo';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Todo />
    </React.Fragment>
  );
}

export default App;
