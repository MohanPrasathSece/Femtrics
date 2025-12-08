import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// Email configuration - Load from environment variables
// Note: Google App Passwords should not have spaces - remove spaces if present
const EMAIL_USER = process.env.EMAIL_USER || 'harshinik290@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || 'nmcugwmikuxifur').replace(/\s+/g, ''); // Remove any spaces
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'harshinik290@gmail.com';

// Create transporter with optimized settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  // Connection settings for faster delivery
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
  pool: true, // Use connection pooling
  maxConnections: 5, // Max 5 connections
  maxMessages: 100, // Max 100 messages per connection
  rateDelta: 1000, // 1 second
  rateLimit: 5, // Max 5 messages per second
});

// Email logging for frontend terminal
let emailLogs: Array<{ timestamp: string; type: string; message: string; status: 'success' | 'error' | 'info' }> = [];

// Local backup directory
const BACKUP_DIR = path.join(__dirname, '../backups');
const ensureBackupDir = () => {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
};

// Save submission to local file
const saveSubmissionToFile = (data: any) => {
  try {
    ensureBackupDir();
    const filename = `submission_${Date.now()}_${data.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    const filepath = path.join(BACKUP_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      backupFile: filename
    }, null, 2));
    addLog('FILE_BACKUP', `Submission saved to ${filename}`, 'success');
  } catch (error) {
    addLog('BACKUP_ERROR', `Failed to save submission: ${error}`, 'error');
  }
};

const addLog = (type: string, message: string, status: 'success' | 'error' | 'info' = 'info') => {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    message,
    status
  };
  emailLogs.push(log);
  
  // Keep only last 100 logs
  if (emailLogs.length > 100) {
    emailLogs = emailLogs.slice(-100);
  }
  
  // Log to console as well
  console.log(`[${status.toUpperCase()}] ${type}: ${message}`);
};

// Email queue for background processing
const emailQueue: Array<{
  adminMailOptions: any;
  userMailOptions: any;
  name: string;
  email: string;
  timestamp: Date;
}> = [];

// Process emails in background
const processEmailQueue = async () => {
  if (emailQueue.length === 0) return;
  
  const email = emailQueue.shift();
  if (!email) return;
  
  try {
    // Try to send with a very short timeout
    await Promise.race([
      transporter.sendMail(email.adminMailOptions),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Admin email timeout')), 5000))
    ]);
    addLog('ADMIN_EMAIL', `Admin notification sent for ${email.name}`, 'success');
  } catch (error) {
    addLog('ADMIN_EMAIL_ERROR', `Failed to send admin email: ${error}`, 'error');
  }
  
  try {
    // Try to send with a very short timeout
    await Promise.race([
      transporter.sendMail(email.userMailOptions),
      new Promise((_, reject) => setTimeout(() => reject(new Error('User email timeout')), 5000))
    ]);
    addLog('USER_EMAIL', `Confirmation email sent to ${email.email}`, 'success');
  } catch (error) {
    addLog('USER_EMAIL_ERROR', `Failed to send user email: ${error}`, 'error');
  }
};

// Process queue every 30 seconds
setInterval(processEmailQueue, 30000);

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, phone, businessType, message, formType } = req.body;
  
  try {
    addLog('EMAIL_REQUEST', `New ${formType} submission from ${name}`, 'info');
    
    // Quick validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create email options
    const adminMailOptions = {
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New ${formType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">Femtrics - New ${formType}</h2>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #ec4899; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              ${businessType ? `<p><strong>Business Type:</strong> ${businessType}</p>` : ''}
              ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
            </div>
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
              <p>This email was sent from the Femtrics website</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Thank you for your ${formType} - Femtrics`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">Thank you for contacting Femtrics!</h2>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p>Dear ${name},</p>
              <p>Thank you for your interest in Femtrics! We have received your ${formType.toLowerCase()} and will get back to you within 24-48 hours.</p>
              <p>Here's what happens next:</p>
              <ul style="color: #ec4899;">
                <li>We'll review your submission</li>
                <li>Our team will contact you to discuss next steps</li>
                <li>We'll help you get started with data-driven business growth</li>
              </ul>
              <p>If you have any questions, feel free to reply to this email.</p>
              <p>Best regards,<br/>The Femtrics Team</p>
            </div>
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
              <p>Empowering women entrepreneurs with data-driven insights</p>
              <p>Hyderabad, India | www.femtrics.in</p>
            </div>
          </div>
        </div>
      `,
    };

    // Add to queue for background processing
    emailQueue.push({
      adminMailOptions,
      userMailOptions,
      name,
      email,
      timestamp: new Date()
    });

    // Save to local file as backup
    saveSubmissionToFile({
      name, email, phone, businessType, message, formType
    });

    addLog('EMAIL_QUEUED', `Email queued for ${name}`, 'success');
    
    // Try immediate processing (but don't wait for it)
    processEmailQueue().catch(() => {}); // Ignore errors, will be processed later
    
    // Return immediately
    res.status(200).json({ 
      success: true, 
      message: 'Your submission has been received successfully!',
      logs: emailLogs.slice(-5)
    });
    
  } catch (error) {
    addLog('EMAIL_ERROR', `Failed to process submission: ${error}`, 'error');
    console.error('Email processing error:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process submission',
      error: error instanceof Error ? error.message : 'Unknown error',
      logs: emailLogs.slice(-5)
    });
  }
};

export const getEmailLogs = (req: Request, res: Response) => {
  res.status(200).json({
    logs: emailLogs,
    total: emailLogs.length
  });
};

export const clearEmailLogs = (req: Request, res: Response) => {
  emailLogs = [];
  addLog('SYSTEM', 'Email logs cleared', 'info');
  res.status(200).json({ message: 'Email logs cleared successfully' });
};
