
// import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { SideBar } from './sidebar';
import { useClassItem } from '@/components/providers/class-provider';
import { EllipsisVertical, File } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string,
  height?: number,
  width?: number,
  courseId: string,
}

const VideoPlayer = ({ videoId, height, width, courseId }: VideoPlayerProps) => {

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

  return (
    <div className='flex justify-center rounded-md'>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleVideoReady}
      />
    </div>
  );
};

export default VideoPlayer;
