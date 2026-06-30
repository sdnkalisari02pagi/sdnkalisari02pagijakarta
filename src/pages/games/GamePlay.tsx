import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGames } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Timer, HelpCircle, CheckCircle2, AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { memoryCardEmojis } from '@/lib/gamesSeedData';
import TextToSpeech from '@/components/games/TextToSpeech';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function GamePlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { games, activeLanguage, getQuestions, completeLevel } = useGames();

  const game = games.find(g => g.id === id);
  const [level, setLevel] = useState(() => {
    const q = new URLSearchParams(window.location.search);
    return parseInt(q.get('level') || '1') || 1;
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Game Session States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Custom states for game mechanics
  const [scrambledWord, setScrambledWord] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [memoryCards, setMemoryCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [trashItems, setTrashItems] = useState<any[]>([]);
  const [activeTrashIdx, setActiveTrashIdx] = useState(0);

  const t = (idText: string, enText: string) => {
    return activeLanguage === 'id' ? idText : enText;
  };

  const getTimerForLvl = (lvl: number) => {
    if (lvl === 1) return 30;
    if (lvl === 2) return 25;
    if (lvl === 3) return 20;
    if (lvl === 4) return 15;
    return 15;
  };

  const loadLevel = async (lvl: number) => {
    setLoading(true);
    setGameFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
    setTimeLeft(getTimerForLvl(lvl));

    const qs = await getQuestions(id || '', lvl);
    
    // Fisher-Yates Shuffle algorithm to ensure 100% unbiased randomized layout
    const shuffled = [...qs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setQuestions(shuffled);
    setLoading(false);

    // Initializer custom game states using shuffled list
    if (id === 'susun-kata' && shuffled.length > 0) {
      initScrambleWord(shuffled[0]);
    }
    if (id === 'memory-card') {
      initMemoryCards(lvl);
    }
    if (id === 'pilah-sampah' && shuffled.length > 0) {
      setTrashItems(shuffled[0].metadata?.Items || []);
      setActiveTrashIdx(0);
    }
  };

  useEffect(() => {
    if (!game) {
      navigate('/games');
      return;
    }
    loadLevel(level);
  }, [id, level]);

  useEffect(() => {
    if (gameFinished) {
      const totalQ = questions.length || (matchedCards.length / 2) || trashItems.length || 5;
      completeLevel(id || '', level, score, totalQ);
    }
  }, [gameFinished]);

  const playCountdownBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio beep failed:", e);
    }
  };

  // Countdown timer for Quiz/Mapel
  useEffect(() => {
    if (loading || gameFinished || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswerSubmit(false, ''); // timeout counts as wrong
          return 0;
        }
        if (prev <= 4) {
          playCountdownBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, isAnswered, loading, gameFinished]);

  // Anagram / Susun Kata Setup
  const initScrambleWord = (q: any) => {
    const rawWord = activeLanguage === 'id' ? q.metadata?.Words?.[0]?.id || 'GAJAH' : q.metadata?.Words?.[0]?.en || 'ELEPHANT';
    const arr = rawWord.split('').sort(() => Math.random() - 0.5);
    setScrambledWord(arr.join(' '));
    setWordInput("");
  };

  // Memory Card Setup
  const initMemoryCards = (lvl: number) => {
    // Determine grid size based on level
    const pairsCount = lvl === 1 ? 2 : lvl === 2 ? 3 : lvl === 3 ? 6 : lvl === 4 ? 8 : 18;
    const selectedIcons = [...memoryCardEmojis].sort(() => Math.random() - 0.5).slice(0, pairsCount);
    const cardPool = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
      id: index,
      icon,
      flipped: false
    })).sort(() => Math.random() - 0.5);
    setMemoryCards(cardPool);
    setSelectedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length >= 2 || selectedCards.includes(cardId) || matchedCards.includes(cardId)) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const firstCard = memoryCards.find(c => c.id === newSelected[0]);
      const secondCard = memoryCards.find(c => c.id === newSelected[1]);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // Match found!
        const matches = [...matchedCards, newSelected[0], newSelected[1]];
        setMatchedCards(matches);
        setSelectedCards([]);
        setScore(prev => prev + 1);

        if (matches.length === memoryCards.length) {
          setTimeout(() => {
            setGameFinished(true);
          }, 800);
        }
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Trash Sorting Setup
  const handleSortTrash = (category: string) => {
    const activeItem = trashItems[activeTrashIdx];
    if (!activeItem) return;

    const isMatch = activeItem.type === category;

    if (isMatch) {
      setScore(prev => prev + 1);
      toast({ title: t("Benar! 🎉", "Correct! 🎉"), description: t(`${activeItem.name.id} masuk tong ${category}!`, `${activeItem.name.en} goes to ${category} bin!`) });
    } else {
      toast({ title: t("Salah ❌", "Wrong ❌"), description: t(`Seharusnya masuk tong ${activeItem.type}`, `It should go to ${activeItem.type} bin`), variant: "destructive" });
    }

    if (activeTrashIdx + 1 < trashItems.length) {
      setActiveTrashIdx(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleAnswerSubmit = (correct: boolean, option: string) => {
    setIsCorrect(correct);
    setIsAnswered(true);
    setSelectedOption(option);
    setShowExplanation(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setShowExplanation(false);
      setShowHint(false);
      setTimeLeft(getTimerForLvl(level));
      
      if (id === 'susun-kata') {
        initScrambleWord(questions[currentIdx + 1]);
      }
    } else {
      setGameFinished(true);
    }
  };

  if (!game) return null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin text-5xl">🎮</div>
          <p className="mt-4 font-bold text-slate-500">{t("Memuat permainan...", "Loading game...")}</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-50 dark:from-slate-950 dark:to-slate-900 pb-20">
      
      {/* Top Controls */}
      <div className="max-w-4xl mx-auto px-4 pt-6 flex items-center justify-between">
        <Button onClick={() => navigate('/games')} variant="ghost" className="gap-1 bg-white/80 border">
          <ArrowLeft className="w-4 h-4" />
          <span>{t("Kembali", "Back")}</span>
        </Button>

        {level > 1 && (
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-1 text-slate-500 font-mono text-xs bg-white/80 px-3.5 py-1.5 rounded-xl border shadow-sm">
              <Timer className="w-3.5 h-3.5 text-indigo-500" />
              <span>{timeLeft}s</span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  (timeLeft / getTimerForLvl(level)) > 0.5 
                    ? "bg-emerald-500" 
                    : (timeLeft / getTimerForLvl(level)) > 0.25 
                    ? "bg-amber-500" 
                    : "bg-rose-500 animate-pulse"
                }`} 
                style={{ width: `${(timeLeft / getTimerForLvl(level)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto px-4 mt-6">
        
        {/* Game Finished Screen */}
        {gameFinished && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center shadow-xl border border-indigo-100 relative overflow-hidden">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{t("Hebat! Selesai!", "Superb! Complete!")}</h2>
            <p className="text-sm text-slate-500 mt-2">
              {t(`Kamu berhasil menyelesaikan Level ${level} dengan skor ${score}/${questions.length || matchedCards.length/2 || trashItems.length}!`, `You completed Level ${level} with score ${score}/${questions.length || matchedCards.length/2 || trashItems.length}!`)}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {level < 5 && (
                <Button onClick={() => setLevel(prev => prev + 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full py-6 text-base rounded-2xl shadow-md">
                  {t("Lanjut ke Level Berikutnya", "Next Level")}
                </Button>
              )}
              <Button onClick={() => loadLevel(level)} variant="outline" className="w-full py-6 rounded-2xl gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>{t("Ulangi Level Ini", "Replay Level")}</span>
              </Button>
              <Button onClick={() => navigate('/games')} variant="ghost" className="w-full py-6 rounded-2xl">
                {t("Ke Menu Utama", "Main Menu")}
              </Button>
            </div>
          </div>
        )}

        {/* Active Gameplay Panel */}
        {!gameFinished && currentQ && (
          <div className="space-y-6">
            
            {/* Header Level & Level Switcher */}
            <div className="flex justify-between items-center bg-white/40 backdrop-blur-sm p-3 rounded-2xl border">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mr-2">
                  Level {level}
                </span>
                
                {/* Level Buttons directly in gameplay */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvlNum) => (
                    <button
                      key={lvlNum}
                      onClick={() => setLevel(lvlNum)}
                      className={`w-6 h-6 text-[10px] font-black rounded-lg transition-all ${
                        level === lvlNum 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white hover:bg-slate-100 text-slate-600 border'
                      }`}
                    >
                      {lvlNum}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-500 font-bold">
                Soal {currentIdx + 1} / {questions.length}
              </span>
            </div>

            {/* TTS & Hint bar */}
            <div className="flex justify-between items-center gap-4">
              <TextToSpeech text={t(currentQ.question.id, currentQ.question.en)} lang={activeLanguage} />
              
              {!showHint && level < 5 && (
                <button 
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1 text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-2 rounded-xl font-bold border border-amber-200"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Petunjuk (Hint)</span>
                </button>
              )}
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
                💡 <strong>Hint:</strong> {t(currentQ.hint.id, currentQ.hint.en)}
              </div>
            )}

            {/* Interactive Question Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-800 space-y-6">
              
              {/* Question Image (If available) */}
              {currentQ.imageUrl && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-[3px] rounded-2xl shadow-[0_6px_20px_rgba(168,85,247,0.4)] overflow-hidden mb-4"
                >
                  <div className="h-44 rounded-[13px] overflow-hidden bg-white">
                    <img 
                      src={currentQ.imageUrl} 
                      alt="Question media" 
                      className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in ${
                        id === 'tebak-gambar' && level === 2 ? 'blur-md' : ''
                      } ${
                        id === 'tebak-gambar' && level === 3 ? '[clip-path:circle(35%_at_50%_50%)]' : ''
                      } ${
                        id === 'tebak-gambar' && level === 4 ? '[clip-path:circle(15%_at_50%_50%)]' : ''
                      } ${
                        id === 'tebak-gambar' && level === 5 ? 'brightness-0 contrast-200 saturate-0' : ''
                      }`} 
                    />
                  </div>
                </motion.div>
              )}

              {/* Question Text */}
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 text-center leading-relaxed">
                {t(currentQ.question.id, currentQ.question.en)}
              </h2>

              {/* RENDER DYNAMIC GAMES PANELS */}

              {/* Game 3: Susun Kata Anagram */}
              {id === 'susun-kata' && (
                <div className="space-y-4">
                  <div className="text-3xl font-black text-center text-indigo-600 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl tracking-widest animate-pulse">
                    {scrambledWord}
                  </div>
                  
                  <input 
                    type="text" 
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value.toUpperCase())}
                    placeholder={t("Ketik jawaban di sini...", "Type answer here...")}
                    className="w-full px-4 py-3 border rounded-xl text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {!isAnswered ? (
                    <Button 
                      onClick={() => {
                        const target = activeLanguage === 'id' ? currentQ.metadata?.Answers?.[0] : currentQ.metadata?.Answers?.[1] || currentQ.correctAnswer;
                        const match = wordInput.trim() === target.toUpperCase();
                        handleAnswerSubmit(match, wordInput);
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl"
                    >
                      {t("Kirim Jawaban", "Submit")}
                    </Button>
                  ) : null}
                </div>
              )}

              {/* Game 5: Memory Cards */}
              {id === 'memory-card' && (
                <div className={`grid gap-2.5 ${
                  level === 1 ? 'grid-cols-2' : level === 2 ? 'grid-cols-3' : level === 3 ? 'grid-cols-4' : level === 4 ? 'grid-cols-4' : 'grid-cols-6'
                }`}>
                  {memoryCards.map((card) => {
                    const isFlipped = selectedCards.includes(card.id) || matchedCards.includes(card.id);
                    return (
                      <div 
                        key={card.id} 
                        onClick={() => handleCardClick(card.id)}
                        className={`rounded-xl flex items-center justify-center font-bold cursor-pointer transition-all duration-300 shadow-md ${
                          level === 5 ? 'h-12 text-lg' : 'h-16 text-2xl'
                        } ${
                          isFlipped ? 'bg-indigo-500 text-white rotate-y-180' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                        }`}
                      >
                        {isFlipped ? card.icon : "❓"}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Game 8: Pilah Sampah */}
              {id === 'pilah-sampah' && trashItems[activeTrashIdx] && (
                <div className="space-y-6 text-center">
                  <div className="p-6 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
                    <span className="text-4xl">🗑️</span>
                    <h3 className="text-xl font-bold mt-2">{t(trashItems[activeTrashIdx].name.id, trashItems[activeTrashIdx].name.en)}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(level === 1 
                      ? ["ORGANIK", "ANORGANIK"] 
                      : level === 2 
                      ? ["ORGANIK", "ANORGANIK", "B3"] 
                      : ["ORGANIK", "ANORGANIK", "B3", "RESIDU"]
                    ).map(cat => (
                      <button 
                        key={cat}
                        onClick={() => handleSortTrash(cat)}
                        className="py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 rounded-xl hover:scale-[1.02] transition-transform text-xs"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Default Multiple Choice options for subject quizzes / others */}
              {id !== 'susun-kata' && id !== 'memory-card' && id !== 'pilah-sampah' && currentQ.options && (
                <div className="grid gap-3">
                  {Object.entries(currentQ.options).map(([key, value]: [string, any]) => {
                    const isSelected = selectedOption === key;
                    const optionCorrect = key === currentQ.correctAnswer;
                    
                    let btnStyle = "bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800";
                    if (isAnswered) {
                      if (optionCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-50 border-indigo-400 text-indigo-700";
                    }

                    return (
                      <button
                        key={key}
                        disabled={isAnswered}
                        onClick={() => handleAnswerSubmit(key === currentQ.correctAnswer, key)}
                        className={`flex items-center gap-3 p-4 border-2 rounded-2xl font-bold transition-all text-left text-sm ${btnStyle}`}
                      >
                        <span className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-900 border rounded-lg shrink-0">
                          {key}
                        </span>
                        <span>{t(value.id, value.en)}</span>
                      </button>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Answer Explanation & Continuation */}
            {isAnswered && (
              <div 
                className={`p-5 rounded-2xl border ${
                  isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>{isCorrect ? t("Jawaban Benar!", "Correct Answer!") : t("Jawaban Kurang Tepat!", "Incorrect Answer!")}</span>
                </div>
                <p className="text-xs opacity-90">{t(currentQ.explanation.id, currentQ.explanation.en)}</p>

                <Button onClick={nextQuestion} className="mt-4 bg-white hover:bg-slate-100 text-slate-800 font-bold border rounded-xl w-full">
                  {t("Lanjut", "Continue")}
                </Button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
