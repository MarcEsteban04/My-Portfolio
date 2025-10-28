const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:4321',
  'http://localhost:3000',
  'https://marcesteban-portfolio.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('Allowed origins:', allowedOrigins);
console.log('FRONTEND_URL env var:', process.env.FRONTEND_URL);

app.use(cors({
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to email endpoint
app.use('/api/send-email', limiter);

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message, urgency } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, subject, and message are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format.'
      });
    }

    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return res.status(400).json({
        error: 'Input too long. Please keep name under 100 characters, subject under 200 characters, and message under 2000 characters.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const urgencyLabels = {
      low: 'Low - No rush',
      normal: 'Normal - Standard timeline',
      high: 'High - ASAP',
      urgent: 'Urgent - Emergency'
    };

    const emailContent = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'marcdelacruzesteban@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact</title>
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #0f172a; width: 100% !important; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%;">
                  
                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding-bottom: 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1e293b; border-radius: 20px; border: 2px solid #3b82f6;">
                        <tr>
                          <td align="center" style="padding: 30px;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #3b82f6; text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);">
                              Marc Esteban
                            </h1>
                            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 16px;">Full Stack Developer</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1e293b; border-radius: 20px; border: 1px solid #334155;">
                        <tr>
                          <td style="padding: 40px;">
                            
                            <!-- Success Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                              <tr>
                                <td style="background-color: #065f46; border-radius: 12px; padding: 12px 20px; border: 1px solid #10b981;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                      <td style="padding-right: 8px;">
                                        <div style="width: 12px; height: 12px; background-color: #10b981; border-radius: 50%; display: inline-block;"></div>
                                      </td>
                                      <td>
                                        <span style="color: #10b981; font-weight: bold; font-size: 14px;">✨ New Contact Form Submission</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- Contact Information -->
                            <h2 style="color: #f1f5f9; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">
                              👤 Contact Information
                            </h2>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #334155; border-radius: 16px; border: 1px solid #475569; margin-bottom: 32px;">
                              <tr>
                                <td style="padding: 24px;">
                                  
                                  <!-- Name -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                                    <tr>
                                      <td width="40" style="padding-right: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 8px; text-align: center; line-height: 32px;">
                                          📝
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold;">NAME</p>
                                        <p style="margin: 2px 0 0 0; color: #f1f5f9; font-size: 16px; font-weight: bold;">${name}</p>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Email -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                                    <tr>
                                      <td width="40" style="padding-right: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 8px; text-align: center; line-height: 32px;">
                                          📧
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold;">EMAIL</p>
                                        <p style="margin: 2px 0 0 0; color: #3b82f6; font-size: 16px; font-weight: bold;">${email}</p>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Subject -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                                    <tr>
                                      <td width="40" style="padding-right: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 8px; text-align: center; line-height: 32px;">
                                          💼
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold;">SUBJECT</p>
                                        <p style="margin: 2px 0 0 0; color: #f1f5f9; font-size: 16px; font-weight: bold;">${subject}</p>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Urgency -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td width="40" style="padding-right: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 8px; text-align: center; line-height: 32px;">
                                          ${urgency === 'urgent' ? '🚨' : urgency === 'high' ? '⚡' : urgency === 'low' ? '🕐' : '📋'}
                                        </div>
                                      </td>
                                      <td>
                                        <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold;">URGENCY</p>
                                        <p style="margin: 2px 0 0 0; color: ${urgency === 'urgent' ? '#ef4444' : urgency === 'high' ? '#f59e0b' : urgency === 'low' ? '#64748b' : '#10b981'}; font-size: 16px; font-weight: bold;">${urgencyLabels[urgency] || urgency}</p>
                                      </td>
                                    </tr>
                                  </table>

                                </td>
                              </tr>
                            </table>

                            <!-- Message Section -->
                            <h2 style="color: #f1f5f9; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">
                              💬 Message
                            </h2>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #065f46; border-radius: 16px; border-left: 4px solid #10b981; margin-bottom: 32px;">
                              <tr>
                                <td style="padding: 24px;">
                                  <p style="margin: 0; color: #e2e8f0; font-size: 16px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td align="center" style="padding-bottom: 32px;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                      <td style="background-color: #3b82f6; border-radius: 12px; text-align: center;">
                                        <a href="mailto:${email}" style="display: inline-block; padding: 16px 32px; color: white; text-decoration: none; font-weight: bold; font-size: 16px;">
                                          📧 Reply to ${name}
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding-top: 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1e293b; border-radius: 16px; border: 1px solid #334155;">
                        <tr>
                          <td align="center" style="padding: 24px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                              📅 Received on ${new Date().toLocaleString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short'
                              })}
                            </p>
                            <p style="margin: 0; color: #475569; font-size: 12px;">
                              This email was automatically generated from your portfolio contact form
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}
Urgency: ${urgencyLabels[urgency] || urgency}

Message:
${message}

Sent on: ${new Date().toLocaleString()}
      `
    };

    // Send email
    await transporter.sendMail(emailContent);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      error: 'Failed to send email. Please try again later or contact me directly.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.RECIPIENT_EMAIL || 'marcdelacruzesteban@gmail.com'}`);
});

module.exports = app;
