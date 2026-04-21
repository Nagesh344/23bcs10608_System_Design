const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  cuisine: [{ type: String }],
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  deliveryTime: { type: String, default: '30-45 min' },
  deliveryFee: { type: Number, default: 2.99 },
  minOrder: { type: Number, default: 10 },
  address: { type: String, default: '' },
  isOpen: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
