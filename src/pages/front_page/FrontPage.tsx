import Header from '../../components/general/Header';
import IntroText from '../../components/front_page/IntroText';
import { getImages } from '../../../server';

const FrontPage = () => {
  const images = getImages();
  console.log(images);
  return (
    <div>
      <Header />
      <IntroText />
    </div>
  );
};

export default FrontPage;
