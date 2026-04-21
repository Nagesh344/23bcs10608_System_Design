const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { protect, adminOnly } = require('../middleware/auth');

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, featured } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (cuisine) query.cuisine = { $in: [cuisine] };
    if (featured) query.featured = true;
    const restaurants = await Restaurant.find(query).sort({ rating: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create restaurant (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update restaurant (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE restaurant (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
