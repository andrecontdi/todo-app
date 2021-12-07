import React from "react";
import "./todo-list.css";

function TodoList({ children }) {
  return (
    <section>
      <h3 className="section-header">Today's tasks</h3>
      <ul className="todo-list">
        { children }
      </ul>
    </section>
  );
}

export { TodoList };

/* {
  todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      handleCompleteTodo={() => handleCompleteTodo(todo.id)}
      handleDeleteTodo={() => handleDeleteTodo(todo.id)}
    />
  ));
} */