import { Question } from '../types';

export const susunKataData: Question[] = [
  {
    id: "scramble-l1-1",
    gameId: "susun-kata",
    level: 1,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "API",
    explanation: { id: "Huruf A-P-I membentuk kata API.", en: "Letters A-P-I form the word API." },
    hint: { id: "Digunakan untuk memasak, bersifat panas.", en: "Used for cooking, hot in nature." },
    metadata: { Words: [{ id: "API", en: "FIRE" }], Answers: ["API", "FIRE"] }
  }
];
