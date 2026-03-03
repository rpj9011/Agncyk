# Quick Start Guide - Admin Dashboard

## Prerequisites
- Node.js installed
- Backend and Frontend servers running

## Installation

### 1. Install Dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

## Running the Application

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📧 Admin panel: http://localhost:5000/api/admin/dashboard
🔌 WebSocket server ready
```

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```

### 3. Access Admin Dashboard
Open your browser and navigate to:
```
http://localhost:3000/admin
```

## Default Login Credentials
```
Email: admin@agencyk.in
Password: admin123
```

## Testing Real-Time Notifications

### Method 1: Using Two Browser Windows
1. Open admin dashboard in one window
2. Open the main website (http://localhost:3000) in another window
3. Fill out and submit the contact form
4. Watch the notification appear instantly in the admin dashboard!

### Method 2: Using Different Browsers
1. Login to admin in Chrome
2. Open the contact form in Firefox
3. Submit the form
4. See the notification in Chrome admin dashboard

## Features to Test

### ✅ Mobile Responsiveness
1. Open admin dashboard
2. Press F12 to open DevTools
3. Click the device toolbar icon (or Ctrl+Shift+M)
4. Select different devices (iPhone, iPad, etc.)
5. Verify the layout adapts properly

### ✅ Session Storage
**Test Session-Based Login:**
1. Login WITHOUT checking "Remember Me"
2. Close the browser completely
3. Reopen and go to admin page
4. You should be logged out ✓

**Test Persistent Login:**
1. Login WITH "Remember Me" checked
2. Close the browser completely
3. Reopen and go to admin page
4. You should still be logged in ✓

### ✅ Real-Time Notifications
1. Login to admin dashboard
2. Click the bell icon (should show 0 notifications)
3. Submit a contact form from another tab/browser
4. Watch the notification appear instantly
5. Red badge shows unread count
6. Click notification to mark as read

### ✅ Browser Notifications
1. When prompted, click "Allow" for notifications
2. Submit a contact form
3. You should see a desktop notification even if the tab is in background

### ✅ Lead Management
1. View all leads in the dashboard
2. Filter by status (New, Contacted, etc.)
3. Search for specific leads
4. Update lead status using dropdown
5. Navigate through pages

## Troubleshooting

### WebSocket Not Connecting
**Problem:** Notifications not working
**Solution:**
1. Check backend console for WebSocket errors
2. Ensure backend is running on port 5000
3. Check browser console for connection errors
4. Verify CORS settings in backend

### Mobile Layout Issues
**Problem:** Layout looks broken on mobile
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check if Tailwind CSS is loaded

### Session Storage Not Working
**Problem:** Login state not persisting correctly
**Solution:**
1. Check browser privacy settings
2. Ensure cookies/storage are enabled
3. Open DevTools → Application → Storage
4. Verify token is stored in localStorage or sessionStorage

### Notifications Not Showing
**Problem:** No desktop notifications
**Solution:**
1. Check browser notification permissions
2. Go to browser settings → Site Settings → Notifications
3. Ensure localhost is allowed
4. Try clicking "Allow" when prompted again

## Development Tips

### View WebSocket Connection
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "WS" (WebSocket)
4. You should see a connection to localhost:5000

### View Stored Tokens
1. Open DevTools (F12)
2. Go to Application tab
3. Check Local Storage or Session Storage
4. Look for "adminToken"

### Monitor Real-Time Events
1. Open backend terminal
2. Watch for these logs:
   - `👤 Admin connected: [socket-id]`
   - `✅ Admin authenticated: [email]`
   - `📢 Real-time notification sent to admin`
   - `👋 Admin disconnected: [socket-id]`

## Next Steps

1. **Customize Notifications**: Modify notification appearance in `frontend/app/admin/page.tsx`
2. **Add Sound Alerts**: Implement audio notifications for new leads
3. **Email Integration**: Configure SMTP settings for email notifications
4. **MongoDB Setup**: Connect to MongoDB for persistent data storage

## Support

For detailed feature documentation, see `ADMIN_FEATURES.md`

For MongoDB setup, see `MONGODB_SETUP.md`

For admin account setup, see `ADMIN_SETUP.md`
