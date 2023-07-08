import { useState, useEffect } from 'react';

export const useSessionStorage = (key: string, defaultValue: any) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue !== null) {
        setState(JSON.parse(storedValue));
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};
