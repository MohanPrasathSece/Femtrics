import express from 'express';
import cors from 'cors';
import { sendEmail, getEmailLogs, clearEmailLogs } from './emailService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email routes
app.post('/api/send-email', sendEmail);
app.get('/api/email-logs', getEmailLogs);
app.delete('/api/email-logs', clearEmailLogs);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Email logs: http://localhost:${PORT}/api/email-logs`);
});
