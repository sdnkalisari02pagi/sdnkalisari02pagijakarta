import { Question } from '@/lib/gamesSeedData';

export const rambuQuestions: Question[] = [
  {
    id: "rambu-p-1",
    gameId: "rambu-lalu-lintas",
    level: 1,
    question: { id: "Apakah arti rambu huruf 'S' dicoret garis merah?", en: "What is the meaning of a sign with letter 'S' crossed by a red line?" },
    options: {
      A: { id: "Dilarang Berhenti (Stop)", en: "No Stopping (Stop)" },
      B: { id: "Dilarang Parkir", en: "No Parking" },
      C: { id: "Dilarang Masuk", en: "No Entry" }
    },
    correctAnswer: "A",
    imageUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Rambu S dicoret berarti pengendara dilarang memberhentikan kendaraannya.", en: "The crossed S sign means drivers are prohibited from stopping their vehicles." },
    hint: { id: "Huruf S berarti Stop (Berhenti).", en: "The letter S stands for Stop." }
  },
  {
    id: "rambu-p-2",
    gameId: "rambu-lalu-lintas",
    level: 1,
    question: { id: "Apakah arti rambu huruf 'P' dicoret garis merah?", en: "What is the meaning of a sign with letter 'P' crossed by a red line?" },
    options: {
      A: { id: "Dilarang Parkir", en: "No Parking" },
      B: { id: "Dilarang Berhenti", en: "No Stopping" },
      C: { id: "Dilarang Putar Balik", en: "No U-Turn" }
    },
    correctAnswer: "A",
    explanation: { id: "Rambu P dicoret berarti dilarang memarkirkan kendaraan di area tersebut.", en: "The crossed P sign means parking vehicles is prohibited in that area." },
    hint: { id: "Huruf P berarti Parkir.", en: "The letter P stands for Parking." }
  }
];
