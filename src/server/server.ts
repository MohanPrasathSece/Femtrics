import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { sendEmail, getEmailLogs, clearEmailLogs, sendConfirmationEmail } from './emailService';

// Extend Express Request type to include file
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());

// Email routes
app.post('/api/send-email', upload.single('file'), sendEmail);
app.post('/api/send-confirmation', sendConfirmationEmail);
app.get('/api/email-logs', getEmailLogs);
app.delete('/api/email-logs', clearEmailLogs);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Email logs: http://localhost:${PORT}/api/email-logs`);
  console.log('\n=== EMAIL LOGS WILL APPEAR HERE WHEN FORMS ARE SUBMITTED ===\n');
});

// Display email logs in console every 30 seconds
setInterval(() => {
  import('./emailService').then(({ getEmailLogs }) => {
    const mockReq = {} as any;
    const mockRes = {
      status: () => ({ json: (data: any) => {
        if (data.logs && data.logs.length > 0) {
          console.log('\n=== EMAIL LOGS ===');
          data.logs.slice(-5).forEach((log: any) => {
            console.log(`[${log.timestamp}] ${log.type}: ${log.message} (${log.status})`);
          });
          console.log('================\n');
        }
      }})
    } as any;
    getEmailLogs(mockReq, mockRes);
  });
}, 30000);
