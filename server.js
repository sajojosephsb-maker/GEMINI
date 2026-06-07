require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
// Root Route: Welcome Dashboard Page
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h1 style="color: #2c3e50;">🌶️ Spice Auction Central Gate Engine</h1>
      <p style="color: #7f8c8d; font-size: 18px;">Unified System Database & WebSockets Layer is Operational.</p>
      <div style="background: #f8f9fa; display: inline-block; padding: 15px 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px;">
        <strong>Status:</strong> <span style="color: #27ae60;">● Online</span>
      </div>
    </div>
  `);
});
// Central Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to Centralized Spice Auction DB!'))
  .catch(err => console.error('Database connection error:', err));

// Automatically seed Master Admin account on database connection success
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ email: 'admin@puttady' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('1234', 10);
      await User.create({
        email: 'admin@puttady',
        password: hashedPassword,
        role: 'ADMIN',
        name: 'Master Puttady Admin'
      });
      console.log('➔ Master Admin database footprint initialized (admin@puttady)');
    }
  } catch (err) {
    console.error('Admin seeding failed:', err);
  }
}

// Call seed inside the mongoose connection resolution block
mongoose.connection.once('open', () => seedAdmin());

// Test Endpoint to confirm online status
app.get('/api/status', (req, res) => {
  res.json({ status: "Unified Engine Online", timestamp: new Date() });
});

io.on('connection', (socket) => {
  console.log('Live Display Terminal Connected: ', socket.id);
});

const PORT = 8090;
server.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`Unified Engine Running on Port ${PORT}`);
  console.log(`=============================================`);
});