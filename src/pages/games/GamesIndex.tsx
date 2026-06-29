import React, { useState } from 'react';
import { useGames } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Star, Heart, Flame, Coins, ShoppingCart, User, Award, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import GameShop from '@/components/games/GameShop';
import { useNavigate } from 'react-router-dom';

export default function GamesIndex() {
  const { player, games, activeLanguage, toggleLanguage, dailyChallengeProgress, weeklyMissionProgress } = useGames();
  const [shopOpen, setShopOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const t = (idText: string, enText: string) => {
    return activeLanguage === 'id' ? idText : enText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">
      
      {/* Navbar Khusus Games */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-indigo-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => navigate('/games')}>
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

            {/* Shop Button */}
            <Button 
              onClick={() => setShopOpen(true)}
              variant="outline" 
              className="rounded-full gap-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 h-9"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-bold text-xs">{player.coins}</span>
            </Button>

            {/* Profile Button */}
            <Button 
              onClick={() => setProfileOpen(true)}
              variant="ghost" 
              className="rounded-full p-1 w-9 h-9 border border-indigo-200"
            >
              <span className={`text-xl relative ${player.frameUrl}`}>
                {player.avatarUrl}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Player Stats Widget */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-indigo-50 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-4xl shadow-inner relative border-2 border-indigo-200 ${player.frameUrl}`}>
                {player.avatarUrl}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{player.name}</h2>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full">
                    {t(`Kelas ${player.kelas}`, `Class ${player.kelas}`)}
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Flame className="w-3 h-3" /> {player.streak} {t("Hari", "Days")}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 border-t pt-4 border-slate-100 dark:border-slate-800 text-center">
              <div>
                <div className="text-xs text-slate-400 font-medium">{t("Poin XP", "XP Points")}</div>
                <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{player.xp}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t("Koin", "Coins")}</div>
                <div className="text-base font-extrabold text-amber-500">{player.coins}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t("Nyawa", "Lives")}</div>
                <div className="text-base font-extrabold text-rose-500 flex items-center justify-center gap-0.5">
                  <Heart className="w-4 h-4 fill-current" /> {player.hearts}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-indigo-50 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2 mb-3">
              <span>📅</span> {t("Misi Harian Cilik", "Daily Kid Quest")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t("Mainkan game apa saja untuk dapat koin ekstra!", "Play any game to earn extra coins!")}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>{t("Progres Hari Ini", "Today's Progress")}</span>
                <span>{dailyChallengeProgress}%</span>
              </div>
              <Progress value={dailyChallengeProgress} className="h-2.5 bg-slate-100" />
            </div>
            {dailyChallengeProgress >= 100 && (
              <div className="mt-3 text-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold py-1.5 rounded-lg border border-emerald-200">
                🎉 {t("Misi selesai! +200 XP", "Mission complete! +200 XP")}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Game Grid List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">{t("🎮 Pilih Petualangan Belajarmu!", "🎮 Choose Your Study Adventure!")}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t("Kumpulkan bintang dan selesaikan semua level!", "Collect stars and complete all levels!")}</p>
            </div>
          </div>

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
                  <div className="h-40 overflow-hidden relative">
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

                <div className="px-5 pb-5 border-t border-slate-50 dark:border-slate-800/60 pt-4 flex items-center justify-between">
                  <div className="flex gap-3 text-[10px] text-slate-400 font-bold">
                    <span>🏆 {g.totalLevels} Levels</span>
                    <span className="text-amber-500">🪙 +{g.coinReward}</span>
                  </div>
                  
                  <Button 
                    onClick={() => navigate(`/games/play/${g.id}`)}
                    size="sm" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs gap-1 py-1"
                  >
                    <span>{t("Mainkan", "Play")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Profile Modal Overlay */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-5xl mx-auto mb-4 border-2 border-indigo-200 ${player.frameUrl}`}>
                {player.avatarUrl}
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{player.name}</h2>
              <p className="text-xs text-indigo-500 font-bold mt-0.5">{t(`Siswa Kelas ${player.kelas}`, `Student Class ${player.kelas}`)}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">{t("Akumulasi XP", "Accumulated XP")}</div>
                  <div className="text-lg font-black text-indigo-600 mt-1">{player.xp}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">{t("Dompet Koin", "Coin Wallet")}</div>
                  <div className="text-lg font-black text-amber-500 mt-1">🪙 {player.coins}</div>
                </div>
              </div>

              {/* Badges List */}
              <div className="mt-6 text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  {t("Lencana Koleksi", "Collected Badges")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {player.badges.length > 0 ? (
                    player.badges.map(bCode => (
                      <span key={bCode} className="inline-flex items-center gap-1 text-xs bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-bold px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
                        <span>🏆</span> {bCode.replace('-', ' ').toUpperCase()}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">{t("Belum ada lencana terkumpul.", "No badges collected yet.")}</span>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-6 text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-indigo-500" />
                  {t("Pencapaian Petualang", "Adventure Achievements")}
                </h3>
                <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {t("Selesaikan Tantangan Pertama", "First Win Complete")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-300">○</span> {t("Beli 3 Item dari Toko", "Purchase 3 Shop Items")}
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Rewards shop Overlay */}
      <GameShop isOpen={shopOpen} onClose={() => setShopOpen(false)} />

    </div>
  );
}
