import { Question } from '../types';

export const tebakGambarData: Question[] = [
  {
    id: "tebak-l1-1",
    gameId: "tebak-gambar",
    level: 1,
    question: { id: "Hewan apakah pada gambar ini?", en: "Which animal is in this image?" },
    options: {
      A: { id: "Harimau", en: "Tiger" },
      B: { id: "Singa", en: "Lion" },
      C: { id: "Kucing", en: "Cat" }
    },
    correctAnswer: "A",
    imageUrl: "/games/tebak-gambar.png",
    explanation: { id: "Gambar tersebut adalah seekor harimau.", en: "The image is a tiger." },
    hint: { id: "Hewan berkaki empat yang memiliki loreng hitam-oranye.", en: "A four-legged animal with black-orange stripes." }
  }
];
