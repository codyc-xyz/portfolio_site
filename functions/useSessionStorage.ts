import { useState, useEffect } from 'react';

export const useSessionStorage = (key: string, defaultValue: any) => {
  const [state, setState] = useState(() => {
    if (typeof window !== `undefined`) {
      const storedValue = sessionStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== `undefined`) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};
