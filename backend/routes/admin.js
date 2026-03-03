const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Lead = require('../models/Lead');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Development mode without MongoDB
    if (!process.env.MONGODB_URI) {
      // Simple hardcoded admin for development
      if (email === 'admin@agencyk.in' && password === 'admin123') {
        const token = jwt.sign(
          { id: 'dev-admin', email: email, role: 'admin' },
          process.env.JWT_SECRET || 'dev-secret-key',
          { expiresIn: '24h' }
        );

        return res.json({
          success: true,
          message: 'Login successful (Development mode)',
          token,
          admin: {
            id: 'dev-admin',
            name: 'Admin User',
            email: email,
            role: 'admin'
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }

    // Find admin
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Get dashboard stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Development mode without MongoDB
    if (!process.env.MONGODB_URI) {
      return res.json({
        success: true,
        stats: {
          totalLeads: 0,
          todayLeads: 0,
          weekLeads: 0,
          monthLeads: 0,
          statusBreakdown: {
            new: 0,
            contacted: 0,
            qualified: 0,
            converted: 0,
            closed: 0
          }
        }
      });
    }

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      statusCounts
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: startOfDay } }),
      Lead.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const statusMap = statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      success: true,
      stats: {
        totalLeads,
        todayLeads,
        weekLeads,
        monthLeads,
        statusBreakdown: {
          new: statusMap.new || 0,
          contacted: statusMap.contacted || 0,
          qualified: statusMap.qualified || 0,
          converted: statusMap.converted || 0,
          closed: statusMap.closed || 0
        }
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

// Get all leads with pagination and filtering
router.get('/leads', authenticateToken, async (req, res) => {
  try {
    // Development mode without MongoDB
    if (!process.env.MONGODB_URI) {
      return res.json({
        success: true,
        leads: [],
        pagination: {
          current: 1,
          pages: 0,
          total: 0,
          limit: 10
        }
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(query)
    ]);

    res.json({
      success: true,
      leads,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Leads fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads'
    });
  }
});

// Update lead status
router.patch('/leads/:id/status', authenticateToken, [
  body('status').isIn(['new', 'contacted', 'qualified', 'converted', 'closed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
        errors: errors.array()
      });
    }

    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead status updated',
      lead
    });

  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

module.exports = router;