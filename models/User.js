const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['ADMIN', 'TRADER', 'QUALITY', 'AUDIT', 'AUCTIONEER', 'LIVE', 'PLANTER', 'DEALER', 'POOLING_CENTER'],
    required: true 
  },
  name: String,
  crSblRegistration: String, // For Planters/Dealers
  gstIdentifier: String,      // For Audit/Finance
  tableNo: Number,            // For Traders
  walletBalance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);