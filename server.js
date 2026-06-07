require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Production Middleware
app.use(cors());
app.use(express.json());

// Root Health Check Endpoint
app.get('/', (req, res) => {
    res.json({ status: "healthy", message: "Spice Auction Central Engine Live" });
});

// Database Connection Hook
const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\s+/g, '') : '';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas Cluster"))
    .catch(err => console.error("❌ MongoDB connection failure:", err));

// Dynamic Port Binding Listener
app.listen(PORT, () => console.log(`🚀 Unified Server running cleanly on port ${PORT}`));