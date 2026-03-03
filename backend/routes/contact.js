const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Lead = require('../models/Lead');
const { sendEmail, getClientConfirmationEmail, getAdminNotificationEmail } = require('../utils/email');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  }
});

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('budget')
    .isIn(['10k-25k', '25k-50k', '50k-1L', '1L-5L', '5L+'])
    .withMessage('Please select a valid budget range'),
  body('services')
    .isArray({ min: 1 })
    .withMessage('Please select at least one service'),
  body('services.*')
    .isIn(['Web Development', 'Digital Marketing', 'Performance Marketing', 'UI/UX Design', 'Branding & Strategy', 'SEO Optimization', 'Brand Identity', 'E-commerce', 'SEO', 'Social Media'])
    .withMessage('Invalid service selected'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Submit contact form
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, company, email, phone, budget, services, message } = req.body;

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // If MongoDB is not connected, simulate success
    if (!process.env.MONGODB_URI) {
      console.log('Development mode - Contact form submission:', {
        name, company, email, phone, budget, services, message
      });
      
      return res.status(201).json({
        success: true,
        message: 'Thank you! We will contact you within 24 hours. (Development mode)',
        leadId: 'dev-' + Date.now()
      });
    }

    // Create lead
    const lead = new Lead({
      name,
      company,
      email,
      phone,
      budget,
      services,
      message,
      ipAddress,
      userAgent
    });

    await lead.save();

    // Emit real-time notification to admin dashboard
    const io = req.app.get('io');
    if (io) {
      io.to('admin-room').emit('new-lead', {
        id: lead._id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        budget: lead.budget,
        services: lead.services,
        message: lead.message,
        createdAt: lead.createdAt,
        status: lead.status
      });
      console.log('📢 Real-time notification sent to admin');
    }

    // Send emails (don't wait for them to complete)
    if (process.env.SMTP_USER && !process.env.SMTP_USER.includes('your-email')) {
      Promise.allSettled([
        sendEmail({
          to: email,
          subject: 'Thank You for Contacting Agency K',
          html: getClientConfirmationEmail(name, company)
        }),
        sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Lead: ${company} - ₹${budget}`,
          html: getAdminNotificationEmail(lead)
        })
      ]).then(results => {
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`Email ${index + 1} failed:`, result.reason);
          }
        });
      });
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you within 24 hours.',
      leadId: lead._id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A submission with this email already exists.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

module.exports = router;