import { Question } from '@/lib/gamesSeedData';

export const ceritaRakyatQuestions: Question[] = [
  // Malin Kundang
  {
    id: "cerita-malin-1",
    gameId: "cerita-rakyat",
    level: 1,
    question: { id: "Kisah Malin Kundang berasal dari provinsi...", en: "The story of Malin Kundang originates from the province of..." },
    options: {
      A: { id: "Sumatera Barat", en: "West Sumatra" },
      B: { id: "Sumatera Utara", en: "North Sumatra" },
      C: { id: "Riau", en: "Riau" }
    },
    correctAnswer: "A",
    explanation: { id: "Malin Kundang berasal dari Pantai Air Manis, Sumatera Barat.", en: "Malin Kundang originates from Air Manis Beach, West Sumatra." },
    hint: { id: "Ibu kota provinsinya adalah Padang.", en: "The capital of the province is Padang." }
  },
  {
    id: "cerita-malin-2",
    gameId: "cerita-rakyat",
    level: 1,
    question: { id: "Mengapa Malin Kundang dikutuk menjadi batu?", en: "Why was Malin Kundang cursed into stone?" },
    options: {
      A: { id: "Karena durhaka kepada ibunya", en: "Because he was disobedient to his mother" },
      B: { id: "Karena mencuri harta raja", en: "Because he stole the king's treasure" },
      C: { id: "Karena merusak kapal dagang", en: "Because he damaged the merchant ship" }
    },
    correctAnswer: "A",
    explanation: { id: "Malin Kundang dikutuk menjadi batu setelah menolak mengakui ibu kandungnya sendiri.", en: "Malin Kundang was cursed into stone after refusing to acknowledge his birth mother." },
    hint: { id: "Sikap tidak hormat kepada orang tua kandung.", en: "Disrespectful attitude towards birth parents." }
  }
];
