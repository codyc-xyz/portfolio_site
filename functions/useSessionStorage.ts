import React from 'react';

export const useSessionStorage = (key: any, defaultValue: any) => {
  const [state, setState] = React.useState(() => {
    if (typeof window !== `undefined`) {
      const storedValue = sessionStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window !== `undefined`) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};
