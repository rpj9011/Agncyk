# Vercel Deployment Guide

## Environment Variables

Add the following environment variable in your Vercel project settings:

### Required
- **MONGODB_URI**: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Environment: Production, Preview, Development

### Optional (for email functionality)
- **SMTP_HOST**: SMTP server hostname
- **SMTP_PORT**: SMTP server port
- **SMTP_USER**: SMTP username
- **SMTP_PASS**: SMTP password
- **ADMIN_EMAIL**: Email address to receive lead notifications
- **NEXT_PUBLIC_SITE_URL**: Your production URL (e.g., https://yourdomain.com)

## Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add MONGODB_URI with your connection string
   - Select all environments (Production, Preview, Development)
4. Deploy or redeploy your project

## Build Configuration

The project is configured to:
- Only connect to MongoDB during request handling (not at build time)
- Use cached global mongoose connections for optimal performance
- Handle missing environment variables gracefully in development

### Required Vercel project settings

In **Project Settings → General → Root Directory** and **Build & Development Settings**:

| Setting | Value |
|---------|-------|
| Root Directory | `frontend` |
| Framework Preset | **Next.js** (not "Other") |
| Build Command | `npm run build` (or leave default) |
| Output Directory | **leave empty** (do not set `.next` or `out`) |
| Install Command | `npm install` (or leave default) |

If Framework Preset is **Other**, Vercel may run `next build` successfully but **will not wire up Next.js routes**, and every URL returns `404: NOT_FOUND`.

After changing these settings, redeploy with **Use existing Build Cache** unchecked.

## Troubleshooting

### Build fails with `<Html> should not be imported outside of pages/_document`

This happens when `NODE_ENV` is set to a non-production value (for example `development`) in Vercel environment variables. Vercel already sets `NODE_ENV=production` during builds; overriding it breaks static prerendering.

**Fix:** In Vercel → Project Settings → Environment Variables, delete any `NODE_ENV` entry. The build script also forces production mode as a safeguard.

### Site shows `404: NOT_FOUND` but deployment status is Ready

This is a **Vercel routing** issue, not a Next.js page 404.

**Fix:**
1. Set **Framework Preset** to **Next.js** (not Other)
2. Clear **Output Directory** (must be blank)
3. Set **Root Directory** to `frontend`
4. Redeploy without build cache

If you encounter other build errors:
- Ensure MONGODB_URI is set in Vercel environment variables
- Verify the connection string format is correct
- Check that the MongoDB cluster allows connections from Vercel IPs (0.0.0.0/0)
- Redeploy after adding environment variables
