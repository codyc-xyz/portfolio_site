import { useEffect } from 'react';

export const useYScrollPositionSessionStorage = (key: string) => {
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const storedScrollY = sessionStorage.getItem(key);
      if (storedScrollY !== null) {
        window.scrollTo(0, parseInt(storedScrollY));
      }

      const saveScrollY = () => {
        sessionStorage.setItem(key, JSON.stringify(window.scrollY));
      };

      window.addEventListener(`scroll`, saveScrollY);

      return () => {
        window.removeEventListener(`scroll`, saveScrollY);
      };
    }
  }, [key]);
};
