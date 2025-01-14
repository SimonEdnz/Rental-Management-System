const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json()); // For parsing application/json
app.use('/api/users', userRoutes); // Register routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
