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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const Home = ({ user, signOut }) => {
  // Use signOut instead of onLogout
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskLabel, setTaskLabel] = useState("Personal");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterLabel, setFilterLabel] = useState("All");
  const [filterCompletion, setFilterCompletion] = useState("All");

  const navigate = useNavigate();

  // Add Task function
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
    setTaskPriority("Low");
    setTaskLabel("Personal");
  };

  // Complete Task function
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

  // Delete Task function
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(); // Call signOut instead of onLogout
    navigate("/login");
  };

  // Reset filters to default "All"
  const resetFilters = () => {
    setFilterPriority("All");
    setFilterLabel("All");
    setFilterCompletion("All");
  };

  // Filter tasks based on filter criteria
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesLabel = filterLabel === "All" || task.label === filterLabel;
    const matchesCompletion =
      filterCompletion === "All" ||
      (filterCompletion === "Completed" && task.completed) ||
      (filterCompletion === "Incomplete" && !task.completed);

    return matchesPriority && matchesLabel && matchesCompletion;
  });

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
        {/* Add Task Section */}
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

        {/* Task Filters Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Label</InputLabel>
                <Select
                  value={filterLabel}
                  onChange={(e) => setFilterLabel(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Study">Study</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterCompletion}
                  onChange={(e) => setFilterCompletion(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Incomplete">Incomplete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Reset Filter Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetFilters}
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            Reset Filters
          </Button>

          {/* Display Filtered Tasks */}
          <Typography variant="h5" gutterBottom>
            Your Tasks
          </Typography>
          {filteredTasks.length === 0 ? (
            <Typography>No tasks match the current filter!</Typography>
          ) : (
            filteredTasks.map((task) => (
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
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => completeTask(task.id)}
                      disabled={task.completed}
                      startIcon={<CheckIcon />}
                    >
                      Complete
                    </Button>
                    <IconButton
                      color="secondary"
                      onClick={() => deleteTask(task.id)}
                      style={{ marginLeft: "10px" }}
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
