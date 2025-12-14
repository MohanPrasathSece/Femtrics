const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create Gmail transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email sending endpoint
app.post('/api/send-email', upload.single('file'), async (req, res) => {
  try {
    const { to, subject, message, from, cc, bcc, attachments } = req.body;

    // Parse attachments if provided
    let emailAttachments = [];

    // Handle uploaded file
    if (req.file) {
      emailAttachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype
      });
    }

    // Handle additional attachments from form data
    if (attachments) {
      try {
        const parsedAttachments = JSON.parse(attachments);
        emailAttachments = [...emailAttachments, ...parsedAttachments];
      } catch (e) {
        console.error('Error parsing attachments:', e);
      }
    }

    const mailOptions = {
      from: from || process.env.EMAIL_USER,
      to: to || process.env.ADMIN_EMAIL,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject: subject,
      html: message,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Send confirmation email endpoint
app.post('/api/send-confirmation', async (req, res) => {
  try {
    const { to, subject, message, from } = req.body;

    const mailOptions = {
      from: from || process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Confirmation email sent successfully'
    });

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email - Femtrics Email Service',
      html: `
        <h2>Test Email Successful</h2>
        <p>This is a test email to verify the Gmail SMTP configuration is working correctly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>To:</strong> ${process.env.ADMIN_EMAIL}</p>
        <hr>
        <p><em>Femtrics Email Service - Gmail SMTP</em></p>
      `
    };

    const info = await transporter.sendMail(testMailOptions);
    console.log('Test email sent:', info.messageId);

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Test email sent successfully'
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Gmail SMTP configured for: ${process.env.EMAIL_USER}`);
  console.log(`Admin email: ${process.env.ADMIN_EMAIL}`);
});

module.exports = app;
