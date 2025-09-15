'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Settings, Code2 } from 'lucide-react';
import CodeEditor from '@/components/editor/CodeEditor';
import OutputTerminal from '@/components/editor/OutputTerminal';
import InputPanel from '@/components/editor/InputPanel';
import ThemeSelector from '@/components/ui/ThemeSelector';
import { LANGUAGES, getLanguageById, getDefaultLanguage } from '@/lib/languages';
import { loadTheme, getStoredTheme, applyTheme, getThemeById, THEMES } from '@/lib/themes';
import type { Language, CompilationResult } from '@/types';

export default function CompilerLayout() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getDefaultLanguage());
  const [code, setCode] = useState<string>(getDefaultLanguage().defaultCode);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentThemeId, setCurrentThemeId] = useState<string>('light');
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  const [isThemeChanging, setIsThemeChanging] = useState<boolean>(false);

  // Load theme on mount
  useEffect(() => {
    const theme = loadTheme();
    setCurrentThemeId(theme.id);
    applyTheme(theme);
  }, []);

  const handleLanguageChange = (languageId: string) => {
    const language = getLanguageById(languageId);
    if (language) {
      setSelectedLanguage(language);
      setCode(language.defaultCode);
      setOutput('');
    }
  };

  const handleRunCode = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput('Compiling and running...');

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage.id,
          code: code,
          input: input,
        }),
      });

      const result: CompilationResult = await response.json();

      if (response.ok && result.success) {
        setOutput(result.output || 'Program executed successfully');
      } else {
        setOutput(`Error: ${result.error || 'Compilation failed'}`);
      }
    } catch (error) {
      setOutput(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, selectedLanguage.id, code, input]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isRunning) {
        e.preventDefault();
        handleRunCode();
      }
      // Ctrl+Shift+T to open theme selector
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setShowThemeSelector(true);
      }
      // Ctrl+L to clear output
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setOutput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, handleRunCode]);

  const handleThemeChange = async (themeId: string) => {
    if (isThemeChanging || themeId === currentThemeId) return;

    setIsThemeChanging(true);

    // Update state immediately for UI responsiveness
    setCurrentThemeId(themeId);

    // Apply theme with smooth transition
    const theme = getThemeById(themeId);
    if (theme) {
      try {
        await applyTheme(theme);
      } catch (error) {
        console.error('Failed to apply theme:', error);
      }
    }

    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsThemeChanging(false);
    }, 300);
  };

  const isDarkTheme = ['dark', 'monokai', 'github-dark', 'dracula', 'vscode-dark', 'solarized-dark', 'nord', 'gruvbox-dark', 'tokyo-night', 'oceanic-next', 'palenight', 'synthwave', 'cyberpunk', 'material-dark'].includes(currentThemeId);

  return (
    <div className="min-h-screen theme-bg transition-colors duration-500">
      {/* Enhanced Header */}
      <header className="theme-card backdrop-blur-md shadow-xl theme-border border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl shadow-lg">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold theme-text">
                  CodeForge
                </h1>
                <p className="text-sm theme-text-secondary font-medium">
                  Professional Online Code Compiler
                </p>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center space-x-6">
              {/* Inline Theme Selector */}
              <div className="hidden md:flex items-center space-x-2 theme-surface rounded-lg p-1 shadow-sm theme-border border">
                {THEMES.slice(0, 5).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    disabled={isThemeChanging}
                    className={`relative p-2 rounded-md transition-all duration-200 ${
                      currentThemeId === theme.id
                        ? 'theme-card scale-110 shadow-md'
                        : 'theme-surface hover:scale-105'
                    } ${isThemeChanging ? 'opacity-60 cursor-not-allowed' : ''}`}
                    title={`Switch to ${theme.name} theme`}
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded-full border theme-border"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border theme-border"
                        style={{ backgroundColor: theme.colors.surface }}
                      />
                    </div>
                    {currentThemeId === theme.id && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 theme-primary rounded-full theme-border"></div>
                    )}
                  </button>
                ))}
                <button
                  onClick={() => setShowThemeSelector(true)}
                  className="p-2 theme-text-secondary hover:theme-text rounded-md transition-colors"
                  title="More themes"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Theme Button */}
              <button
                onClick={() => setShowThemeSelector(true)}
                className="md:hidden p-2 theme-text-secondary hover:theme-text theme-surface hover:theme-card rounded-lg transition-colors"
                title="Choose theme"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Enhanced Run Button */}
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="group flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isRunning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    <span>Run Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 h-[calc(100vh-160px)]">
          {/* Left Column - Code Editor (3/5 width on desktop) */}
          <div className="xl:col-span-3 flex flex-col h-full">
            {/* Language Selector and Editor Header */}
            <div className="theme-card rounded-xl shadow-lg theme-border border p-4 flex-shrink-0 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold theme-text">
                    Code Editor
                  </h2>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm theme-text-secondary">Language:</span>
                  <select
                    value={selectedLanguage.id}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-4 py-2 theme-border border rounded-lg theme-card theme-text focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Enhanced Code Editor - Equal Height to Output Terminal */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="theme-surface px-4 py-3 theme-border border rounded-t-xl border-b flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm" />
                  </div>
                  <span className="text-sm font-medium theme-text ml-2">
                    {selectedLanguage.name}
                  </span>
                  <div className="ml-auto flex items-center space-x-4 text-xs theme-text-secondary">
                    <span className="theme-card px-2 py-1 rounded">
                      {code.split('\n').length} lines
                    </span>
                    <span className="theme-card px-2 py-1 rounded">
                      {code.length} chars
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={selectedLanguage.id}
                  theme={isDarkTheme ? 'dark' : 'light'}
                  height="100%"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Input & Output (2/5 width on desktop) */}
          <div className="xl:col-span-2 flex flex-col h-full space-y-4">
            {/* Keyboard Shortcuts */}
            <div className="theme-card rounded-xl shadow-lg theme-border border p-3 flex-shrink-0">
              <div className="flex flex-col space-y-2">
                {/* Header */}
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-blue-500 text-base">⌨️</span>
                  <strong className="theme-text font-semibold text-sm">Shortcuts</strong>
                </div>

                {/* Shortcuts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2 justify-center">
                    <kbd className="px-2 py-1 theme-surface theme-border rounded shadow-sm font-mono text-xs theme-text border min-w-[70px] text-center">
                      Ctrl+Enter
                    </kbd>
                    <span className="text-xs theme-text-secondary whitespace-nowrap">Run</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center">
                    <kbd className="px-2 py-1 theme-surface theme-border rounded shadow-sm font-mono text-xs theme-text border min-w-[70px] text-center">
                      Ctrl+Shift+T
                    </kbd>
                    <span className="text-xs theme-text-secondary whitespace-nowrap">Themes</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center">
                    <kbd className="px-2 py-1 theme-surface theme-border rounded shadow-sm font-mono text-xs theme-text border min-w-[70px] text-center">
                      Ctrl+L
                    </kbd>
                    <span className="text-xs theme-text-secondary whitespace-nowrap">Clear</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Panel - Fixed Height */}
            <div className="flex-shrink-0">
              <InputPanel
                value={input}
                onChange={setInput}
              />
            </div>

            {/* Output Terminal - Flexible Height */}
            <div className="flex-1 min-h-0">
              <OutputTerminal
                output={output}
                isRunning={isRunning}
                onClear={() => setOutput('')}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Theme Selector Modal */}
      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        currentThemeId={currentThemeId}
        onThemeChange={handleThemeChange}
        isChanging={isThemeChanging}
      />
    </div>
  );
}
