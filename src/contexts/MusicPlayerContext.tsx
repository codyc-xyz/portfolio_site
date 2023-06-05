import React, { createContext, useState } from 'react';
import Song from '../types/Song';

interface MusicPlayerContextValue {
  isPlaying: boolean;
  togglePlay: () => void;
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  currentPlaylist: Song[];
  setCurrentPlaylist: (playlist: Song[]) => void;
  selectedButton: 'starryNight' | 'discoBall';
  setSelectedButton: (button: 'starryNight' | 'discoBall') => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextValue>({
  isPlaying: false,
  togglePlay: () => {},
  currentSongIndex: 0,
  setCurrentSongIndex: () => {},
  currentPlaylist: [],
  setCurrentPlaylist: () => {},
  selectedButton: `starryNight`,
  setSelectedButton: () => {},
});

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [selectedButton, setSelectedButton] = useState<
    'starryNight' | 'discoBall'
  >(`starryNight`);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        togglePlay,
        currentSongIndex,
        setCurrentSongIndex,
        currentPlaylist,
        setCurrentPlaylist,
        selectedButton,
        setSelectedButton,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
