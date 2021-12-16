import React from 'react';
import { TodoUI } from './todo';

const LOCALSTORAGE_ITEM = 'todos';

const initialState = {
  todos: [],
  searchValue: '',
  progress: 0,
  showModal: false,
  showLoader: true,
};

const actionTypes = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SEARCH: 'SEARCH',
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  PROGRESS: 'PROGRESS',
  MODAL: 'MODAL',
};

const reducerObject = (state, payload) => ({
  [actionTypes.SUCCESS]: {
    ...state,
    todos: payload,
    showLoader: false,
  },
  [actionTypes.SEARCH]: {
    ...state,
    searchValue: payload,
  },
  [actionTypes.UPDATE]: {
    ...state,
    todos: payload,
  },
  [actionTypes.add]: {
    ...state,
    todos: payload,
    showModal: false,
  },
  [actionTypes.PROGRESS]: {
    ...state,
    progress: payload,
  },
  [actionTypes.MODAL]: {
    ...state,
    showModal: !state.showModal,
  },
});

const reducer = (state, action) => reducerObject(state, action.payload)[action.type] || state;

function Todo() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { todos, searchValue, progress, showModal, showLoader } = state;

  React.useEffect(() => {
    setTimeout(() => {
      const localStorageItem = localStorage.getItem(LOCALSTORAGE_ITEM);
      let parsedItem;

      if (!localStorageItem) {
        localStorage.setItem(LOCALSTORAGE_ITEM, JSON.stringify([]));
        parsedItem = [];
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      dispatch({ type: actionTypes.SUCCESS, payload: parsedItem });
    }, 2500);
  }, []);

  let searchedTodos = [];
  let totalTodos = todos.length;
  let completedTodos = todos.filter((todo) => !!todo.completed).length;

  if (!searchValue) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchValue.toLowerCase()));
  }

  const handleProgressBarUpdate = React.useCallback(() => {
    const progressBar = document.querySelector('.card__progress-bar');
    const progressBarWitdh = progressBar.offsetWidth || 0;
    const progress = (completedTodos * progressBarWitdh) / totalTodos || 0;

    dispatch({ type: actionTypes.PROGRESS, payload: progress });
    // setProgress(progress);
  }, [totalTodos, completedTodos]);

  React.useEffect(() => {
    window.addEventListener('resize', handleProgressBarUpdate);
  }, [handleProgressBarUpdate]);

  // As callback for useState
  React.useEffect(() => handleProgressBarUpdate(), [totalTodos, completedTodos, handleProgressBarUpdate]);

  const saveTodos = (todos) => {
    const stringifiedItem = JSON.stringify(todos);
    localStorage.setItem(LOCALSTORAGE_ITEM, stringifiedItem);
    dispatch({ type: actionTypes.UPDATE, payload: todos });
    handleProgressBarUpdate();
  };

  const handleCompleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...todos];

    todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;

    saveTodos(todosCopy);
  };

  const handleSearchTodo = (todo) => {
    dispatch({ type: actionTypes.SEARCH, payload: todo });
  };

  const handleDeleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todosCopy = [...todos];

    todosCopy.splice(todoIndex, 1);

    saveTodos(todosCopy);
  };

  const handleShowModal = () => {
    dispatch({ type: actionTypes.MODAL });
  };

  const handleAddTodo = (text) => {
    const todosCopy = [...todos];

    todosCopy.push({
      text,
      id: Math.floor(Math.random() * 1000),
      completed: false,
    });

    dispatch({ type: actionTypes.add, payload: todosCopy });
  };

  return (
    <TodoUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchedTodos={searchedTodos}
      progress={progress}
      showLoader={showLoader}
      showModal={showModal}
      handleSearchTodo={handleSearchTodo}
      handleCompleteTodo={handleCompleteTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleAddTodo={handleAddTodo}
      handleShowModal={handleShowModal}
    />
  );
}

export { Todo };
