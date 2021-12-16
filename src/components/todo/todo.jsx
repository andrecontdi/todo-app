import React from 'react';

import { TodoStats } from './stats';
import { TodoList } from './list';
import { TodoItem } from './item';
import { AddTodo } from './add';
import { Modal } from '../modal';
import { TodoForm } from './form';
import { Loader } from '../loader';

function TodoUI({
  showLoader,
  totalTodos,
  completedTodos,
  progress,
  handleSearchTodo,
  searchedTodos,
  handleCompleteTodo,
  handleDeleteTodo,
  showModal,
  handleAddTodo,
  handleShowModal,
}) {
  return (
    <main>
      <Loader showLoader={showLoader} />
      <TodoStats totalTodos={totalTodos} completedTodos={completedTodos} progress={progress} />
      <TodoList handleSearchTodo={handleSearchTodo}>
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

export { TodoUI };
