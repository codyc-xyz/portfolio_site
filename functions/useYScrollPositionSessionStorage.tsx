import { useEffect } from 'react';
import { useLocation } from '@reach/router';

export const useYScrollPositionSessionStorage = () => {
  const location = useLocation();
  const key = `${location.pathname}ScrollY`;

  useEffect(() => {
    if (typeof window !== `undefined`) {
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
