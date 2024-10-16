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
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Home = ({ user, signOut }) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskLabel, setTaskLabel] = useState("Personal");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterLabel, setFilterLabel] = useState("All");
  const [filterCompletion, setFilterCompletion] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);

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
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("Low");
    setTaskLabel("Personal");
    setEditingTaskId(null);
  };

  // Edit Task function
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setTaskLabel(task.label);
  };

  // Update Task function
  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: taskTitle,
              description: taskDescription,
              priority: taskPriority,
              label: taskLabel,
            }
          : task
      )
    );
    resetForm();
  };

  // Complete Task function
  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: true, // Mark as completed
              completedAt: new Date().toLocaleString(), // Set completion time
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
    signOut();
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
              <Typography variant="h5">
                {editingTaskId ? "Edit Task" : "Add New Task"}
              </Typography>
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
                onClick={editingTaskId ? updateTask : addTask}
                startIcon={<AddIcon />}
                fullWidth
              >
                {editingTaskId ? "Update Task" : "Add Task"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Task Filters Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
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
                variant="contained"
                color="primary"
                onClick={resetFilters}
                startIcon={<AddIcon />} // You can choose to add an icon if desired
                fullWidth
                style={{ marginBottom: "20px" }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          {/* Display Filtered Tasks */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Your Tasks
          </Typography>
          {filteredTasks.length === 0 ? (
            <Typography>No tasks available.</Typography>
          ) : (
            filteredTasks.map(
              (
                task,
                index // Add index here
              ) => (
                <Card
                  key={task.id}
                  style={{
                    marginBottom: "15px",
                    background: task.completed ? "#e0ffe0" : "#fff",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {index + 1}. {task.title} {/* Numbering starts from 1 */}
                      <Chip
                        label={task.priority}
                        color="primary"
                        style={{ marginLeft: "10px" }}
                      />
                      <Chip
                        label={task.label}
                        color="default"
                        style={{ marginLeft: "10px" }}
                      />
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {task.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Added at: {task.addedAt}{" "}
                      {task.completed && `| Completed at: ${task.completedAt}`}
                    </Typography>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton onClick={() => startEditing(task)}>
                        <EditIcon />
                      </IconButton>
                      {task.completed ? (
                        <Button variant="contained" color="success" disabled>
                          Completed
                        </Button>
                      ) : (
                        <IconButton onClick={() => completeTask(task.id)}>
                          <CheckIcon color="primary" />
                        </IconButton>
                      )}
                      <IconButton onClick={() => deleteTask(task.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
