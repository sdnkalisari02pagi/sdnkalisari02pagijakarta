import { Question } from '../types';

export const bahasaIndonesiaQuiz: Question[] = [
  {
    id: "quiz-bi-l1-1",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Huruf kapital digunakan pada awal...", en: "Capital letters are used at the beginning of..." },
    options: {
      A: { id: "Nama orang", en: "People's names" },
      B: { id: "Nama benda", en: "Object names" },
      C: { id: "Nama hewan", en: "Animal names" }
    },
    correctAnswer: "A",
    explanation: { id: "Huruf kapital digunakan untuk huruf pertama nama diri, nama orang, hari, bulan, dan nama tempat.", en: "Capital letters are used for the first letter of proper names, people's names, days, months, and place names." },
    hint: { id: "Contoh: Budi, Jakarta.", en: "Example: Budi, Jakarta." }
  }
];
