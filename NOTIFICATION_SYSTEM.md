# Real-Time Notification System

## Overview
The admin dashboard now features a comprehensive real-time notification system that alerts admins instantly when new leads submit the contact form.

## Architecture

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Contact Form (Frontend)                  │
│                    http://localhost:3000                     │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP POST
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend API (Express)                       │
│                  http://localhost:5000                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Validate & Save Lead to Database                 │  │
│  │  2. Send Email Notifications                         │  │
│  │  3. Emit WebSocket Event: 'new-lead'                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ WebSocket
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Socket.io Server (admin-room)                   │
│                                                              │
│  Broadcasts to all connected admins                         │
└────────────────────────┬────────────────────────────────────┘
                         │ WebSocket
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Admin Dashboard (Frontend)                      │
│              http://localhost:3000/admin                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Receive 'new-lead' event                         │  │
│  │  2. Add to notification list                         │  │
│  │  3. Update unread count badge                        │  │
│  │  4. Show browser notification                        │  │
│  │  5. Refresh stats & leads                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Features

### 1. Notification Bell Icon
- Located in the header next to logout button
- Shows unread count badge (red circle with number)
- Click to toggle notification dropdown
- Responsive design (smaller on mobile)

### 2. Notification Dropdown Panel
- Displays all recent notifications
- Shows lead details: company, name, email, budget
- Timestamp for each notification
- Blue highlight for unread notifications
- Blue dot indicator for unread items
- Scrollable list (max height with overflow)
- "Mark all read" button

### 3. Browser Notifications
- Desktop notifications when tab is in background
- Requires user permission (requested on first login)
- Shows company name and contact name
- Works even when browser is minimized
- Platform-specific notification style

### 4. Auto-Refresh
- Stats automatically update when new lead arrives
- Leads list refreshes if viewing "all" or "new" status
- No manual refresh needed
- Seamless user experience

## User Interface

### Notification Bell States

**No Notifications:**
```
🔔 (Bell icon, no badge)
```

**Unread Notifications:**
```
🔔 (3) (Bell icon with red badge showing count)
```

**9+ Notifications:**
```
🔔 (9+) (Bell icon with "9+" badge)
```

### Notification Item Layout

```
┌─────────────────────────────────────────────────────┐
│ New Lead: TechCorp Inc                          • │ ← Blue dot (unread)
│ John Doe • john@techcorp.com                      │
│ Budget: ₹50k-1L                                   │
│ 3/2/2026, 10:30:45 AM                            │
└─────────────────────────────────────────────────────┘
```

**After Reading:**
```
┌─────────────────────────────────────────────────────┐
│ New Lead: TechCorp Inc                            │ ← No dot (read)
│ John Doe • john@techcorp.com                      │
│ Budget: ₹50k-1L                                   │
│ 3/2/2026, 10:30:45 AM                            │
└─────────────────────────────────────────────────────┘
```

## WebSocket Events

### Client → Server

**authenticate**
```javascript
socket.emit('authenticate', token)
```
- Sent immediately after connection
- Includes JWT token for verification
- Server validates and adds to admin-room

**disconnect**
```javascript
// Automatic on connection close
```
- Triggered when admin closes browser/tab
- Server removes from admin-room

### Server → Client

**connect**
```javascript
socket.on('connect', () => {
  console.log('Connected to WebSocket')
})
```
- Triggered when connection established
- Client sends authentication token

**new-lead**
```javascript
socket.on('new-lead', (lead) => {
  // lead object contains:
  // - id, name, company, email, phone
  // - budget, services, message
  // - createdAt, status
})
```
- Triggered when new contact form submitted
- Contains complete lead information
- Received by all authenticated admins

**disconnect**
```javascript
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket')
})
```
- Triggered when connection lost
- Client can implement reconnection logic

## Code Examples

### Backend - Emitting Notification

```javascript
// In backend/routes/contact.js
await lead.save();

// Emit real-time notification
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
}
```

### Frontend - Receiving Notification

```javascript
// In frontend/app/admin/page.tsx
socket.on('new-lead', (lead) => {
  // Create notification object
  const notification = {
    id: Date.now(),
    lead,
    timestamp: new Date(),
    read: false
  }
  
  // Add to notification list
  setNotifications(prev => [notification, ...prev])
  
  // Increment unread count
  setUnreadCount(prev => prev + 1)
  
  // Show browser notification
  if (Notification.permission === 'granted') {
    new Notification('New Lead Received!', {
      body: `${lead.company} - ${lead.name}`,
      icon: '/favicon.ico'
    })
  }
  
  // Refresh data
  loadStats()
  loadLeads()
})
```

### Frontend - Mark as Read

```javascript
const markNotificationAsRead = (id: number) => {
  setNotifications(prev => 
    prev.map(n => n.id === id ? { ...n, read: true } : n)
  )
  setUnreadCount(prev => Math.max(0, prev - 1))
}
```

## Notification Data Structure

