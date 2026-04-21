const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET cart
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.menuItem');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const existing = user.cart.find(i => i.menuItem.toString() === menuItemId);
    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      user.cart.push({ menuItem: menuItemId, quantity: quantity || 1 });
    }
    await user.save();
    const updated = await User.findById(req.user._id).populate('cart.menuItem');
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update cart item quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find(i => i.menuItem.toString() === menuItemId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    if (quantity <= 0) {
      user.cart = user.cart.filter(i => i.menuItem.toString() !== menuItemId);
    } else {
      item.quantity = quantity;
    }
    await user.save();
    const updated = await User.findById(req.user._id).populate('cart.menuItem');
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove from cart
router.delete('/remove/:menuItemId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.menuItem.toString() !== req.params.menuItemId);
    await user.save();
    const updated = await User.findById(req.user._id).populate('cart.menuItem');
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
