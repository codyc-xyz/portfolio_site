import React, { useState } from 'react';
import Header from '../components/general/Header';
import homerSimpsonGif from '../../public/static/homer-simpson-comfy.gif';
import homerMargeGif from '../../public/static/homer-marge-dancing.gif';
import Song from '../types/Song';
import MusicPlayer from '../components/general/MusicPlayer';

const FrontPage: React.FC = () => {
  const [selectedGif, setSelectedGif] = useState<string>(``);

  const dreamsPlaylist: Song[] = [
    {
      title: `Dream a Little Dream of Me`,
      artist: `Dean Martin`,
      audioSrc: `/static/audio/Dream_a_Little_Dream_of_Me.mp3`,
    },
    {
      title: `Fruit of Dreams`,
      artist: `Les Baxter`,
      audioSrc: `/static/audio/Fruit_Of_Dreams.mp3`,
    },
    {
      title: `Look To The Sky`,
      artist: `Antônio Carlos Jobim`,
      audioSrc: `/static/audio/Look_To_The_Sky.mp3`,
    },
    {
      title: `Tenderly`,
      artist: `Les Baxter`,
      audioSrc: `/static/audio/Tenderly.mp3`,
    },
    {
      title: `Here's To Life`,
      artist: `Shirley Horn`,
      audioSrc: `/static/audio/Here's_To_Life.mp3`,
    },
  ];

  const handleClick = (gifName: string) => {
    if (selectedGif !== gifName) {
      setSelectedGif(gifName);
    } else {
      setSelectedGif(``);
    }
  };

  const gifStyles = (gifName: string) => {
    if (selectedGif === gifName) {
      return `w-full h-full`;
    } else {
      return `h-11 w-12`;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-end">
        <div className="flex flex-col justify-center space-y-4">
          {selectedGif !== `homerMargeGif` && (
            <button onClick={() => handleClick(`homerSimpsonGif`)}>
              <img
                src={homerSimpsonGif}
                className={gifStyles(`homerSimpsonGif`)}
              />
              {selectedGif === `homerSimpsonGif` && (
                <MusicPlayer songs={dreamsPlaylist} />
              )}
            </button>
          )}
          {selectedGif !== `homerSimpsonGif` && (
            <button onClick={() => handleClick(`homerMargeGif`)}>
              <img src={homerMargeGif} className={gifStyles(`homerMargeGif`)} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
