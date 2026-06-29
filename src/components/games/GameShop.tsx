import React from 'react';
import { useGames } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Shield, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameShop({ isOpen, onClose }: Props) {
  const { player, shopItems, purchaseItem, equipItem, refillHearts, activeLanguage } = useGames();

  if (!isOpen) return null;

  const t = (idText: string, enText: string) => {
    return activeLanguage === 'id' ? idText : enText;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-orange-400 to-amber-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 animate-bounce" />
            <div>
              <h2 className="text-xl font-extrabold tracking-wide">{t("Toko Hadiah Cilik", "Junior Reward Shop")}</h2>
              <p className="text-xs opacity-90">{t("Gunakan koin belajarmu untuk beli item keren!", "Use your study coins to buy cool items!")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full font-bold">
              <span>🪙</span>
              <span>{player.coins}</span>
            </div>
            <button onClick={onClose} className="text-white hover:opacity-85 text-xl font-bold">✕</button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Refill Heart Section */}
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-500 text-white rounded-xl flex items-center justify-center text-2xl shadow-md">
                ❤️
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{t("Refill Nyawa (Hearts)", "Refill Hearts")}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t("Isi penuh nyawa kamu menjadi 5 kembali", "Fill up your hearts back to 5")}</p>
              </div>
            </div>
            <Button 
              onClick={refillHearts} 
              disabled={player.hearts >= 5}
              className="bg-rose-500 hover:bg-rose-600 text-white gap-1.5"
            >
              <span>🪙 20</span>
              <span>{player.hearts >= 5 ? t("Penuh", "Full") : t("Beli", "Refill")}</span>
            </Button>
          </div>

          {/* Shop Item List */}
          <div>
            <h3 className="font-extrabold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <span>🦁</span> {t("Koleksi Avatar Cilik", "Kid Avatars Collection")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {shopItems.filter(item => item.type === 'avatar').map(item => {
                const owned = player.itemsOwned.includes(item.id);
                const active = player.avatarUrl === item.itemValue;
                
                return (
                  <div key={item.id} className="border dark:border-slate-800 rounded-xl p-3 flex flex-col items-center justify-between text-center bg-slate-50/50 dark:bg-slate-800/40 relative">
                    <div className="text-4xl my-2 animate-pulse">{item.itemValue}</div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{t(item.name.id, item.name.en)}</div>
                    
                    <div className="mt-3 w-full">
                      {owned ? (
                        <Button 
                          onClick={() => equipItem('avatar', item.itemValue)}
                          variant={active ? "default" : "outline"} 
                          size="sm" 
                          className="w-full text-[11px]"
                        >
                          {active ? t("Dipasang", "Equipped") : t("Pakai", "Equip")}
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => purchaseItem(item.id)}
                          size="sm" 
                          variant="secondary"
                          className="w-full text-[11px] bg-amber-400 hover:bg-amber-500 text-white gap-1"
                        >
                          <span>🪙</span>
                          <span>{item.cost}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frames Section */}
          <div>
            <h3 className="font-extrabold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <span>✨</span> {t("Bingkai Avatar Keren", "Cool Profile Frames")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {shopItems.filter(item => item.type === 'frame').map(item => {
                const owned = player.itemsOwned.includes(item.id);
                const active = player.frameUrl === item.itemValue;
                
                return (
                  <div key={item.id} className="border dark:border-slate-800 rounded-xl p-3 flex flex-col items-center justify-between bg-slate-50/50 dark:bg-slate-800/40 text-center">
                    <div className="my-2">
                      <div className={`w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl overflow-hidden mx-auto ${item.itemValue}`}>
                        🎓
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{t(item.name.id, item.name.en)}</div>
                    
                    <div className="mt-3 w-full">
                      {owned ? (
                        <Button 
                          onClick={() => equipItem('frame', item.itemValue)}
                          variant={active ? "default" : "outline"} 
                          size="sm" 
                          className="w-full text-[11px]"
                        >
                          {active ? t("Dipasang", "Equipped") : t("Pakai", "Equip")}
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => purchaseItem(item.id)}
                          size="sm" 
                          variant="secondary"
                          className="w-full text-[11px] bg-amber-400 hover:bg-amber-500 text-white gap-1"
                        >
                          <span>🪙</span>
                          <span>{item.cost}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
