import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Info, Trash2, Terminal } from 'lucide-react';
import { useEmailService } from '@/hooks/useEmailService';

interface EmailTerminalProps {
  className?: string;
}

export const EmailTerminal: React.FC<EmailTerminalProps> = ({ className = '' }) => {
  const { logs, fetchLogs, clearLogs, isServerRunning } = useEmailService();
  const [isExpanded, setIsExpanded] = useState(false);

  const getLogIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Terminal Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all ${
          isServerRunning 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        <Terminal className="w-4 h-4" />
        <span className="text-sm font-medium">
          {isServerRunning ? 'Email Server' : 'Server Offline'}
        </span>
        <span className="text-xs opacity-75">({logs.length})</span>
      </button>

      {/* Terminal Window */}
      {isExpanded && (
        <div className="absolute bottom-12 right-0 w-96 h-80 bg-black border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Email Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchLogs}
                className="text-gray-400 hover:text-white transition-colors"
                title="Refresh logs"
              >
                <Terminal className="w-4 h-4" />
              </button>
              <button
                onClick={clearLogs}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Clear logs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Logs Content */}
          <div className="h-full overflow-y-auto p-4 font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No email logs yet</p>
                <p className="text-xs mt-1">Submit a form to see logs here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {logs.slice().reverse().map((log, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <span className="text-gray-500 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {getLogIcon(log.status)}
                    <div className="flex-1">
                      <span className={getLogColor(log.status)}>
                        [{log.type}]
                      </span>
                      <span className="text-gray-300 ml-2">
                        {log.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-1 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-medium ${
                isServerRunning ? 'text-green-400' : 'text-red-400'
              }`}>
                {isServerRunning ? '● Connected' : '● Disconnected'}
              </span>
              <span className="text-gray-400">
                {logs.length} logs
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
