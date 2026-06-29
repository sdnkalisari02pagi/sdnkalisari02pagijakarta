import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface Props {
  text: string;
  lang: 'id' | 'en';
}

export default function TextToSpeech({ text, lang }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1); // Speed: 0.5 to 2
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'id' ? 'id-ID' : 'en-US';
      u.rate = rate;

      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);

      setUtterance(u);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, lang, rate]);

  const handlePlay = () => {
    if (!utterance) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-secondary/40 rounded-lg shadow-sm border">
      <button
        onClick={handlePlay}
        className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform"
        aria-label="Read Question aloud"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="p-1 text-muted-foreground hover:text-foreground"
          title="Stop"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="flex items-center gap-1.5 ml-2">
        <span className="text-[10px] text-muted-foreground font-mono">Speed:</span>
        <select
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="bg-transparent text-[11px] font-semibold border-none focus:outline-none"
        >
          <option value="0.75">0.7x</option>
          <option value="1">1.0x</option>
          <option value="1.25">1.2x</option>
          <option value="1.5">1.5x</option>
        </select>
      </div>
    </div>
  );
}
