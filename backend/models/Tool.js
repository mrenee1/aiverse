const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Website must be a valid URL'
    }
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Artificial Intelligence',
      'Productivity',
      'Marketing',
      'Developer Tools',
      'Design',
      'SEO',
      'Chatbots',
      'Social Media',
      'Content Creation',
      'No Code',
      'Writing',
      'Customer Support',
      'Blogging',
      'Sales',
      'Productized Services',
      'Website Builders',
      'Analytics',
      'iOS',
      'Developer APIs',
      'Video',
      'Building Products',
      'Mac',
      'Feedback Tools',
      'Education',
      'Email'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  logo: {
    type: String,
    trim: true
  },
  screenshot: {
    type: String,
    trim: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  deals: {
    type: Boolean,
    default: false
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approved: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
toolSchema.index({ name: 'text', description: 'text', tags: 'text' });
toolSchema.index({ category: 1 });
toolSchema.index({ popularity: -1 });
toolSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model('Tool', toolSchema);
