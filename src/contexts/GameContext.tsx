import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from './LanguageContext';
import {
  gamesList,
  badgesData,
  avatarItems,
  generateMathQuestion,
  generateDynamicAIQuestions,
  Question,
  BilingualText
} from '@/lib/gamesSeedData';
import { toast } from '@/hooks/use-toast';

export interface PlayerProfile {
  id: string;
  username: string;
  name: string;
  kelas: string;
  xp: number;
  coins: number;
  hearts: number;
  streak: number;
  avatarUrl: string;
  frameUrl: string;
  themeId: string;
  badges: string[]; // List of badge codes
  achievements: string[]; // List of achievement codes
  itemsOwned: string[]; // List of shop item IDs
  lastActive: string;
}

interface GameContextType {
  player: PlayerProfile;
  games: typeof gamesList;
  badges: typeof badgesData;
  shopItems: typeof avatarItems;
  activeLanguage: 'id' | 'en';
  toggleLanguage: () => void;
  getQuestions: (gameId: string, level: number) => Promise<Question[]>;
  answerQuestion: (isCorrect: boolean, isCombo?: boolean) => void;
  completeLevel: (gameId: string, level: number, score: number, totalQuestions: number) => void;
  purchaseItem: (itemId: string) => boolean;
  equipItem: (type: 'avatar' | 'frame' | 'theme', value: string) => void;
  refillHearts: () => boolean;
  resetGameSession: () => void;
  gameProgress: Record<string, number>; // gameId -> maxUnlockedLevel
  useHint: () => boolean;
  dailyChallengeProgress: number;
  weeklyMissionProgress: { completedGames: number; totalQuestions: number };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DEFAULT_PLAYER: PlayerProfile = {
  id: 'local-player-sdn-02',
  username: 'siswa_kalisari',
  name: 'Budi Santoso',
  kelas: '4-A',
  xp: 150,
  coins: 50,
  hearts: 5,
  streak: 3,
  avatarUrl: '🦁',
  frameUrl: '',
  themeId: 'default',
  badges: ['level-5-master'],
  achievements: ['first-win'],
  itemsOwned: ['av-1'],
  lastActive: new Date().toISOString()
};

export function GameProvider({ children }: { children: ReactNode }) {
  const { lang, setLang } = useLanguage();
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem('games_player_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PLAYER;
  });

