const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', require('./routes/userRoutes'));       // profile, password
app.use('/api/orders', require('./routes/orderRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('✅ Server running on http://localhost:5000')))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
