import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const Home = ({ user, signOut }) => {
  // Change onLogout to signOut
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskLabel, setTaskLabel] = useState("Personal");
  const navigate = useNavigate();

  const addTask = () => {
    if (!taskTitle) return;

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      label: taskLabel,
      addedAt: new Date().toLocaleString(),
      completedAt: null,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskLabel("Personal");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: true,
              completedAt: new Date().toLocaleString(),
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
    signOut(); // Call signOut instead of onLogout
    navigate("/login");
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Typography variant="h6">
            Welcome, {user.signInDetails.loginId}!
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Add New Task</Typography>
              <TextField
                label="Task Title"
                fullWidth
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Task Description"
                fullWidth
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Priority"
                fullWidth
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                select
                SelectProps={{ native: true }}
                style={{ marginBottom: "15px" }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </TextField>
              <TextField
                label="Label"
                fullWidth
                value={taskLabel}
                onChange={(e) => setTaskLabel(e.target.value)}
                select
                SelectProps={{ native: true }}
                style={{ marginBottom: "15px" }}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Others">Others</option>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={addTask}
                startIcon={<AddIcon />}
                fullWidth
              >
                Add Task
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Your Tasks
          </Typography>
          {tasks.length === 0 ? (
            <Typography>No tasks added yet!</Typography>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} style={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="h6">
                    {task.id}. {task.title}
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={task.priority}
                      style={{
                        marginRight: "10px",
                        backgroundColor:
                          task.priority === "High"
                            ? "#f44336"
                            : task.priority === "Medium"
                            ? "#ff9800"
                            : "#4caf50",
                        color: "#fff",
                      }}
                    />
                    <Chip
                      label={task.label}
                      style={{
                        backgroundColor: "#2196f3",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    {task.description}
                  </Typography>
                  <Typography variant="caption">
                    Added on: {task.addedAt} &nbsp;
                  </Typography>
                  {task.completed && (
                    <Typography variant="caption" color="primary">
                      Completed on: {task.completedAt}
                    </Typography>
                  )}
                  <div>
                    {!task.completed && (
                      <IconButton
                        color="primary"
                        onClick={() => completeTask(task.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="secondary"
                      onClick={() => deleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