```typescript
interface Notification {
  id: number;              // Unique identifier (timestamp)
  lead: {
    id: string;           // Lead database ID
    name: string;         // Contact name
    company: string;      // Company name
    email: string;        // Email address
    phone: string;        // Phone number
    budget: string;       // Budget range
    services: string[];   // Selected services
    message: string;      // Contact message
    createdAt: Date;      // Submission timestamp
    status: string;       // Lead status (default: 'new')
  };
  timestamp: Date;        // Notification received time
  read: boolean;          // Read status
}
```

## Browser Notification API

### Request Permission

```javascript
useEffect(() => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}, [])
```

### Show Notification

```javascript
if ('Notification' in window && Notification.permission === 'granted') {
  new Notification('New Lead Received!', {
    body: `${lead.company} - ${lead.name}`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'new-lead',
    requireInteraction: false
  })
}
```

### Permission States

- `default` - User hasn't been asked yet
- `granted` - User allowed notifications
- `denied` - User blocked notifications

## Testing Scenarios

### Scenario 1: Single Admin
1. Admin logs in
2. WebSocket connects
3. User submits contact form
4. Admin receives notification instantly
5. Badge shows "1"
6. Browser notification appears
7. Stats update automatically

### Scenario 2: Multiple Admins
1. Admin A logs in (Chrome)
2. Admin B logs in (Firefox)
3. Both connect to WebSocket
4. User submits contact form
5. Both admins receive notification simultaneously
6. Both see updated stats
7. Each can mark as read independently

### Scenario 3: Reconnection
1. Admin logs in
2. Backend server restarts
3. WebSocket disconnects
4. Frontend detects disconnection
5. Automatically reconnects when server is back
6. Re-authenticates with token
7. Continues receiving notifications

### Scenario 4: Background Tab
1. Admin logs in
2. Switches to another tab
3. User submits contact form
4. Browser notification appears
5. Admin clicks notification
6. Browser focuses admin tab
7. Notification marked as read

## Performance Considerations

### Optimization Strategies

1. **Efficient Re-renders**
   - Use React hooks (useState, useEffect)
   - Memoize expensive calculations
   - Update only affected components

2. **WebSocket Connection**
   - Single connection per admin
   - Automatic reconnection on disconnect
   - Heartbeat to keep connection alive

3. **Notification Storage**
   - Store in component state (not database)
   - Limit to recent notifications (e.g., last 50)
   - Clear old notifications periodically

4. **Data Transfer**
   - Send only necessary lead data
   - Compress large payloads
   - Batch updates when possible

## Security Considerations

### Authentication
- JWT token required for WebSocket connection
- Token verified before joining admin-room
- Unauthorized connections rejected immediately

### Authorization
- Only authenticated admins receive notifications
- Room-based broadcasting (admin-room)
- No public access to WebSocket events

### Data Protection
- Sensitive data not exposed in notifications
- CORS configured for frontend only
- Secure WebSocket connection (wss:// in production)

## Troubleshooting

### Notifications Not Appearing

**Check 1: WebSocket Connection**
```javascript
// Browser console
socket.connected // Should be true
```

**Check 2: Authentication**
```javascript
// Backend console should show:
✅ Admin authenticated: admin@agencyk.in
```

**Check 3: Room Membership**
```javascript
// Backend console should show:
👤 Admin connected: [socket-id]
```

**Check 4: Event Emission**
```javascript
// Backend console should show:
📢 Real-time notification sent to admin
```

### Browser Notifications Not Working

**Check 1: Permission**
```javascript
console.log(Notification.permission) // Should be 'granted'
```

**Check 2: HTTPS (Production)**
- Browser notifications require HTTPS in production
- localhost works without HTTPS

**Check 3: Browser Support**
```javascript
if ('Notification' in window) {
  console.log('Notifications supported')
} else {
  console.log('Notifications not supported')
}
```

### Unread Count Incorrect

**Solution 1: Reset Count**
```javascript
// Click "Mark all read" button
```

**Solution 2: Refresh Page**
```javascript
// Hard refresh: Ctrl+F5
```

**Solution 3: Clear Storage**
```javascript
// DevTools → Application → Clear storage
```

## Best Practices

### For Admins
1. Keep admin dashboard open in a dedicated tab
2. Allow browser notifications for instant alerts
3. Check notifications regularly
4. Mark notifications as read after reviewing
5. Use "Mark all read" to clear old notifications

### For Developers
1. Implement reconnection logic for poor networks
2. Add error handling for WebSocket failures
3. Limit notification history to prevent memory issues
4. Test with multiple concurrent admins
5. Monitor WebSocket connection health
6. Log all WebSocket events for debugging

## Future Enhancements

### Planned Features
- [ ] Sound alerts (customizable)
- [ ] Notification preferences (email, SMS, push)
- [ ] Notification filtering by lead status
- [ ] Notification history persistence
- [ ] Notification grouping (by time/company)
- [ ] Rich notifications with actions
- [ ] Notification scheduling
- [ ] Notification analytics

### Advanced Features
- [ ] Multi-channel notifications (Slack, Teams)
- [ ] AI-powered notification prioritization
- [ ] Notification templates
- [ ] Notification workflows
- [ ] Notification API for integrations

## Conclusion

The real-time notification system provides admins with instant awareness of new leads, improving response times and customer engagement. The system is reliable, secure, and scalable for production use.
