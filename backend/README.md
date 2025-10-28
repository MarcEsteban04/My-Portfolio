# Marc Portfolio Backend API

This is the backend API for Marc Esteban's portfolio website, handling contact form submissions and email sending.

## Features

- 📧 Email sending via Nodemailer (Gmail)
- 🔒 Security with Helmet and CORS
- 🚦 Rate limiting (5 requests per 15 minutes)
- ✅ Input validation and sanitization
- 🎨 Beautiful HTML email templates
- 🔍 Health check endpoint

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Configure your Gmail credentials in `.env`:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=marcdelacruzesteban@gmail.com
PORT=3001
FRONTEND_URL=http://localhost:4321
```

### 3. Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** > **2-Step Verification** (must be enabled)
3. Go to **App passwords**
4. Generate a new app password:
   - Select "Mail" 
   - Select "Other (custom name)" and enter "Portfolio API"
5. Copy the 16-character password and use it as `EMAIL_PASS`

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST `/api/send-email`
Sends an email from the contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project...",
  "urgency": "normal"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Email format, field length limits
- **CORS Protection**: Only allows requests from frontend URL
- **Helmet**: Security headers
- **Sanitization**: HTML content sanitization

## Email Template

The API sends beautifully formatted HTML emails with:
- Professional styling
- Contact details section
- Formatted message content
- Urgency color coding
- Timestamp information

## Error Handling

The API handles various error scenarios:
- Missing required fields (400)
- Invalid email format (400)
- Input too long (400)
- Rate limit exceeded (429)
- Server errors (500)

## Development

To modify the email template, edit the `emailContent.html` section in `server.js`.

To add new endpoints, follow the existing pattern with proper validation and error handling.

## Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Consider using a dedicated email service (SendGrid, Mailgun) for better deliverability
4. Set up proper logging and monitoring

## Troubleshooting

**Email not sending:**
- Check Gmail app password is correct
- Ensure 2-factor authentication is enabled
- Verify EMAIL_USER and EMAIL_PASS in .env

**CORS errors:**
- Check FRONTEND_URL matches your frontend domain
- Ensure frontend is making requests to correct backend URL

**Rate limiting:**
- Wait 15 minutes between testing
- Check IP address isn't being blocked
