import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents the page from refreshing
    if (!task.trim()) return;  // Avoid adding empty tasks
    addTodo(task);  // Calls the addTodo function passed as a prop
    setTask('');  // Clears the input field after adding the task
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}  // Updates the task as the user types
        placeholder="Add new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodo;
