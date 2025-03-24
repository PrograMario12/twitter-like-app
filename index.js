// Import required modules and files
const express = require('express');
const app = express();
const router = require('./routes/postsRoutes')
const port = process.env.PORT || 3000

// Middleware for JSON parsing
app.use(express.json())

// Route setup
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
