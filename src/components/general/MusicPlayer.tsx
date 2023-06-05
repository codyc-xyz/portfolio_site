import Song from '../../types/Song';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  togglePlay,
  setCurrentSongIndex,
  setCurrentPlaylist,
  setSelectedButton,
} from '../../redux/store';

const MusicPlayer: React.FC = () => {
  const isPlaying = useSelector((state: AppState) => state.isPlaying);
  const currentSongIndex = useSelector(
    (state: AppState) => state.currentSongIndex,
  );
  const currentPlaylist = useSelector(
    (state: AppState) => state.currentPlaylist,
  );
  const selectedButton = useSelector((state: AppState) => state.selectedButton);
  const dispatch = useDispatch();

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
  console.log(`mounted`);
  const audioRef = useRef(
    new Audio(currentPlaylist[currentSongIndex]?.audioSrc),
  );

  useEffect(() => {
    if (currentSongIndex > currentPlaylist.length) {
      dispatch(setCurrentSongIndex(0));
    }
    audioRef.current.src = currentPlaylist[currentSongIndex]?.audioSrc;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error(`Audio playback error: `, error));
    } else {
      audioRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, isPlaying, currentPlaylist]);

  const handleNext = () => {
    dispatch(
      setCurrentSongIndex((currentSongIndex + 1) % currentPlaylist.length),
    );
  };

  const handlePrev = () => {
    dispatch(
      setCurrentSongIndex(
        (currentSongIndex - 1 + currentPlaylist.length) %
          currentPlaylist.length,
      ),
    );
  };

  const handleButtonSelect = (
    playlist: Song[],
    button: 'starryNight' | 'discoBall',
  ) => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setSelectedButton(button));
    dispatch(setCurrentSongIndex(0));
  };

  return (
    <div className="fixed right-2 bottom-2 flex flex-col space-y-2">
      <div className="flex-row text-center">
        <button
          className={`${
            selectedButton === `starryNight` ? `bg-primary` : ``
          } text-xl p-1 m-1`}
          onClick={() => handleButtonSelect(dreamsPlaylist, `starryNight`)}
        >
          🌙
        </button>
        <button
          className={`${
            selectedButton === `discoBall` ? `bg-primary` : ``
          } text-xl p-1 m-1`}
          onClick={() => handleButtonSelect(boogiePlaylist, `discoBall`)}
        >
          🪩
        </button>
      </div>
      <div className="flex-row">
        <button className="p-2 text-text hover:opacity-50" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="24"
            width="24"
          >
            <polygon points="11 19 2 12 11 5 11 19"></polygon>
            <polygon points="22 19 13 12 22 5 22 19"></polygon>
          </svg>
        </button>
        <button
          className="p-2 text-primary hover:opacity-50"
          onClick={() => dispatch(togglePlay())}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="24"
              width="24"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="24"
              width="24"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        <button className="p-2 text-text hover:opacity-50" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="24"
            width="24"
          >
            <polygon points="13 19 22 12 13 5 13 19"></polygon>
            <polygon points="2 19 11 12 2 5 2 19"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
