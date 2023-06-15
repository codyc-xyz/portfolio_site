import { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import { ArrowUp } from 'react-feather';

const ScrollArrow = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: `smooth` });

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 left--0.5 md:left-6 lg:left-8 cursor-pointer z-50"
      onClick={scrollToTop}
    >
      <ArrowUp className="h-4 w-4 md:h-4 md:w-4 text-primary hover:opacity-50" />
    </div>
  );
};

export default ScrollArrow;
