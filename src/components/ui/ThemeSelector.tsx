'use client';

import { useState, useEffect } from 'react';
import { Palette, X } from 'lucide-react';
import { THEMES, applyTheme, getStoredTheme } from '@/lib/themes';
import type { Theme } from '@/types';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  isChanging?: boolean;
}

export default function ThemeSelector({ isOpen, onClose, currentThemeId, onThemeChange, isChanging = false }: ThemeSelectorProps) {
  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
      <div className="theme-card rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between px-8 py-6 theme-border border-b theme-surface">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${isChanging ? 'bg-orange-100 dark:bg-orange-900 scale-110' : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900'}`}>
              {isChanging ? (
                <div className="w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold theme-text">
                Choose Your Theme
              </h2>
              <p className="text-sm theme-text-secondary mt-1">
                {isChanging ? 'Applying your selected theme...' : 'Select a color scheme that suits your style'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isChanging}
            className="p-2 theme-surface hover:theme-card rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <X className="w-6 h-6 theme-text-secondary group-hover:theme-text" />
          </button>
        </div>

        {/* Enhanced Theme Grid */}
        <div className="p-8 max-h-[60vh] overflow-y-auto theme-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                disabled={isChanging}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 theme-border ${
                  currentThemeId === theme.id
                    ? 'border-blue-500 theme-surface shadow-lg shadow-blue-500/25'
                    : 'theme-card hover:theme-surface hover:shadow-lg'
                } ${isChanging ? 'opacity-60 cursor-not-allowed scale-95' : 'hover:-translate-y-1'}`}
              >
                {/* Current Theme Indicator */}
                {currentThemeId === theme.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col space-y-4">
                  {/* Theme Preview Colors */}
                  <div className="flex justify-center space-x-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-5 h-5 rounded-full border-2 theme-border shadow-sm ring-2 theme-border"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border-2 theme-border shadow-sm ring-2 theme-border"
                        style={{ backgroundColor: theme.colors.surface }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border-2 theme-border shadow-sm ring-2 theme-border"
                        style={{ backgroundColor: theme.colors.text }}
                      />
                    </div>
                  </div>

                  {/* Theme Name */}
                  <div className="text-center">
                    <span className="font-semibold theme-text text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {theme.name}
                    </span>
                  </div>

                  {/* Theme Description */}
                  <div className="text-center text-xs theme-text-secondary leading-relaxed">
                    {theme.id === 'light' && '✨ Clean and bright interface'}
                    {theme.id === 'dark' && '🌙 Easy on the eyes in low light'}
                    {theme.id === 'monokai' && '🎨 Classic code editor theme'}
                    {theme.id === 'github-dark' && '🚀 Inspired by GitHub Dark'}
                    {theme.id === 'dracula' && '🧛 Popular dark theme'}
                    {theme.id === 'vscode-dark' && '💻 VS Code inspired'}
                    {theme.id === 'solarized-dark' && '☀️ Carefully balanced colors'}
                    {theme.id === 'nord' && '❄️ Arctic-inspired theme'}
                    {theme.id === 'gruvbox-dark' && '🌾 Warm, earthy colors'}
                    {theme.id === 'tokyo-night' && '🌃 Modern night theme'}
                    {theme.id === 'oceanic-next' && '🌊 Oceanic color palette'}
                    {theme.id === 'palenight' && '🌌 Soft purple theme'}
                    {theme.id === 'synthwave' && '🌈 Retro-futuristic vibe'}
                    {theme.id === 'cyberpunk' && '🤖 Neon cyberpunk aesthetic'}
                    {theme.id === 'material-dark' && '📱 Material Design inspired'}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-500 to-indigo-600 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="px-8 py-6 theme-surface theme-border border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Theme preferences are saved automatically</span>
            </div>
            <button
              onClick={onClose}
              disabled={isChanging}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isChanging ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Applying...</span>
                </div>
              ) : (
                'Done'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
