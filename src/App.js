import React, { useState, useEffect } from 'react'; 
// Importing component
import AddTodo from './components/AddTodo';  
import TodoList from './components/TodoList';  
import Filter from './components/Filter';  

function App() {
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage 
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];  
  });  
  const [filter, setFilter] = useState('all');  
  // Fetch all todos from the DummyJSON API 
  useEffect(() => {
    // Only fetch from API if there are no todos in local storage
    if (todos.length === 0) {
      fetch('https://dummyjson.com/todos')
        .then((res) => res.json())
        .then((data) => {
          setTodos(data.todos);  
          localStorage.setItem('todos', JSON.stringify(data.todos));  // Save todos to local storage
        })  
        .catch((error) => console.error('Error fetching todos:', error));
    }
  }, [todos.length]);  


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));  // Store todos as a string in local storage
  }, [todos]);  

  const addTodo = (task) => {
    // Adding a new todo via API
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
        setTodos([...todos, newTodo]);  
        // Add the new todo to the state
      });
  };

  const toggleCompletion = (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    
    // updating a todo via API
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
    // deleting a todo via API
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));  
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

  const filteredTodos = getFilteredTodos();  
  // Get the filtered list 

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />  {/* Add new tasks */}
      <Filter filter={filter} setFilter={setFilter} />  {/* Filter tasks */}
      
      <TodoList 
        todos={filteredTodos}  
        toggleCompletion={toggleCompletion}  
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;
