'use client';

import { useState } from 'react';
import { Copy, Trash2, Play } from 'lucide-react';

interface OutputTerminalProps {
  output: string;
  isRunning: boolean;
  onClear: () => void;
  className?: string;
}

export default function OutputTerminal({
  output,
  isRunning,
  onClear,
  className = ''
}: OutputTerminalProps) {
  const [copied, setCopied] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy output:', error);
    }
  };

  const getStatusColor = () => {
    if (isRunning) return 'bg-blue-500 animate-pulse';
    if (output.includes('Error') || output.includes('error') || output.includes('Compilation failed')) return 'bg-red-500';
    if (output && !isRunning) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (isRunning) return 'Executing...';
    if (output.includes('Error') || output.includes('error') || output.includes('Compilation failed')) return 'Error';
    if (output) return 'Success';
    return 'Ready';
  };

  const formatOutput = (text: string) => {
    if (!text) return null;

    return text.split('\n').map((line, index) => {
      let className = 'text-gray-300';

      if (line.toLowerCase().includes('error') || line.toLowerCase().includes('exception') || line.toLowerCase().includes('compilation failed')) {
        className = 'text-red-400 font-medium';
      } else if (line.toLowerCase().includes('warning')) {
        className = 'text-yellow-400';
      } else if (line.includes('Program executed successfully') || line.includes('exit code 0') || line.includes('Hello, World!')) {
        className = 'text-green-400 font-medium';
      } else if (line.includes('Compiling and running...')) {
        className = 'text-blue-400 italic';
      }

      return (
        <div key={index} className={className}>
          {line || '\u00A0'}
        </div>
      );
    });
  };

  return (
    <div className={`theme-output-bg theme-output-text rounded-xl theme-border overflow-hidden shadow-xl flex flex-col h-full ${className}`}>
      {/* Enhanced Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 theme-surface theme-border border-b flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} shadow-sm`} />
          <span className="text-sm font-semibold theme-text">Output Terminal</span>
          <span className="text-xs theme-text-secondary theme-card px-2 py-1 rounded-full">
            {getStatusText()}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs theme-text-secondary">
          {output && (
            <>
              <span className="theme-card px-2 py-1 rounded">
                {output.split('\n').length} lines
              </span>
              <span className="theme-card px-2 py-1 rounded">
                {output.length} chars
              </span>
            </>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 flex-1 min-h-0 overflow-y-auto font-mono text-sm leading-relaxed theme-scrollbar">
        {output ? (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 mb-3 theme-text-secondary text-xs">
              <span>$</span>
              <span>program execution</span>
            </div>
            {formatOutput(output)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center theme-text-secondary">
            <div className="space-y-4">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full">
                  <Play className="w-8 h-8 text-blue-400" />
                </div>
                {!isRunning && (
                  <div className="absolute inset-0 rounded-full opacity-20 animate-pulse bg-blue-500" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium mb-2 theme-text">
                  {isRunning ? 'Executing Code...' : 'Terminal Ready'}
                </p>
                <p className="text-sm opacity-75">
                  {isRunning ? 'Please wait while your code runs' : 'Click "Run Code" to execute your program'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Terminal Actions */}
      {output && (
        <div className="flex items-center justify-between px-4 py-3 theme-surface theme-border border-t flex-shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`p-2 rounded-lg text-sm transition-colors ${
                autoScroll
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'theme-card theme-text-secondary hover:theme-text'
              }`}
              title={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
            >
              Auto-scroll {autoScroll ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center space-x-2 p-2 rounded-lg theme-text-secondary hover:theme-text theme-card hover:theme-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={copied ? 'Copied!' : 'Copy output'}
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={onClear}
              disabled={!output}
              className="flex items-center space-x-2 p-2 rounded-lg theme-text-secondary hover:text-red-400 theme-card hover:theme-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Clear output"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Clear</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