  const [gameProgress, setGameProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('games_progress');
    return saved ? JSON.parse(saved) : { 'quiz-mapel': 1, 'math-challenge': 1 };
  });

  const [dailyChallengeProgress, setDailyChallengeProgress] = useState<number>(0);
  const [weeklyMissionProgress, setWeeklyMissionProgress] = useState({
    completedGames: 0,
    totalQuestions: 0
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('games_player_profile', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('games_progress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  // Synchronize player with Supabase if online/logged in (optional/failsafe)
  const syncWithSupabase = async (p: PlayerProfile) => {
    try {
      const { error } = await supabase.from('players').upsert({
        id: p.id === 'local-player-sdn-02' ? undefined : p.id,
        username: p.username,
        name: p.name,
        kelas: p.kelas,
        xp: p.xp,
        coins: p.coins,
        hearts: p.hearts,
        streak: p.streak,
        avatar_url: p.avatarUrl,
        frame_url: p.frameUrl,
        theme_id: p.themeId
      });
      if (error) console.log("Supabase upsert status: skip db sync");
    } catch {
      // Quiet fail if table doesn't exist
    }
  };

  const toggleLanguage = useCallback(() => {
    const nextLang = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
  }, [lang, setLang]);

  // Load questions dynamically: tries Supabase first, falls back to seed data
  const getQuestions = async (gameId: string, level: number): Promise<Question[]> => {
    try {
      const { data: gameRecord } = await supabase
        .from('games')
        .select('id')
        .eq('slug', gameId)
        .single();

      if (gameRecord) {
        const { data, error } = await supabase
          .from('question_bank')
          .select(`
            id, level_number, question_id, question_en, explanation_id, explanation_en, hint_id, hint_en, image_url,
            question_options(option_a_id, option_a_en, option_b_id, option_b_en, option_c_id, option_c_en, option_d_id, option_d_en, correct_answer)
          `)
          .eq('game_id', gameRecord.id)
          .eq('level_number', level);

        if (!error && data && data.length > 0) {
          return data.map((q: any) => {
            const opt = q.question_options?.[0] || {};
            return {
              id: q.id,
              gameId: gameId,
              level: q.level_number,
              question: { id: q.question_id, en: q.question_en },
              options: {
                A: { id: opt.option_a_id || '', en: opt.option_a_en || '' },
                B: { id: opt.option_b_id || '', en: opt.option_b_en || '' },
                C: { id: opt.option_c_id || '', en: opt.option_c_en || '' },
                D: { id: opt.option_d_id || '', en: opt.option_d_en || '' }
              },
              correctAnswer: opt.correct_answer || 'A',
              explanation: { id: q.explanation_id || '', en: q.explanation_en || '' },
              hint: { id: q.hint_id || '', en: q.hint_en || '' },
              imageUrl: q.image_url
            };
          });
        }
      }
    } catch (err) {
      console.log("Supabase fetch failed, falling back to dynamic generator:", err);
    }
    return generateDynamicAIQuestions(gameId, level);
  };

  const answerQuestion = (isCorrect: boolean, isCombo = false) => {
    setPlayer(prev => {
      let xpGained = 0;
      let heartsChange = prev.hearts;

      if (isCorrect) {
        xpGained = 10;
        if (isCombo) xpGained += 20; // combo bonus
      } else {
        heartsChange = Math.max(0, prev.hearts - 1);
        if (heartsChange === 0) {
          toast({
            title: lang === 'id' ? "Game Over! 💔" : "Game Over! 💔",
            description: lang === 'id' ? "Nyawa kamu habis. Gunakan koin untuk isi ulang!" : "You ran out of hearts. Use coins to refill!",
            variant: "destructive"
          });
        }
      }

      const newPlayer = {
        ...prev,
        xp: prev.xp + xpGained,
        hearts: heartsChange
      };

      syncWithSupabase(newPlayer);
      return newPlayer;
    });

    setWeeklyMissionProgress(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1
    }));
  };

  const completeLevel = (gameId: string, level: number, score: number, totalQuestions: number) => {
    const isPerfect = score === totalQuestions && totalQuestions > 0;
    const bonusXP = (level * 50) + (isPerfect ? 100 : 0);
    const bonusCoins = (level * 5) + (isPerfect ? 10 : 0);

    setPlayer(prev => {
      // Check badge rewards
      const earnedBadges = [...prev.badges];
      if (level === 5 && !earnedBadges.includes('level-5-master')) {
        earnedBadges.push('level-5-master');
        toast({
          title: lang === 'id' ? "🏆 Lencana Baru!" : "🏆 New Badge!",
          description: lang === 'id' ? "Kamu memperoleh lencana Master Level 5!" : "You earned the Level 5 Master badge!"
        });
      }

      const newPlayer = {
        ...prev,
        xp: prev.xp + bonusXP,
        coins: prev.coins + bonusCoins,
        badges: earnedBadges
      };

      syncWithSupabase(newPlayer);
      return newPlayer;
    });

    // Advance Progress
    setGameProgress(prev => {
      const currentMax = prev[gameId] || 1;
      if (level === currentMax && currentMax < 5) {
        return { ...prev, [gameId]: currentMax + 1 };
      }
      return prev;
    });

    setDailyChallengeProgress(prev => Math.min(100, prev + 25));
    setWeeklyMissionProgress(prev => ({
      ...prev,
      completedGames: prev.completedGames + 1
    }));

    toast({
      title: lang === 'id' ? "🎉 Level Selesai!" : "🎉 Level Complete!",
      description: lang === 'id' 
        ? `Kamu menyelesaikan Level ${level}! (+${bonusXP} XP, +${bonusCoins} Koin)` 
        : `You completed Level ${level}! (+${bonusXP} XP, +${bonusCoins} Coins)`
    });
  };

  const purchaseItem = (itemId: string): boolean => {
    const item = avatarItems.find(i => i.id === itemId);
    if (!item) return false;

    if (player.coins < item.cost) {
      toast({
        title: lang === 'id' ? "Koin Tidak Cukup!" : "Insufficient Coins!",
        description: lang === 'id' ? "Mainkan game lebih banyak untuk mengumpulkan koin." : "Play more games to earn coins.",
        variant: "destructive"
      });
      return false;
    }

    setPlayer(prev => {
      if (prev.itemsOwned.includes(itemId)) return prev;
      const newPlayer = {
        ...prev,
        coins: prev.coins - item.cost,
        itemsOwned: [...prev.itemsOwned, itemId]
      };
      syncWithSupabase(newPlayer);
      return newPlayer;
    });

    toast({
      title: lang === 'id' ? "🛍️ Pembelian Berhasil!" : "🛍️ Purchase Successful!",
      description: lang === 'id' ? `Item ${item.name.id} berhasil ditambahkan.` : `Item ${item.name.en} added to your collection.`
    });
    return true;
  };

  const equipItem = (type: 'avatar' | 'frame' | 'theme', value: string) => {
    setPlayer(prev => {
      let updated = { ...prev };
      if (type === 'avatar') updated.avatarUrl = value;
      if (type === 'frame') updated.frameUrl = value;
      if (type === 'theme') updated.themeId = value;

      syncWithSupabase(updated);
      return updated;
    });
  };

  const refillHearts = (): boolean => {
    if (player.coins < 20) {
      toast({
        title: lang === 'id' ? "Koin Tidak Cukup!" : "Insufficient Coins!",
        description: lang === 'id' ? "Kamu butuh 20 Koin untuk isi ulang Nyawa." : "You need 20 Coins to refill Hearts.",
        variant: "destructive"
      });
      return false;
    }

    setPlayer(prev => {
      const newPlayer = {
        ...prev,
        coins: prev.coins - 20,
        hearts: 5
      };
      syncWithSupabase(newPlayer);
      return newPlayer;
    });

    toast({
      title: lang === 'id' ? "❤️ Nyawa Terisi!" : "❤️ Hearts Refilled!",
      description: lang === 'id' ? "Nyawa kamu terisi penuh menjadi 5 kembali." : "Your hearts are full back to 5."
    });
    return true;
  };

  const useHint = (): boolean => {
    if (player.coins < 5) {
      toast({
        title: lang === 'id' ? "Koin Tidak Cukup!" : "Insufficient Coins!",
        description: lang === 'id' ? "Biaya bantuan hint adalah 5 koin." : "Hint costs 5 coins.",
        variant: "destructive"
      });
      return false;
    }

    setPlayer(prev => {
      const newPlayer = { ...prev, coins: Math.max(0, prev.coins - 5) };
      syncWithSupabase(newPlayer);
      return newPlayer;
    });
    return true;
  };

  const resetGameSession = () => {
    setPlayer(prev => {
      const newPlayer = { ...prev, hearts: 5 };
      syncWithSupabase(newPlayer);
      return newPlayer;
    });
  };

  return (
    <GameContext.Provider
      value={{
        player,
        games: gamesList,
        badges: badgesData,
        shopItems: avatarItems,
        activeLanguage: lang,
        toggleLanguage,
        getQuestions,
        answerQuestion,
        completeLevel,
        purchaseItem,
        equipItem,
        refillHearts,
        resetGameSession,
        gameProgress,
        useHint,
        dailyChallengeProgress,
        weeklyMissionProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGames must be used within GameProvider");
  return ctx;
}
