import React, { useState, useEffect } from 'react';
import Song from '../../types/Song';

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = React.useRef(new Audio(songs[currentSongIndex].audioSrc));

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].audioSrc;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, isPlaying]);

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handlePlayPause}>{isPlaying ? `Pause` : `Play`}</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default MusicPlayer;
