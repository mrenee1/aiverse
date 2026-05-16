const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const axios = require('axios');

// Get all tools with pagination, filtering, and sorting
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const {
      category,
      search,
      sortBy = 'popularity',
      sortOrder = 'desc',
      featured,
      deals
    } = req.query;

    // Build query
    let query = { approved: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (deals === 'true') {
      query.deals = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tools = await Tool.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('submittedBy', 'username');

    const total = await Tool.countDocuments(query);

    res.json({
      tools,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('submittedBy', 'username');
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Tool.distinct('category');
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Tool.countDocuments({ category, approved: true });
        return { category, count };
      })
    );
    
    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured tools
router.get('/featured/list', async (req, res) => {
  try {
    const tools = await Tool.find({ featured: true, approved: true })
      .sort({ popularity: -1 })
      .limit(6)
      .populate('submittedBy', 'username');
    
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product of the day
router.get('/product-of-the-day/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Simple rotation based on date
    const totalTools = await Tool.countDocuments({ approved: true });
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const skipIndex = dayOfYear % totalTools;
    
    const tool = await Tool.findOne({ approved: true })
      .sort({ popularity: -1 })
      .skip(skipIndex)
      .populate('submittedBy', 'username');
    
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search tools
router.get('/search/query', async (req, res) => {
  try {
    const { q, category, page = 1, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const skip = (page - 1) * limit;
    
    let query = { 
      $text: { $search: q },
      approved: true
    };
    
    if (category) {
      query.category = category;
    }

    const tools = await Tool.find(query)
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('submittedBy', 'username');

    const total = await Tool.countDocuments(query);

    res.json({
      tools,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      query: q
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
