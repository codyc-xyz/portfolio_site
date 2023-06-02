import React from 'react';
import Header from '../components/general/Header';
import homerSimpsonGif from '../../public/static/homer-simpson-comfy.gif';
import homerMargeGif from '../../public/static/homer-marge-dancing.gif';

const FrontPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-end">
        <div className="flex flex-col justify-center space-y-4">
          <img src={homerSimpsonGif} className="h-11 w-12" />
          <img src={homerMargeGif} className="h-11 w-12" />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
