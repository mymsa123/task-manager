import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 10px;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
`;

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setTasks([...tasks, data]);
    reset();
  };

  const onDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login status
  };

  const handleTaskSubmit = (data) => {
    if (isLoggedIn) {
      onSubmit(data);
    } else {
      alert('Please login to add a task.');
    }
  };

  return (
    <Container>
      <Navbar>
        <NavTitle>Task Manager</NavTitle>
        <div>
          {/* Conditionally render login/logout button */}
          {isLoggedIn ? (
            <Button onClick={handleLogin}>Logout</Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </div>
      </Navbar>
      {/* Only show task form if user is logged in */}
      {isLoggedIn && (
        <TaskForm onSubmit={handleSubmit(handleTaskSubmit)}>
          <Input type="text" placeholder="Title" {...register("title", { required: true })} />
          {errors.title && <span>Title is required</span>}
          <Input type="text" placeholder="Description" {...register("description", { required: true })} />
          {errors.description && <span>Description is required</span>}
          <Button type="submit">Add Task</Button>
        </TaskForm>
      )}
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <Button onClick={() => onDelete(index)}>Delete</Button>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default App;
