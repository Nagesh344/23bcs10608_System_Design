const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryFee: { type: Number, default: 2.99 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryAddress: {
    street: String,
    city: String,
    zip: String,
  },
  paymentMethod: { type: String, enum: ['cod', 'card'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  estimatedDelivery: { type: String, default: '30-45 min' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
