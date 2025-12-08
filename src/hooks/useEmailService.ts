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
  }): Promise<EmailResponse> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.logs) {
        setLogs(prev => [...prev, ...result.logs]);
      }
      
      return result;
    } catch (error) {
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
    fetchLogs,
    clearLogs,
    logs,
    isLoading,
    isServerRunning
  };
};
