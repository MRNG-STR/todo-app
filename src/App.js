import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';  // Importing AddTodo component
import TodoList from './components/TodoList';  // Importing TodoList component
import Filter from './components/Filter';  // Importing Filter component

function App() {
  const [todos, setTodos] = useState([]);  // State for all todos
  const [filter, setFilter] = useState('all');  // State to handle the current filter selection

  // Fetch all todos from the DummyJSON API when the component mounts
  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data.todos))  // Set the todos from the response
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = (task) => {
    // Simulating adding a new todo via API
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: task,
        completed: false,
        userId: 5,
      }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);  // Add the new todo to the state
      });
  };

  const toggleCompletion = (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    
    // Simulating updating a todo via API
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',  // Use PUT to update
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: !todoToUpdate.completed,
      }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => 
            todo.id === id ? updatedTodo : todo
          )
        );
      });
  };

  const deleteTodo = (id) => {
    // Simulating deleting a todo via API
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));  // Remove the todo from the state
      });
  };

  const getFilteredTodos = () => {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    if (filter === 'pending') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  };

  const filteredTodos = getFilteredTodos();  // Get the filtered list of todos

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />  {/* Add new tasks */}
      <Filter filter={filter} setFilter={setFilter} />  {/* Filter tasks */}
      
      <TodoList 
        todos={filteredTodos}  // Pass the filtered todos to the TodoList
        toggleCompletion={toggleCompletion}  // Pass toggle function
        deleteTodo={deleteTodo}  // Pass delete function
      />
    </div>
  );
}

export default App;
