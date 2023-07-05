import React, { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  setAppropriateTheme: (desiredTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== `undefined`) {
      const storedTheme = localStorage.getItem(`theme`);
      return (storedTheme as Theme) || `light`;
    }
    return `light`;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === `light` ? `dark` : `light`));
  };

  const setAppropriateTheme = (desiredTheme: Theme) => {
    if (theme !== desiredTheme) toggleTheme();
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      localStorage.setItem(`theme`, theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setAppropriateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
