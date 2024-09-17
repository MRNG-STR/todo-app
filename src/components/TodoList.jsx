import React from 'react';

const TodoList = ({ todos, toggleCompletion, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => toggleCompletion(todo.id)}  
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.todo}  {/* Displaying the task */}
          <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>Delete</button>  {/* Delete task */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
