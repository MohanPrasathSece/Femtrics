import { useState, useEffect } from 'react';

interface EmailLog {
  timestamp: string;
  type: string;
  message: string;
  status: 'success' | 'error' | 'info';
}

interface EmailResponse {
  success: boolean;
  message: string;
  logs?: EmailLog[];
  error?: string;
}

export const useEmailService = () => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(false);

  // Check server health
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        setIsServerRunning(response.ok);
      } catch (error) {
        setIsServerRunning(false);
        console.log('Email server not running');
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Send email
  const sendEmail = async (formData: {
    name: string;
    email: string;
    phone: string;
    businessType?: string;
    message?: string;
    formType: string;
    userEmail?: string; // For confirmation emails
  }): Promise<EmailResponse> => {
    setIsLoading(true);
    
    try {
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const result = await response.json();
      
      if (result.logs) {
        setLogs(prev => [...prev, ...result.logs]);
      }
      
      // Handle timeout specifically
      if (response.status === 408) {
        return {
          ...result,
          success: true, // Treat timeout as success since form was received
          message: 'Your submission was received! We\'ll contact you soon.'
        };
      }
      
      return result;
    } catch (error) {
      // Handle aborted request (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutResult: EmailResponse = {
          success: true, // Treat as success since form was likely received
          message: 'Your submission was received! We\'ll contact you soon.',
          error: 'Request timeout but submission processed'
        };
        
        setLogs(prev => [...prev, {
          timestamp: new Date().toISOString(),
          type: 'TIMEOUT_SUCCESS',
          message: 'Request timed out but submission was likely received',
          status: 'success'
        }]);
        
        return timeoutResult;
      }
      
      const errorResult: EmailResponse = {
        success: false,
        message: 'Failed to connect to email server',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        type: 'CONNECTION_ERROR',
        message: errorResult.message,
        status: 'error'
      }]);
      
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  };

  // Send confirmation email to user
  const sendConfirmationEmail = async (userData: {
    name: string;
    email: string;
    formType: string;
    customMessage?: string;
  }): Promise<EmailResponse> => {
    setIsLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const confirmationData = {
        ...userData,
        isConfirmation: true,
        businessType: 'Confirmation',
        message: userData.customMessage || `Thank you for your ${userData.formType}! We have received your submission and will get back to you soon.`,
        phone: 'N/A'
      };

      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const result = await response.json();
      
      if (result.logs) {
        setLogs(prev => [...prev, ...result.logs]);
      }
      
      return result;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't fail the whole process if confirmation email fails
      return {
        success: true,
        message: 'Main email sent, confirmation email may have failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Get email logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/email-logs');
      const result = await response.json();
      setLogs(result.logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  // Clear logs
  const clearLogs = async () => {
    try {
      await fetch('http://localhost:3001/api/email-logs', { method: 'DELETE' });
      setLogs([]);
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  return {
    sendEmail,
    sendConfirmationEmail,
    fetchLogs,
    clearLogs,
    logs,
    isLoading,
    isServerRunning
  };
};
