# Agency K - Complete Setup Instructions

This project now has a separate Node.js backend with MongoDB and an admin panel.

## Project Structure

```
portfolio/
├── frontend/ (Next.js)
│   ├── components/
│   ├── app/
│   └── ...
└── backend/ (Node.js + Express)
    ├── models/
    ├── routes/
    ├── utils/
    └── server.js
```

## Quick Start

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend will start on http://localhost:5000

### 2. Start the Frontend

```bash
# In the root directory
npm run dev
```

The frontend will start on http://localhost:3000

### 3. Access Admin Panel

Visit: http://localhost:5000/api/admin/dashboard

**Default Login:**
- Email: admin@agencyk.in  
- Password: admin123

## Features Implemented

### Backend API
- ✅ Contact form submission endpoint
- ✅ Input validation and sanitization
- ✅ Rate limiting (3 submissions per 15 minutes)
- ✅ Email notifications (when configured)
- ✅ Admin authentication with JWT
- ✅ Lead management system

### Admin Dashboard
- ✅ Login/logout functionality
- ✅ Dashboard statistics (total, today, week, month)
- ✅ Lead listing with pagination
- ✅ Lead status management (new, contacted, qualified, converted, closed)
- ✅ Search and filter functionality
- ✅ Responsive design

### Security Features
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Helmet security headers

## Configuration

### MongoDB Setup (Optional)

The backend works without MongoDB in development mode. To use a real database:

1. **Local MongoDB:**
   ```bash
   # Install MongoDB locally or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **MongoDB Atlas (Recommended):**
   - Create account at https://cloud.mongodb.com
   - Create a cluster
   - Get connection string
   - Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agency-k-db
   ```

3. **Create Admin User:**
   ```bash
   cd backend
   npm run seed
   ```

### Email Configuration (Optional)

To enable email notifications, update `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@agencyk.in
```

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password in SMTP_PASS

## API Endpoints

### Contact Form
- `POST http://localhost:5000/api/contact`

### Admin Panel
- `GET http://localhost:5000/api/admin/dashboard` - Web interface
- `POST http://localhost:5000/api/admin/login` - Login
- `GET http://localhost:5000/api/admin/stats` - Statistics
- `GET http://localhost:5000/api/admin/leads` - Lead listing
- `PATCH http://localhost:5000/api/admin/leads/:id/status` - Update status

## Development Mode

The system works perfectly in development mode without MongoDB or email configuration:

- Contact form submissions are logged to console
- Admin panel shows "Development mode" messages
- All validation and rate limiting still works
- Perfect for testing and development

## Production Deployment

For production:

1. Set up MongoDB (Atlas recommended)
2. Configure email service
3. Update environment variables
4. Set strong JWT secret
5. Change admin password
6. Deploy backend and frontend separately

## Troubleshooting

### Backend Issues
- Check if port 5000 is available
- Verify Node.js version (14+ required)
- Check console for error messages

### Frontend Issues  
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoint URLs

### Database Issues
- MongoDB connection errors are handled gracefully
- System works without database in development
- Check MongoDB service status if using local installation

## Next Steps

1. **Customize Admin Panel:** Add more features like lead export, analytics charts
2. **Email Templates:** Customize the email templates in `backend/utils/email.js`
3. **Database:** Set up MongoDB for persistent data storage
4. **Deployment:** Deploy to services like Vercel (frontend) and Railway/Heroku (backend)
5. **Monitoring:** Add logging and monitoring for production use

The system is now fully functional with a professional backend API and admin panel!