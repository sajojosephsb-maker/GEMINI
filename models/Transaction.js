const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  lotRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Lot', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['UNPAID', 'PAID'], default: 'UNPAID' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);