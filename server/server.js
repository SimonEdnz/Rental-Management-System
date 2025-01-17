const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const roomRoutes = require('./routes/roomRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const revenueRoutes = require('./routes/revenueRoutes');

const app = express();
app.use('/api/users', userRoutes); 
app.use('/api/branches', branchRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/revenues', revenueRoutes);


app.use(express.json()); // For parsing application/json
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
