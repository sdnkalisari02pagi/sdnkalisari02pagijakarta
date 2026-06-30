import { Question } from '../types';

export const ceritaRakyatData: Question[] = [
  {
    id: "cerita-malin-1",
    kelas: 1,
    level: 1,
    category: "Sastra",
    topic: "Dongeng Nusantara",
    question: { id: "Kisah Malin Kundang berasal dari daerah pantai di provinsi...", en: "The story of Malin Kundang originates from a coastal area in the province of..." },
    options: {
      A: { id: "Sumatera Barat", en: "West Sumatra" },
      B: { id: "Sumatera Utara", en: "North Sumatra" },
      C: { id: "Riau", en: "Riau" },
      D: { id: "Jambi", en: "Jambi" }
    },
    correctAnswer: "A",
    explanation: { id: "Cerita rakyat Malin Kundang berasal dari Pantai Air Manis di Sumatera Barat.", en: "The folklore of Malin Kundang comes from Air Manis Beach in West Sumatra." },
    hint: { id: "Ibu kotanya Padang.", en: "Its capital is Padang." }
  }
];
