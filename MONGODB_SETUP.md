# MongoDB Setup Guide

## Issue
Your contact form submissions are not appearing in the admin dashboard because MongoDB is not configured. The backend is running in development mode without a database.

## Solution Options

### Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

MongoDB Atlas is a free cloud database service. Perfect for development and production.

#### Steps:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `agencyk_admin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://agencyk_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update backend/.env**
   - Open `backend/.env`
   - Replace the MONGODB_URI line with your connection string
   - Replace `<password>` with your actual password
   - Add database name at the end:
   ```env
   MONGODB_URI=mongodb+srv://agencyk_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agency-k-db?retryWrites=true&w=majority
   ```

7. **Restart Backend Server**
   ```bash
   cd backend
   npm start
   ```
   
   You should see: `✅ MongoDB connected successfully`

---

### Option 2: Local MongoDB (For Development)

If you prefer to run MongoDB locally on your machine.

#### Windows Installation:

1. **Download MongoDB**
   - Go to https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run the installer

2. **Install MongoDB**
   - Choose "Complete" installation
   - Install MongoDB as a Service
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Update backend/.env**
   ```env
   MONGODB_URI=mongodb://localhost:27017/agency-k-db
   ```

5. **Restart Backend Server**
   ```bash
   cd backend
   npm start
   ```

---

## Verify Setup

After setting up MongoDB:

1. **Check Backend Console**
   - You should see: `✅ MongoDB connected successfully`
   - If you see an error, check your connection string

2. **Submit a Test Form**
   - Go to http://localhost:3000
   - Scroll to the contact form
   - Fill out and submit

3. **Check Admin Dashboard**
   - Go to http://localhost:3000/admin
   - Login with: `admin@agencyk.in` / `admin123`
   - You should see the submitted lead!

---

## Troubleshooting

### "MongooseServerSelectionError"
- Check your internet connection (for Atlas)
- Verify IP address is whitelisted in Atlas
- Check username/password in connection string

### "Authentication failed"
- Verify database user credentials
- Make sure password doesn't contain special characters (or URL encode them)

### "Connection timeout"
- Check firewall settings
- Verify MongoDB service is running (local)
- Check network access settings (Atlas)

### Still not working?
- Check backend console for error messages
- Verify .env file has no extra spaces
- Restart the backend server after changes

---

## Quick Start (MongoDB Atlas)

```bash
# 1. Set up MongoDB Atlas (follow steps above)

# 2. Update backend/.env with your connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agency-k-db

# 3. Restart backend
cd backend
npm start

# 4. Test the form
# Visit http://localhost:3000 and submit the contact form

# 5. Check admin dashboard
# Visit http://localhost:3000/admin
```

---

## Next Steps

After MongoDB is set up:

1. ✅ Contact form submissions will be saved
2. ✅ Admin dashboard will show all leads
3. ✅ You can update lead status
4. ✅ Search and filter leads
5. ✅ View statistics

Need help? Check the backend console for detailed error messages.
