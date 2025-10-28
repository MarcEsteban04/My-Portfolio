# Deployment Guide

This guide explains how to deploy Marc's Portfolio to Vercel (frontend) and Render (backend).

## Architecture

- **Frontend**: Astro application deployed on Vercel
- **Backend**: Node.js/Express API deployed on Render
- **Email Service**: Gmail SMTP for contact form

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Gmail App Password**: Generate an app password for email functionality
3. **Vercel Account**: For frontend deployment
4. **Render Account**: For backend deployment

## Backend Deployment (Render)

### 1. Prepare Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification
3. Generate an "App Password" for "Mail"
4. Save this password for environment variables

### 2. Deploy to Render

1. **Connect Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

2. **Configure Service**:
   - **Name**: `marc-portfolio-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **Set Environment Variables**:
   ```
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   RECIPIENT_EMAIL=marcdelacruzesteban@gmail.com
   FRONTEND_URL=https://your-vercel-app.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**: Click "Create Web Service"

### 3. Note Your API URL

After deployment, save your Render API URL:
```
https://marc-portfolio-api.onrender.com
```

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory

2. **Configure Project**:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**:
   ```
   PUBLIC_API_URL=https://marc-portfolio-api.onrender.com
   ```

4. **Deploy**: Click "Deploy"

### 2. Update Backend CORS

After getting your Vercel URL, update the backend environment variable:

1. Go to Render Dashboard → Your API Service → Environment
2. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
3. Redeploy the service

## Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Update Backend CORS

If using a custom domain, update the backend `FRONTEND_URL`:
```
FRONTEND_URL=https://your-custom-domain.com
```

## Environment Variables Summary

### Backend (Render)
```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
RECIPIENT_EMAIL=marcdelacruzesteban@gmail.com
FRONTEND_URL=https://marcesteban-portfolio.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```env
PUBLIC_API_URL=https://my-portfolio-wmvm.onrender.com
```

## Testing Deployment

1. **Backend Health Check**:
   ```
   GET https://my-portfolio-wmvm.onrender.com/api/health
   ```

2. **Frontend Contact Form**:
   - Visit your Vercel URL
   - Navigate to contact section
   - Submit a test message
   - Check your email for the message

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
   - Check that both HTTP and HTTPS are handled

2. **Email Not Sending**:
   - Verify Gmail app password is correct
   - Check that 2-factor authentication is enabled
   - Ensure `EMAIL_USER` and `RECIPIENT_EMAIL` are valid

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Review build logs for specific errors

### Render Free Tier Limitations

- **Cold Starts**: Service sleeps after 15 minutes of inactivity
- **Build Minutes**: 500 minutes per month
- **Bandwidth**: 100GB per month

### Vercel Free Tier Limitations

- **Bandwidth**: 100GB per month
- **Function Executions**: 100GB-hours per month
- **Build Minutes**: 6,000 minutes per month

## Monitoring

### Backend Monitoring
- Render provides built-in logs and metrics
- Monitor `/api/health` endpoint for uptime

### Frontend Monitoring
- Vercel provides analytics and performance metrics
- Monitor Core Web Vitals and deployment status

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Keep origins restrictive to your domains
3. **Rate Limiting**: Backend includes rate limiting for email endpoint
4. **Input Validation**: Backend validates all form inputs

## Maintenance

### Regular Updates
1. Keep dependencies updated
2. Monitor security advisories
3. Review and rotate API keys periodically
4. Monitor usage and performance metrics

### Backup Strategy
- Code is backed up in GitHub
- Environment variables should be documented securely
- Consider backing up email configurations
