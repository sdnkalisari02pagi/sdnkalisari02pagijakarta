import { Play } from 'lucide-react';
import { detectVideoPlatform, getVideoThumbnail, VideoPlatform } from '@/lib/videoEmbed';

interface Props {
  videoUrl: string;
  manualThumbnail?: string;
  alt: string;
  className?: string;
  showOverlay?: boolean;
  small?: boolean;
}

const platformLabel: Record<VideoPlatform, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  gdrive: 'Google Drive',
  unknown: 'Video',
};

const platformGradient: Record<VideoPlatform, string> = {
  youtube: 'from-red-500 to-red-700',
  tiktok: 'from-pink-500 via-fuchsia-600 to-cyan-500',
  instagram: 'from-purple-500 via-pink-500 to-orange-400',
  gdrive: 'from-blue-500 to-emerald-500',
  unknown: 'from-slate-600 to-slate-800',
};

export default function VideoCardThumbnail({ videoUrl, manualThumbnail, alt, className = 'w-full h-48', showOverlay = true, small = false }: Props) {
  const platform = detectVideoPlatform(videoUrl);
  const auto = manualThumbnail || getVideoThumbnail(videoUrl);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {auto ? (
        <img src={auto} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${platformGradient[platform]} flex items-center justify-center`}>
          <span className={`absolute ${small ? 'top-1 left-1 text-[8px] px-1' : 'top-2 left-2 text-[10px] px-2 py-0.5'} bg-black/40 text-white rounded font-medium tracking-wide`}>
            {platformLabel[platform]}
          </span>
        </div>
      )}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className={`${small ? 'w-5 h-5' : 'w-14 h-14'} rounded-full bg-white/90 flex items-center justify-center`}>
            <Play className={`${small ? 'w-2.5 h-2.5' : 'w-6 h-6'} text-primary fill-primary ml-0.5`} />
          </div>
        </div>
      )}
    </div>
  );
}
