import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email configuration - Load from environment variables
const SMTP_USER = process.env.EMAIL_USER || 'mohanprasath563@gmail.com';
const SMTP_PASS = (process.env.EMAIL_PASS || 'dyys zlaj bzdv bbwo').replace(/\s+/g, '');
const RECIPIENT_EMAIL = process.env.ADMIN_EMAIL || 'harshinik290@gmail.com';

// Debug logging
console.log('=== EMAIL CONFIG DEBUG ===');
console.log('SMTP_USER:', SMTP_USER);
console.log('SMTP_PASS length:', SMTP_PASS.length);
console.log('SMTP_PASS format:', SMTP_PASS.includes(' ') ? 'HAS SPACES' : 'NO SPACES');
console.log('RECIPIENT_EMAIL:', RECIPIENT_EMAIL);
console.log('========================');

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Email validation schema
const emailSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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
  try {
    addLog('EMAIL_REQUEST', `New email request received`, 'info');

    // Validate request body
    const validatedData = emailSchema.parse(req.body);
    addLog('VALIDATION_SUCCESS', `Form validated for ${validatedData.name}`, 'success');

    // Email options
    const mailOptions = {
      from: `"${validatedData.name}" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Contact: ${validatedData.subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div style="background: #000000; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 1px;">
              FEMTRICS
            </h1>
            <p style="margin: 4px 0 0; color: #ffffff; font-size: 13px; opacity: 0.9;">
              New Contact Form Submission
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            
            <!-- Contact Info Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #e9ecef;">
                  <th colspan="2" style="padding: 15px; text-align: left; color: #495057; font-size: 14px; font-weight: 600; border-bottom: 1px solid #dee2e6;">
                    Contact Information
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #dee2e6;">
                  <td style="padding: 15px; color: #6c757d; font-size: 14px; font-weight: 500; width: 120px;">
                    Name
                  </td>
                  <td style="padding: 15px; color: #212529; font-size: 14px; font-weight: 500;">
                    ${validatedData.name}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #dee2e6;">
                  <td style="padding: 15px; color: #6c757d; font-size: 14px; font-weight: 500;">
                    Email
                  </td>
                  <td style="padding: 15px; color: #212529; font-size: 14px;">
                    <a href="mailto:${validatedData.email}" style="color: #007bff; text-decoration: none; font-weight: 500;">
                      ${validatedData.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; color: #6c757d; font-size: 14px; font-weight: 500;">
                    Subject
                  </td>
                  <td style="padding: 15px; color: #212529; font-size: 14px; font-weight: 500;">
                    ${validatedData.subject}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Message Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #e9ecef;">
                  <th style="padding: 15px; text-align: left; color: #495057; font-size: 14px; font-weight: 600; border-bottom: 1px solid #dee2e6;">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 20px; color: #212529; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                    ${validatedData.message}
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; color: #6c757d; font-size: 12px;">
              Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
          
        </div>
      `,
    };

    // Send email
    console.log(`Attempting to send email | From: ${mailOptions.from} | To: ${mailOptions.to}`);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    addLog('ADMIN_EMAIL', `Email sent to ${RECIPIENT_EMAIL}`, 'success');

    // Send confirmation email to the user
    const confirmationOptions = {
      from: `"Femtrics" <${SMTP_USER}>`,
      to: validatedData.email,
      subject: 'Thank you for contacting Femtrics',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div style="background: #000000; padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600; letter-spacing: 0.5px;">
              FEMTRICS
            </h1>
            <p style="margin: 4px 0 0; color: #ffffff; font-size: 12px; opacity: 0.8;">
              Thank You for Your Message
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            
            <div style="margin-bottom: 32px;">
              <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                Hello ${validatedData.name},
              </h2>
              <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                We've received your message and will get back to you within 24-48 hours.
              </p>
            </div>
            
            <!-- Message Summary -->
            <div style="margin-bottom: 32px;">
              <h3 style="margin: 0 0 12px; color: #1a1a1a; font-size: 14px; font-weight: 600;">
                Your Message Summary
              </h3>
              <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 12px;">Subject</span>
                  <p style="margin: 4px 0 0; color: #1a1a1a; font-weight: 500; font-size: 14px;">
                    ${validatedData.subject}
                  </p>
                </div>
                <div>
                  <span style="color: #6b7280; font-size: 12px;">Message</span>
                  <p style="margin: 4px 0 0; color: #374151; font-size: 14px; line-height: 1.5;">
                    ${validatedData.message.substring(0, 150)}${validatedData.message.length > 150 ? '...' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="margin-bottom: 32px;">
              <h3 style="margin: 0 0 12px; color: #1a1a1a; font-size: 14px; font-weight: 600;">
                What Happens Next
              </h3>
              <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
                <div style="display: grid; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 4px; height: 4px; background: #000000; border-radius: 50%;"></div>
                    <span style="color: #374151; font-size: 13px;">Our team reviews your inquiry</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 4px; height: 4px; background: #000000; border-radius: 50%;"></div>
                    <span style="color: #374151; font-size: 13px;">We'll respond within 24-48 hours</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 4px; height: 4px; background: #000000; border-radius: 50%;"></div>
                    <span style="color: #374151; font-size: 13px;">Personalized solutions for your business</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
              © 2024 Femtrics. All rights reserved.
            </p>
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
          
        </div>
      `,
    };

    console.log(`Attempting to send confirmation email | From: ${confirmationOptions.from} | To: ${confirmationOptions.to}`);
    await transporter.sendMail(confirmationOptions);
    console.log('Confirmation email sent successfully');
    addLog('CONFIRMATION_EMAIL', `Confirmation email sent to ${validatedData.email}`, 'success');

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      logs: emailLogs.slice(-5)
    });

  } catch (error) {
    console.error('Error sending email:', error);
    addLog('EMAIL_ERROR', `Failed to send email: ${error}`, 'error');

    if (error instanceof z.ZodError) {
      addLog('VALIDATION_ERROR', `Form validation failed`, 'error');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      logs: emailLogs.slice(-5)
    });
  }
};

export const sendConfirmationEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, message, from } = req.body;

    addLog('CONFIRMATION_EMAIL', `Sending confirmation to: ${to}`, 'info');

    const mailOptions = {
      from: from || SMTP_USER,
      to: to,
      subject: subject,
      html: message
    };

    const info = await transporter.sendMail(mailOptions);
    addLog('CONFIRMATION_EMAIL', `Confirmation email sent: ${info.messageId}`, 'success');
    
    res.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Confirmation email sent successfully' 
    });

  } catch (error) {
    addLog('CONFIRMATION_EMAIL_ERROR', `Failed to send confirmation: ${error}`, 'error');
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
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
