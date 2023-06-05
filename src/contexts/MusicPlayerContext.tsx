import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Song from '@/types/Song';
import {
  AppState,
  togglePlay,
  setCurrentSongIndex,
  setCurrentPlaylist,
  setSelectedButton,
} from '../redux/store';

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

export const MusicPlayerContext = createContext<
  MusicPlayerContextValue | undefined
>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(`useMusicPlayer must be used within a MusicPlayerProvider`);
  }
  return context;
};

export const MusicPlayerProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const isPlaying = useSelector((state: AppState) => state.isPlaying);
  const currentSongIndex = useSelector(
    (state: AppState) => state.currentSongIndex,
  );
  const currentPlaylist = useSelector(
    (state: AppState) => state.currentPlaylist,
  );
  const selectedButton = useSelector((state: AppState) => state.selectedButton);
  const dispatch = useDispatch();

  const togglePlayHandler = () => {
    dispatch(togglePlay());
  };

  const setCurrentSongIndexHandler = (index: number) => {
    dispatch(setCurrentSongIndex(index));
  };

  const setCurrentPlaylistHandler = (playlist: Song[]) => {
    dispatch(setCurrentPlaylist(playlist));
  };

  const setSelectedButtonHandler = (button: 'starryNight' | 'discoBall') => {
    dispatch(setSelectedButton(button));
  };

  const contextValue: MusicPlayerContextValue = {
    isPlaying,
    togglePlay: togglePlayHandler,
    currentSongIndex,
    setCurrentSongIndex: setCurrentSongIndexHandler,
    currentPlaylist,
    setCurrentPlaylist: setCurrentPlaylistHandler,
    selectedButton,
    setSelectedButton: setSelectedButtonHandler,
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
