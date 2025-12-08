import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Email configuration - Load from environment variables
// Note: Google App Passwords should not have spaces - remove spaces if present
const EMAIL_USER = process.env.EMAIL_USER || 'zyradigitalsofficial@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || 'nmcugwmikuxifur').replace(/\s+/g, ''); // Remove any spaces
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'zyradigitalsofficial@gmail.com';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Email logging for frontend terminal
let emailLogs: Array<{ timestamp: string; type: string; message: string; status: 'success' | 'error' | 'info' }> = [];

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

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, phone, businessType, message, formType } = req.body;
  
  try {
    addLog('EMAIL_REQUEST', `New ${formType} submission from ${name}`, 'info');
    
    // Email to admin
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

    // Email to user (confirmation)
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

    // Send emails
    await transporter.sendMail(adminMailOptions);
    addLog('ADMIN_EMAIL', `Admin notification sent for ${name}`, 'success');
    
    await transporter.sendMail(userMailOptions);
    addLog('USER_EMAIL', `Confirmation email sent to ${email}`, 'success');
    
    res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully!',
      logs: emailLogs.slice(-5) // Return last 5 logs for frontend display
    });
    
  } catch (error) {
    addLog('EMAIL_ERROR', `Failed to send email: ${error}`, 'error');
    console.error('Email sending error:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
      logs: emailLogs.slice(-5) // Return last 5 logs for frontend display
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
