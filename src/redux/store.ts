import { configureStore } from '@reduxjs/toolkit';
import Song from '../types/Song';
import { dreamsPlaylist } from '../components/general/MusicPlayer';

export interface AppState {
  isPlaying: boolean;
  currentSongIndex: number;
  currentPlaylist: Song[];
  selectedButton: 'starryNight' | 'discoBall';
}

export interface TogglePlayAction {
  type: 'TOGGLE_PLAY';
}

interface SetCurrentSongIndexAction {
  type: 'SET_CURRENT_SONG_INDEX';
  payload: number;
}

interface SetCurrentPlaylistAction {
  type: 'SET_CURRENT_PLAYLIST';
  payload: Song[];
}

interface SetSelectedButtonAction {
  type: 'SET_SELECTED_BUTTON';
  payload: 'starryNight' | 'discoBall';
}

type AppAction =
  | TogglePlayAction
  | SetCurrentSongIndexAction
  | SetCurrentPlaylistAction
  | SetSelectedButtonAction;

const initialState: AppState = {
  isPlaying: false,
  currentSongIndex: 0,
  currentPlaylist: dreamsPlaylist,
  selectedButton: `starryNight`,
};

export const togglePlay = (): TogglePlayAction => ({
  type: `TOGGLE_PLAY`,
});

export const setCurrentSongIndex = (
  index: number,
): SetCurrentSongIndexAction => ({
  type: `SET_CURRENT_SONG_INDEX`,
  payload: index,
});

export const setCurrentPlaylist = (
  playlist: Song[],
): SetCurrentPlaylistAction => ({
  type: `SET_CURRENT_PLAYLIST`,
  payload: playlist,
});

export const setSelectedButton = (
  button: 'starryNight' | 'discoBall',
): SetSelectedButtonAction => ({
  type: `SET_SELECTED_BUTTON`,
  payload: button,
});

const reducer = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case `TOGGLE_PLAY`:
      return { ...state, isPlaying: !state.isPlaying };
    case `SET_CURRENT_SONG_INDEX`:
      return { ...state, currentSongIndex: action.payload };
    case `SET_CURRENT_PLAYLIST`:
      return { ...state, currentPlaylist: action.payload };
    case `SET_SELECTED_BUTTON`:
      return { ...state, selectedButton: action.payload };
    default:
      return state;
  }
};

const store = configureStore({ reducer });

export default store;
