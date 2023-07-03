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
import { ThemeContext } from '../../contexts/ThemeContext';

export const dreamsPlaylist: Song[] = [
  {
    title: `Dream a Little Dream of Me`,
    artist: `Dean Martin`,
    audioSrc: `/audio/Dream_a_Little_Dream_of_Me.mp3`,
  },
  {
    title: `Fruit of Dreams`,
    artist: `Les Baxter`,
    audioSrc: `/audio/Fruit_Of_Dreams.mp3`,
  },
  {
    title: `Look To The Sky`,
    artist: `Antônio Carlos Jobim`,
    audioSrc: `/audio/Look_To_The_Sky.mp3`,
  },
  {
    title: `Tenderly`,
    artist: `Les Baxter`,
    audioSrc: `/audio/Tenderly.mp3`,
  },
  {
    title: `Here's To Life`,
    artist: `Shirley Horn`,
    audioSrc: `/audio/Here's_To_Life.mp3`,
  },
];

const boogiePlaylist: Song[] = [
  {
    title: `Looking Up to You`,
    artist: `Michael Wycoff`,
    audioSrc: `/audio/Looking_Up_To_You.mp3`,
  },
  {
    title: `Ha Ha, Hee Hee`,
    artist: `Sly & The Family Stone`,
    audioSrc: `/audio/Ha_Ha_Hee_Hee.mp3`,
  },
  {
    title: `Let Love Enter`,
    artist: `Michael Henderson`,
    audioSrc: `/audio/Let_Love_Enter.mp3`,
  },
  {
    title: `Mr Magician`,
    artist: `Mystic Merlin`,
    audioSrc: `/audio/Mr_Magician.mp3`,
  },
  {
    title: `I'll Never Forget (My Favorite Disco)`,
    artist: `Dexter Wansel, The Jones Girls`,
    audioSrc: `/audio/I'll_Never_Forget.mp3`,
  },
];

const MusicPlayer: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const isPlaying = useSelector((state: AppState) => state.isPlaying);
  const currentSongIndex = useSelector(
    (state: AppState) => state.currentSongIndex,
  );
  const currentPlaylist = useSelector(
    (state: AppState) => state.currentPlaylist,
  );
  const selectedButton = useSelector((state: AppState) => state.selectedButton);
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== `undefined`) {
      audioRef.current = new Audio(currentPlaylist[currentSongIndex]?.audioSrc);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [currentSongIndex, currentPlaylist]);

  useEffect(() => {
    if (audioRef.current) {
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

      const handleEnd = () => {
        handleNext();
      };

      audioRef.current.addEventListener(`ended`, handleEnd);

      return () => {
        audioRef.current?.removeEventListener(`ended`, handleEnd);
      };
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
    <div className="fixed right-1 bottom-2 flex flex-col space-y-1 lg:space-y-2 z-50">
      <div className="flex-row text-center">
        <button
          className={`${
            selectedButton === `starryNight` ? `bg-primary rounded-md` : ``
          } text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-1 sm:p-1 md:p-2 lg:p-3 xl:p-3 m-1`}
          onClick={() => {
            handleButtonSelect(dreamsPlaylist, `starryNight`);
            if (theme !== `dark`) toggleTheme();
          }}
        >
          🌙
        </button>
        <button
          className={`${
            selectedButton === `discoBall` ? `bg-primary rounded-md` : ``
          } text-xs sm:text-base lg:text-lg xl:text-xl p-1 sm:p-1 md:p-2 lg:p-3 xl:p-3 m-1`}
          onClick={() => {
            handleButtonSelect(boogiePlaylist, `discoBall`);
            if (theme !== `light`) toggleTheme();
          }}
        >
          🪩
        </button>
      </div>
      <div className="flex-row">
        <button
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-1 sm:p-1 md:p-2 lg:p-3 xl:p-3 hover:opacity-50"
          onClick={handlePrev}
        >
          <div className="h-3 w-3 md:h-4 md:w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 19 2 12 11 5 11 19"></polygon>
              <polygon points="22 19 13 12 22 5 22 19"></polygon>
            </svg>
          </div>
        </button>
        <button
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-1 sm:p-1 md:p-2 lg:p-3 hover:opacity-50"
          onClick={() => dispatch(togglePlay())}
        >
          {isPlaying ? (
            <div className="h-3 w-3 md:h-4 md:w-4 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </div>
          ) : (
            <div className="h-3 w-3 md:h-4 md:w-4 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          )}
        </button>
        <button
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg p-1 sm:p-1 md:p-1 lg:p-3 hover:opacity-50"
          onClick={handleNext}
        >
          <div className="h-3 w-3 md:h-4 md:w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 19 22 12 13 5 13 19"></polygon>
              <polygon points="2 19 11 12 2 5 2 19"></polygon>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
