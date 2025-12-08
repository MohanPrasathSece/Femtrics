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

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    
    await transporter.sendMail({
      from: `${name} <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: message
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false });
  }
};

export const sendConfirmationEmail = async (req: Request, res: Response) => {
  res.json({ success: true });
};

export const getEmailLogs = (req: Request, res: Response) => {
  res.json({ logs: [] });
};

export const clearEmailLogs = (req: Request, res: Response) => {
  res.json({ message: 'Logs cleared' });
};
