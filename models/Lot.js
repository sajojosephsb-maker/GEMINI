const mongoose = require('mongoose');

const lotSchema = new mongoose.Schema({
  lotNo: { type: String, required: true, unique: true },
  planterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  poolCenter: String,
  noOfBags: Number,
  qtyKg: Number,
  litreWt: Number, 
  moisture: Number,
  status: { type: String, enum: ['PENDING', 'QUALITY_CHECK', 'LIVE', 'SOLD', 'WITHDRAWN'], default: 'PENDING' },
  qualityFlags: {
    suspect: { type: Boolean, default: false },
    colored: { type: Boolean, default: false }
  },
  finalRate: Number,
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Lot', lotSchema);