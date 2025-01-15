const express = require('express');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();

app.use(express.json()); // For parsing application/json
app.use('/api/users', userRoutes); 
app.use('/api/branches', branchRoutes);
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
