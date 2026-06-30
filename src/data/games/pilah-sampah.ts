import { Question } from '../types';

export const pilahSampahData: Question[] = [
  {
    id: "waste-procedural-1-0",
    gameId: "pilah-sampah",
    level: 1,
    question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
    correctAnswer: "ORGANIK",
    explanation: { id: "Kulit pisang mudah membusuk dan terurai secara alami.", en: "Banana peel decomposes easily and naturally." },
    hint: { id: "Merupakan sampah sisa bahan organik.", en: "It is residual organic material waste." },
    metadata: {
      Items: [
        { name: { id: "Kulit Pisang", en: "Banana Peel" }, type: "ORGANIK" },
        { name: { id: "Botol Plastik", en: "Plastic Bottle" }, type: "ANORGANIK" }
      ]
    }
  }
];
