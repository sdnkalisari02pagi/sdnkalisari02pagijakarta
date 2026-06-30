import { Question } from '../types';

export const rambuLaluLintasData: Question[] = [
  {
    id: "rambu-l1-1",
    gameId: "rambu-lalu-lintas",
    level: 1,
    question: { id: "Apakah arti rambu huruf 'S' dicoret garis merah?", en: "What is the meaning of a sign with letter 'S' crossed by a red line?" },
    options: {
      A: { id: "Dilarang Berhenti (Stop)", en: "No Stopping (Stop)" },
      B: { id: "Dilarang Parkir", en: "No Parking" },
      C: { id: "Dilarang Masuk", en: "No Entry" }
    },
    correctAnswer: "A",
    imageUrl: "/games/rambu-lalu-lintas.png",
    explanation: { id: "Rambu S dicoret berarti pengendara dilarang memberhentikan kendaraannya.", en: "The crossed S sign means drivers are prohibited from stopping their vehicles." },
    hint: { id: "Huruf S berarti Stop (Berhenti).", en: "The letter S stands for Stop." }
  }
];
