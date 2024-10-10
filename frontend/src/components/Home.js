// src/components/Home.js
import React, { useState } from 'react';

function Home({ user }) {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <h2>Your Task List</h2>
      {/* Add task management UI here */}
    </div>
  );
}

export default Home;
