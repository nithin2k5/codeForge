'use client';

import { useEffect, useState } from 'react';
import { getStoredTheme, applyTheme, getThemeById } from '@/lib/themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Apply the stored theme on client-side mount
    const themeId = getStoredTheme();
    const theme = getThemeById(themeId);
    
    if (theme) {
      applyTheme(theme);
    }
    
    setIsLoaded(true);
  }, []);

  // Prevent hydration mismatch by not rendering until client-side theme is loaded
  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}

