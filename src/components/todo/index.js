import React from 'react';

import { TodoStats } from './stats';
import { TodoList } from './list';
import { TodoItem } from './item';
import { AddTodo } from './add';
import { Modal } from '../modal';
import { TodoForm } from './form';

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ];
}


function Todo() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);

  let searchedTodos = []
  let totalTodos = todos.length;
  let completedTodos = todos.filter((todo) => !!todo.completed).length;

  if (!searchValue) {
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchValue.toLowerCase()));
  }

  const handleProgressBarUpdate = React.useCallback(() => {
    const progressBar = document.querySelector('.card__progress-bar');
    const progressBarWitdh = progressBar.offsetWidth;
    const progress = (completedTodos * progressBarWitdh) / totalTodos;

    setProgress(progress);
  }, [totalTodos, completedTodos]);


  React.useEffect(() => {
    window.addEventListener('resize', handleProgressBarUpdate);
  }, [handleProgressBarUpdate]);

  // As callback for useState
  React.useEffect(() => handleProgressBarUpdate(), [handleProgressBarUpdate])

  const saveTodos = (todos) => {
    setTodos(todos);
    handleProgressBarUpdate();
  };

  const handleCompleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...todos];

    todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;

    saveTodos(todosCopy);
  };

  const handleDeleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...todos];

    todosCopy.splice(todoIndex, 1);

    saveTodos(todosCopy);
  };

  const handleAddTodo = (text) => {
    const todosCopy = [...todos];

    todosCopy.push({
      text,
      id: Math.floor(Math.random() * 1000),
      completed: false,
    });

    saveTodos(todosCopy);

    handleShowModal();
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <main>
      <TodoStats totalTodos={totalTodos} completedTodos={completedTodos} progress={progress} />
      <TodoList setSearchValue={setSearchValue}>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCompleteTodo={() => handleCompleteTodo(todo.id)}
            handleDeleteTodo={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </TodoList>
      <Modal openModal={showModal}>
        <TodoForm handleAddTodo={handleAddTodo} handleShowModal={handleShowModal} />
      </Modal>
      <AddTodo handleShowModal={() => handleShowModal()} />
    </main>
  );
}

export { Todo };
