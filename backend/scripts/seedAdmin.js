const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL_LOGIN });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL_LOGIN || 'admin@agencyk.in',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin User',
      role: 'super-admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('🔗 Access admin panel: http://localhost:5000/api/admin/dashboard');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();