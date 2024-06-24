
// import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string,
  height?: number,
  width?: number
}

const VideoPlayer = ({ videoId, height, width }: VideoPlayerProps) => {

  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
    },
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleVideoReady = () => {
    setIsLoading(false);
  };

  const test = () => {
    console.log("evan");
  }

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={handleVideoReady}
      className='md:rounded-md overflow-hidden'
    />
  );
};

export default VideoPlayer;
