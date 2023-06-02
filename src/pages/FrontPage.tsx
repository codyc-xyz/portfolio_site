import React from 'react';
import Header from '../components/general/Header';
import homerSimpsonGif from '../../public/static/homer-simpson-comfy.gif';
import homerMargeGif from '../../public/static/homer-marge-dancing.gif';
import Song from '../types/Song';
import MusicPlayer from '../components/general/MusicPlayer';

const FrontPage: React.FC = () => {
  const dreamsPlaylist: Song[] = [
    {
      title: `Dream a Little Dream of Me`,
      artist: `Dean Martin`,
      audioSrc: `../../public/static/audio/Dream_a_Little_Dream_of_Me.mp3`,
    },
    {
      title: `Fruit of Dreams`,
      artist: `Les Baxter`,
      audioSrc: `../../public/static/audio/Fruit_Of_Dreams.mp3`,
    },
    {
      title: `Look To The Sky`,
      artist: `Antônio Carlos Jobim`,
      audioSrc: `../../public/static/audio/Look_To_The_Sky.mp3`,
    },
    {
      title: `Tenderly`,
      artist: `Les Baxter`,
      audioSrc: `../../public/static/audio/Tenderly.mp3`,
    },
    {
      title: `Here's To Life`,
      artist: `Shirley Horn`,
      audioSrc: `../../public/static/audio/Here's_To_Life.mp3`,
    },
  ];
  return (
    <div>
      <Header />
      <div className="flex items-center justify-end">
        <div className="flex flex-col justify-center space-y-4">
          <img src={homerSimpsonGif} className="h-11 w-12" />
          <img src={homerMargeGif} className="h-11 w-12" />
        </div>
      </div>
      <MusicPlayer songs={dreamsPlaylist} />
    </div>
  );
};

export default FrontPage;
