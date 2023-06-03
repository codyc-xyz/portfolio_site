import React, { useState } from 'react';
import Header from '../components/general/Header';
import homerSimpsonGif from '../../public/static/homer-simpson-comfy.gif';
import homerMargeGif from '../../public/static/homer-marge-dancing.gif';
import homerSimpsonStill from '../../public/static/homer-simpson-comfy-still.jpg';
import homerMargeStill from '../../public/static/homerMargeStill.jpg';
import Song from '../types/Song';
import MusicPlayer from '../components/general/MusicPlayer';

const FrontPage: React.FC = () => {
  const [selectedGif, setSelectedGif] = useState<string>(``);
  const [homerSimpsonSrc, setHomerSimpsonSrc] =
    useState<string>(homerSimpsonStill);
  const [homerMargeSrc, setHomerMargeSrc] = useState<string>(homerMargeStill);

  const handleMouseEnter = (gifName: string) => {
    if (gifName === `homerSimpsonGif`) {
      setHomerSimpsonSrc(homerSimpsonGif);
    } else if (gifName === `homerMargeGif`) {
      setHomerMargeSrc(homerMargeGif);
    }
  };

  const handleMouseLeave = (gifName: string) => {
    if (gifName === `homerSimpsonGif` && selectedGif !== `homerSimpsonGif`) {
      setHomerSimpsonSrc(homerSimpsonStill);
    } else if (gifName === `homerMargeGif` && selectedGif !== `homerMargeGif`) {
      setHomerMargeSrc(homerMargeStill);
    }
  };

  const handleClick = (gifName: string) => {
    if (selectedGif !== gifName) {
      setSelectedGif(gifName);
      handleMouseEnter(gifName);
    } else {
      setSelectedGif(``);
      handleMouseLeave(gifName);
    }
  };

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

  const boogiePlaylist: Song[] = [
    {
      title: `Looking Up to You`,
      artist: `Michael Wycoff`,
      audioSrc: `/static/audio/Looking_Up_To_You.mp3`,
    },
    {
      title: `Ha Ha, Hee Hee`,
      artist: `Sly & The Family Stone`,
      audioSrc: `/static/audio/Ha_Ha_Hee_Hee.mp3`,
    },
    {
      title: `Let Love Enter`,
      artist: `Michael Henderson`,
      audioSrc: `/static/audio/Let_Love_Enter.mp3`,
    },
    {
      title: `Mr Magician`,
      artist: `Mystic Merlin`,
      audioSrc: `/static/audio/Mr_Magician.mp3`,
    },
    {
      title: `I'll Never Forget (My Favorite Disco)`,
      artist: `Dexter Wansel, The Jones Girls`,
      audioSrc: `/static/audio/I'll_Never_Forget.mp3`,
    },
  ];

  const gifStyles = (gifName: string) => {
    if (selectedGif === gifName) {
      return `w-13 h-13 justify-center mt-7`;
    } else {
      return `h-11 w-12 my-2 shadow-lg hover:shadow-sm`;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-end mt-4">
        <div className="flex flex-col justify-center">
          {selectedGif !== `homerMargeGif` && (
            <button
              onClick={() => handleClick(`homerSimpsonGif`)}
              onMouseEnter={() => handleMouseEnter(`homerSimpsonGif`)}
              onMouseLeave={() => handleMouseLeave(`homerSimpsonGif`)}
            >
              <img
                src={homerSimpsonSrc}
                className={gifStyles(`homerSimpsonGif`)}
              />
            </button>
          )}
          {selectedGif === `homerSimpsonGif` && (
            <MusicPlayer songs={dreamsPlaylist} className="mx-auto" />
          )}
          {selectedGif !== `homerSimpsonGif` && (
            <button
              onClick={() => handleClick(`homerMargeGif`)}
              onMouseEnter={() => handleMouseEnter(`homerMargeGif`)}
              onMouseLeave={() => handleMouseLeave(`homerMargeGif`)}
            >
              <img src={homerMargeSrc} className={gifStyles(`homerMargeGif`)} />
            </button>
          )}
          {selectedGif === `homerMargeGif` && (
            <MusicPlayer songs={boogiePlaylist} className="mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
