const express = require('express');
const app = express();

//json
app.use(express.json());

//cors (optional, adjust as needed)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to specific origin if needed
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Example API endpoint (replace with your own logic)
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// Implement your user management logic here (without Prisma)
// This is just an example, you'll need to replace it with your chosen data access method

let users = [  // Replace this with your data storage solution (e.g., database, file system)
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
];

// Get all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create user (replace with your logic to store the user)
app.post('/users', (req, res) => {
  const newUser = req.body;
  // Implement logic to validate and store the new user in your data source
  // Assign a unique ID (if not already provided)
  newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user (replace with your logic to update the user data)
app.put('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const updatedUser = req.body;
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    // Implement logic to update user data in your chosen data storage
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete user (replace with your logic to delete the user data)
app.delete('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    // Implement logic to delete user data in your chosen data storage
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
