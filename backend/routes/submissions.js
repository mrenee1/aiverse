const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Tool = require('../models/Tool');
const User = require('../models/User');
const Joi = require('joi');
const axios = require('axios');

// Validation schema
const submissionSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  website: Joi.string().uri().required().trim(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string().trim()).optional()
});

// Tool submissions are now open to everyone
// No authentication required

// Helper function to extract domain from URL
const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (error) {
    return null;
  }
};

// Helper function to get logo from Clearbit
const getLogo = async (domain) => {
  try {
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    // Test if logo exists by making a HEAD request
    const response = await axios.head(logoUrl, { timeout: 5000 });
    return response.status === 200 ? logoUrl : null;
  } catch (error) {
    return null;
  }
};

// Helper function to get screenshot from Thum.io
const getScreenshot = async (url) => {
  try {
    const screenshotUrl = `https://image.thum.io/get/fullpage/${encodeURIComponent(url)}`;
    // Test if screenshot exists by making a HEAD request
    const response = await axios.head(screenshotUrl, { timeout: 10000 });
    return response.status === 200 ? screenshotUrl : null;
  } catch (error) {
    return null;
  }
};

// Submit new tool
router.post('/', async (req, res) => {
  try {
    const { error } = submissionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, description, website, category, tags } = req.body;

    // Check if tool already exists
    const existingTool = await Tool.findOne({ 
      $or: [{ name }, { website }],
      approved: true 
    });

    if (existingTool) {
      return res.status(400).json({ error: 'Tool already exists in our database' });
    }

    // Get domain for logo
    const domain = extractDomain(website);
    let logo = null;
    let screenshot = null;

    if (domain) {
      // Get logo and screenshot asynchronously (don't wait for them)
      getLogo(domain).then(logoUrl => {
        if (logoUrl) {
          Tool.findByIdAndUpdate(tool._id, { logo }).catch(console.error);
        }
      }).catch(console.error);

      getScreenshot(website).then(screenshotUrl => {
        if (screenshotUrl) {
          Tool.findByIdAndUpdate(tool._id, { screenshot }).catch(console.error);
        }
      }).catch(console.error);
    }

    // Create new tool
    const tool = new Tool({
      name,
      description,
      website,
      category,
      tags: tags || [],
      logo,
      screenshot,
      submittedBy: null, // No user submission tracking
      approved: false // Requires admin approval
    });

    await tool.save();

    res.status(201).json({
      message: 'Tool submitted successfully! It will be reviewed by our team.',
      tool: {
        id: tool._id,
        name: tool.name,
        description: tool.description,
        website: tool.website,
        category: tool.category,
        tags: tool.tags,
        status: 'pending_approval'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pending submissions (public view)
router.get('/pending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const tools = await Tool.find({ approved: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Tool.countDocuments({ approved: false });

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

// Approve submission (simple endpoint for demo)
router.put('/:id/approve', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { approved: true, updatedAt: Date.now() },
      { new: true }
    );

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json({
      message: 'Tool approved successfully',
      tool
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject submission (simple endpoint for demo)
router.delete('/:id', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json({
      message: 'Tool rejected and deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
