'use client';

import { useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InputPanel({
  value,
  onChange,
  className = ''
}: InputPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy input:', error);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const lineCount = value.split('\n').length;
  const charCount = value.length;

  return (
    <div className={`theme-card rounded-xl theme-border overflow-hidden shadow-lg ${className}`}>
      {/* Input Header */}
      <div className="flex items-center justify-between px-4 py-3 theme-surface theme-border border-b">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md">
            <span className="text-xs text-white font-bold">📝</span>
          </div>
          <span className="text-sm font-semibold theme-text">
            Program Input (Optional)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs theme-text-secondary theme-card px-2 py-1 rounded">
            {lineCount} lines, {charCount} chars
          </span>
          <button
            onClick={handleCopy}
            disabled={!value}
            className="p-2 rounded-lg theme-text-secondary hover:theme-text theme-surface hover:theme-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={copied ? 'Copied!' : 'Copy input'}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            disabled={!value}
            className="p-2 rounded-lg theme-text-secondary hover:text-red-500 theme-surface hover:theme-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Clear input"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Content */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter input for your program (e.g., test data, user input)...&#10;Leave empty if your program doesn't require input."
          className="w-full h-36 px-4 py-3 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 font-mono text-sm theme-text placeholder-gray-500 dark:placeholder-gray-400 leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

