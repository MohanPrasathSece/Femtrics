import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Simple email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.replace(/\s+/g, ''),
  },
});

export const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP Connection verified successfully');
    return true;
  } catch (error: any) {
    console.error('❌ SMTP Connection failed:', error.message);
    if (error.response?.includes('535-5.7.8')) {
      console.error('   -> Tip: This usually means your App Password is incorrect or expired.');
      console.error('   -> Ensure you generated a 16-character App Password from Google Account > Security.');
      if (process.env.EMAIL_PASS?.replace(/\s+/g, '').length !== 16) {
        console.error(`   -> WARNING: Your current password is ${process.env.EMAIL_PASS?.replace(/\s+/g, '').length} characters long. App Passwords are typically 16 characters.`);
      }
    }
    return false;
  }
};

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    await transporter.sendMail({
      from: `${name} <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      html: message
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    if (error.response?.includes('535-5.7.8')) {
      console.error('Authentication failed. Please check your EMAIL_USER and EMAIL_PASS variables.');
    }
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};

export const sendConfirmationEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, message, from } = req.body;

    // Log for debugging
    if (!to) {
      console.error('SERVER ERROR: Missing "to" field in confirmation email. Body:', req.body);
    }

    await transporter.sendMail({
      from: from || process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: message // Send as HTML
    });

    console.log(`✅ Confirmation email sent to ${to}`);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmailLogs = (req?: Request, res?: Response) => {
  if (res && res.json) {
    res.json({ logs: [] });
  } else {
    return { logs: [] };
  }
};

export const clearEmailLogs = (req: Request, res: Response) => {
  res.json({ message: 'Logs cleared' });
};
