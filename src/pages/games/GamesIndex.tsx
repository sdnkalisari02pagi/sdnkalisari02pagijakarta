import React from 'react';
import { useGames } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function GamesIndex() {
  const { games, activeLanguage, toggleLanguage } = useGames();
  const navigate = useNavigate();

  const t = (idText: string, enText: string) => {
    return activeLanguage === 'id' ? idText : enText;
  };

  const handlePlayLevel = (gameId: string, levelNum: number) => {
    navigate(`/games/play/${gameId}?level=${levelNum}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">
      
      {/* Navbar Khusus Games */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-indigo-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/games')}>
            <span className="text-2xl">🎮</span>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500">
              {t("Games Edukasi", "Educational Games")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Lang Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white dark:bg-slate-800 text-xs font-bold shadow-sm hover:scale-105 transition-transform"
            >
              <span>{activeLanguage === 'id' ? '🇮🇩 Indo' : '🇬🇧 Eng'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            {t("🎮 Pilih Petualangan Belajarmu!", "🎮 Choose Your Study Adventure!")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t("Silakan pilih game di bawah ini, lalu pilih level kesulitan 1 sampai 5 untuk langsung bermain!", "Please choose a game below, then choose difficulty level 1 to 5 to play directly!")}
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {games.map((g, idx) => (
            <motion.div 
              key={g.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={g.cover} 
                    alt={g.title.id} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm">
                    {t(g.difficulty === 'easy' ? "Mudah" : "Sedang", g.difficulty === 'easy' ? "Easy" : "Medium")}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                    {t(g.title.id, g.title.en)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t(g.description.id, g.description.en)}
                  </p>
                </div>
              </div>

              {/* Level Selector buttons in card footer */}
              <div className="px-5 pb-5 border-t border-slate-50 dark:border-slate-800/60 pt-4 space-y-3">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {t("Pilih Level Kesulitan:", "Select Difficulty Level:")}
                </div>
                
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvlNum) => (
                    <button
                      key={lvlNum}
                      onClick={() => handlePlayLevel(g.id, lvlNum)}
                      className="py-2.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-indigo-700 dark:text-slate-300 font-extrabold rounded-xl transition-all hover:scale-105 text-xs text-center border border-indigo-100 dark:border-slate-800"
                    >
                      {lvlNum}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
