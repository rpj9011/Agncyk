# Agency K Backend

Node.js backend API for Agency K website with MongoDB database and admin panel.

## Features

- Contact form API with validation
- Email notifications (client + admin)
- Rate limiting and security
- Admin dashboard to view leads
- JWT authentication for admin
- Lead status management

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Update the `.env` file with your actual credentials:

```env
# MongoDB - Replace with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/agency-k-db

# JWT Secret - Change this to a secure random string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration - Replace with your email service credentials
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@agencyk.in

# Admin Login Credentials
ADMIN_EMAIL_LOGIN=admin@agencyk.in
ADMIN_PASSWORD=admin123
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 4. Create Admin User

```bash
npm run seed
```

### 5. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form

### Admin Panel
- `GET /api/admin/dashboard` - Admin dashboard (web interface)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/leads` - Get leads with pagination/filtering
- `PATCH /api/admin/leads/:id/status` - Update lead status

## Admin Dashboard

Access the admin panel at: http://localhost:5000/api/admin/dashboard

Default login credentials:
- Email: admin@agencyk.in
- Password: admin123

## Database Schema

### Lead Model
- name, company, email, phone (required)
- budget, services, message (required)
- status (new, contacted, qualified, converted, closed)
- timestamps, IP address, user agent

### Admin Model
- email, password, name, role
- JWT authentication with bcrypt password hashing

## Security Features

- Rate limiting (3 contact submissions per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- JWT token authentication for admin
- Password hashing with bcrypt

## Email Templates

Professional HTML email templates for:
- Client confirmation emails
- Admin notification emails

## Development

The backend uses:
- Express.js for the web framework
- Mongoose for MongoDB ODM
- Nodemailer for email sending
- JWT for authentication
- Express-validator for input validation
- Bcryptjs for password hashing