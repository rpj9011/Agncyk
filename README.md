# Agency K - Full Stack Portfolio Website

A professional agency portfolio website with a separate Node.js backend, MongoDB integration, and admin panel for lead management.

## 🏗️ Project Structure

```
portfolio/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # Next.js 13+ App Router
│   ├── components/          # React Components
│   ├── lib/                 # Utilities
│   ├── public/              # Static Assets
│   ├── package.json
│   └── ...
├── backend/                 # Node.js Backend
│   ├── models/              # MongoDB Models
│   ├── routes/              # API Routes
│   ├── utils/               # Utilities
│   ├── views/               # HTML Templates
│   ├── scripts/             # Database Scripts
│   ├── server.js            # Main Server
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

### 3. Access Admin Panel

Visit: http://localhost:5000/api/admin/dashboard

**Default Login:**
- Email: `admin@agencyk.in`
- Password: `admin123`

## ✨ Features

### Frontend (Next.js)
- ✅ Modern responsive design with Tailwind CSS
- ✅ Luxury brand aesthetic with custom color scheme
- ✅ Contact form with validation
- ✅ Portfolio showcase with company logos
- ✅ Services, testimonials, and process sections
- ✅ SEO optimized with sitemap

### Backend (Node.js + Express)
- ✅ RESTful API for contact form submissions
- ✅ Input validation and sanitization
- ✅ Rate limiting (3 submissions per 15 minutes per IP)
- ✅ Email notifications (client + admin)
- ✅ JWT authentication for admin
- ✅ CORS and security headers

### Admin Dashboard
- ✅ Professional web-based interface
- ✅ Real-time lead statistics
- ✅ Lead management with status tracking
- ✅ Search and filter functionality
- ✅ Pagination for large datasets
- ✅ Responsive design with icons

### Security & Performance
- ✅ Rate limiting and DDoS protection
- ✅ Input validation and XSS prevention
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ Helmet security headers

## 🗄️ Database (Optional)

The system works in development mode without MongoDB. To enable full functionality:

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# On macOS: brew install mongodb-community
# On Ubuntu: sudo apt install mongodb
# On Windows: Download from mongodb.com

# Start MongoDB service
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Ubuntu
net start MongoDB                     # Windows
```

### Option 2: MongoDB Atlas (Recommended)
1. Create account at https://cloud.mongodb.com
2. Create a free cluster
3. Get connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agency-k-db
```

### Create Admin User
```bash
cd backend
npm run seed
```

## 📧 Email Configuration (Optional)

To enable email notifications, update `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@agencyk.in
```

**For Gmail:**
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password in `SMTP_PASS`

## 🔧 Development Mode

The system is designed to work perfectly without external dependencies:

- **No MongoDB?** Contact submissions are logged to console
- **No Email?** Notifications are skipped gracefully
- **All validation and security features still work**
- **Perfect for development and testing**

## 📱 API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Web dashboard

### Admin Data
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/leads` - Lead listing with pagination
- `PATCH /api/admin/leads/:id/status` - Update lead status

### Health Check
- `GET /api/health` - Server health status

## 🎨 Customization

### Frontend Styling
- Colors defined in `tailwind.config.ts`
- Components in `frontend/components/`
- Luxury brand theme with gold accents

### Backend Configuration
- Environment variables in `backend/.env`
- Email templates in `backend/utils/email.js`
- Database models in `backend/models/`

### Admin Panel
- Dashboard UI in `backend/views/dashboard.html`
- Fully customizable with Tailwind CSS
- Font Awesome icons included

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy build folder
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd backend
# Set environment variables
# Deploy with npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-super-secure-jwt-secret
SMTP_USER=your-production-email
SMTP_PASS=your-production-email-password
FRONTEND_URL=https://your-frontend-domain.com
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Framer Motion** - Animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing

### DevOps & Security
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - DDoS protection
- **Input Validation** - XSS prevention

## 📞 Support

For issues or questions:
1. Check the console logs for errors
2. Verify environment variables are set
3. Ensure ports 3000 and 5000 are available
4. Check MongoDB connection if using database

## 📄 License

This project is licensed under the MIT License.

---

**Agency K** - Professional digital solutions with luxury aesthetics and robust backend infrastructure.