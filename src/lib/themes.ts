import type { Theme } from '@/types';

export const THEMES: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      background: '#ffffff',
      surface: '#f8fafc',
      card: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      outputBackground: '#0f172a',
      outputText: '#e2e8f0'
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      background: '#0f172a',
      surface: '#1e293b',
      card: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      outputBackground: '#020617',
      outputText: '#cbd5e1'
    }
  },
  {
    id: 'monokai',
    name: 'Monokai',
    colors: {
      primary: '#f92672',
      primaryHover: '#e91e63',
      background: '#2f3129',
      surface: '#49483e',
      card: '#49483e',
      text: '#f8f8f2',
      textSecondary: '#a59f85',
      border: '#75715e',
      outputBackground: '#272822',
      outputText: '#f8f8f2'
    }
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    colors: {
      primary: '#58a6ff',
      primaryHover: '#388bfd',
      background: '#0d1117',
      surface: '#161b22',
      card: '#161b22',
      text: '#f0f6fc',
      textSecondary: '#c9d1d9',
      border: '#30363d',
      outputBackground: '#010409',
      outputText: '#f0f6fc'
    }
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      primary: '#bd93f9',
      primaryHover: '#a855f7',
      background: '#282a36',
      surface: '#44475a',
      card: '#44475a',
      text: '#f8f8f2',
      textSecondary: '#6272a4',
      border: '#6272a4',
      outputBackground: '#21222c',
      outputText: '#f8f8f2'
    }
  },
  {
    id: 'vscode-dark',
    name: 'VS Code Dark',
    colors: {
      primary: '#007acc',
      primaryHover: '#005a9e',
      background: '#1e1e1e',
      surface: '#252526',
      card: '#252526',
      text: '#cccccc',
      textSecondary: '#858585',
      border: '#3e3e42',
      outputBackground: '#0e0e0e',
      outputText: '#cccccc'
    }
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    colors: {
      primary: '#268bd2',
      primaryHover: '#2aa198',
      background: '#002b36',
      surface: '#073642',
      card: '#073642',
      text: '#839496',
      textSecondary: '#586e75',
      border: '#586e75',
      outputBackground: '#001b26',
      outputText: '#93a1a1'
    }
  },
  {
    id: 'nord',
    name: 'Nord',
    colors: {
      primary: '#88c0d0',
      primaryHover: '#81a1c1',
      background: '#2e3440',
      surface: '#3b4252',
      card: '#3b4252',
      text: '#eceff4',
      textSecondary: '#d8dee9',
      border: '#4c566a',
      outputBackground: '#242933',
      outputText: '#e5e9f0'
    }
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    colors: {
      primary: '#fe8019',
      primaryHover: '#d65d0e',
      background: '#282828',
      surface: '#3c3836',
      card: '#3c3836',
      text: '#ebdbb2',
      textSecondary: '#bdae93',
      border: '#504945',
      outputBackground: '#1d2021',
      outputText: '#d5c4a1'
    }
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    colors: {
      primary: '#7dcfff',
      primaryHover: '#65bcff',
      background: '#1a1b26',
      surface: '#16161e',
      card: '#16161e',
      text: '#a9b1d6',
      textSecondary: '#565f89',
      border: '#565f89',
      outputBackground: '#0f0f23',
      outputText: '#9aa5ce'
    }
  },
  {
    id: 'oceanic-next',
    name: 'Oceanic Next',
    colors: {
      primary: '#99c794',
      primaryHover: '#6699cc',
      background: '#1b2b34',
      surface: '#343d46',
      card: '#343d46',
      text: '#d8dee9',
      textSecondary: '#65737e',
      border: '#4f5b66',
      outputBackground: '#0f1419',
      outputText: '#c0c5ce'
    }
  },
  {
    id: 'palenight',
    name: 'Palenight',
    colors: {
      primary: '#c792ea',
      primaryHover: '#ab47bc',
      background: '#292d3e',
      surface: '#3e4b59',
      card: '#3e4b59',
      text: '#a6accd',
      textSecondary: '#697098',
      border: '#697098',
      outputBackground: '#212337',
      outputText: '#959dcb'
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    colors: {
      primary: '#ff007c',
      primaryHover: '#ff4081',
      background: '#2a2139',
      surface: '#34294f',
      card: '#34294f',
      text: '#f92aad',
      textSecondary: '#848bbd',
      border: '#495495',
      outputBackground: '#1a1625',
      outputText: '#e2e9e9'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      primary: '#00ff9f',
      primaryHover: '#00e676',
      background: '#0d001a',
      surface: '#1a0033',
      card: '#1a0033',
      text: '#00ff9f',
      textSecondary: '#b794f6',
      border: '#7c3aed',
      outputBackground: '#000011',
      outputText: '#00ffff'
    }
  },
  {
    id: 'material-dark',
    name: 'Material Dark',
    colors: {
      primary: '#6200ea',
      primaryHover: '#3700b3',
      background: '#121212',
      surface: '#1e1e1e',
      card: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#b3b3b3',
      border: '#333333',
      outputBackground: '#000000',
      outputText: '#e0e0e0'
    }
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return THEMES.find(theme => theme.id === id);
};

export const getDefaultTheme = (): Theme => {
  return THEMES[0];
};

export const applyTheme = (theme: Theme): Promise<void> => {
  return new Promise((resolve) => {
    const root = document.documentElement;

    // Apply CSS custom properties with a slight delay to ensure smooth transition
    requestAnimationFrame(() => {
      // Set data-theme attribute for CSS rule targeting
      root.setAttribute('data-theme', theme.id);

      // Apply CSS custom properties for backward compatibility and dynamic styling
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });

      // Store theme preference
      localStorage.setItem('preferred-theme', theme.id);

      // Resolve after a short delay to allow CSS transitions to complete
      setTimeout(resolve, 50);
    });
  });
};

export const getStoredTheme = (): string => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem('preferred-theme');
  return stored || 'light';
};

export const loadTheme = (): Theme => {
  const themeId = getStoredTheme();
  const theme = getThemeById(themeId);
  return theme || getDefaultTheme();
};
