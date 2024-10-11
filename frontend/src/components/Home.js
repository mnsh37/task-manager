// src/components/Home.js
import React, { useState } from "react";

function Home({ user }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskLabel, setTaskLabel] = useState("Personal");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      label: taskLabel,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
    // Reset input fields
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("Medium");
    setTaskLabel("Personal");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const markTaskComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completedAt: new Date().toISOString() };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Your Task List</h2>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={taskLabel}
          onChange={(e) => setTaskLabel(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>
              {index + 1}. {task.title} (Priority: {task.priority}, Label:{" "}
              {task.label})
            </h3>
            <p>{task.description}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            {task.completedAt && (
              <p>Completed At: {new Date(task.completedAt).toLocaleString()}</p>
            )}
            <button onClick={() => markTaskComplete(index)}>Complete</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
