const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://fixit-rho.vercel.app'], // Allow both local and production URLs
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://preethamgshiva2004:ErYObiisPTujmIUV@cluster0.3aopcza.mongodb.net/fixit?retryWrites=true&w=majority&appName=Cluster0';

console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
  });

// Routes
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('FixIt backend running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
