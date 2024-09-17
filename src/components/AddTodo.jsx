import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  
    if (!task.trim()) return;  
    addTodo(task);  
    setTask('');  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}  
        placeholder="Add new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodo;
