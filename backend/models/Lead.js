const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['10k-25k', '25k-50k', '50k-1L', '1L-5L', '5L+']
  },
  services: [{
    type: String,
    required: true,
    enum: ['Web Development', 'Digital Marketing', 'Performance Marketing', 'UI/UX Design', 'Branding & Strategy', 'SEO Optimization', 'Brand Identity', 'E-commerce', 'SEO', 'Social Media']
  }],
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for better query performance
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

module.exports = mongoose.model('Lead', leadSchema);