import { Question } from '@/lib/gamesSeedData';

export const scrambleQuestions: Question[] = [
  // Level 1: 3 letters
  {
    id: "scramble-l1-1",
    gameId: "susun-kata",
    level: 1,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "API",
    explanation: { id: "Huruf A-P-I membentuk kata API.", en: "Letters A-P-I form the word API." },
    hint: { id: "Panas dan bercahaya jingga/merah.", en: "Hot and glows orange/red." },
    metadata: { Words: [{ id: "API", en: "FIRE" }], Answers: ["API", "FIRE"] }
  },
  {
    id: "scramble-l1-2",
    gameId: "susun-kata",
    level: 1,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "TAS",
    explanation: { id: "Huruf T-A-S membentuk kata TAS.", en: "Letters T-A-S form the word TAS." },
    hint: { id: "Digunakan untuk membawa buku sekolah.", en: "Used to carry school books." },
    metadata: { Words: [{ id: "TAS", en: "BAG" }], Answers: ["TAS", "BAG"] }
  },

  // Level 2: 4 letters
  {
    id: "scramble-l2-1",
    gameId: "susun-kata",
    level: 2,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "BUKU",
    explanation: { id: "Huruf B-U-K-U membentuk kata BUKU.", en: "Letters B-U-K-U form the word BUKU." },
    hint: { id: "Sumber ilmu yang dibaca.", en: "A source of knowledge to read." },
    metadata: { Words: [{ id: "BUKU", en: "BOOK" }], Answers: ["BUKU", "BOOK"] }
  },

  // Level 3: 5 letters
  {
    id: "scramble-l3-1",
    gameId: "susun-kata",
    level: 3,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "GAJAH",
    explanation: { id: "Huruf G-A-J-A-H membentuk kata GAJAH.", en: "Letters G-A-J-A-H form the word GAJAH." },
    hint: { id: "Hewan darat berbelalai panjang.", en: "A land animal with a long trunk." },
    metadata: { Words: [{ id: "GAJAH", en: "ELEPHANT" }], Answers: ["GAJAH", "ELEPHANT"] }
  },

  // Level 4: 6 letters
  {
    id: "scramble-l4-1",
    gameId: "susun-kata",
    level: 4,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "PENSIL",
    explanation: { id: "Huruf P-E-N-S-I-L membentuk kata PENSIL.", en: "Letters P-E-N-S-I-L form the word PENSIL." },
    hint: { id: "Alat tulis kayu yang bisa dihapus.", en: "A wooden writing tool that can be erased." },
    metadata: { Words: [{ id: "PENSIL", en: "PENCIL" }], Answers: ["PENSIL", "PENCIL"] }
  },

  // Level 5: 7-10 letters
  {
    id: "scramble-l5-1",
    gameId: "susun-kata",
    level: 5,
    question: { id: "Susun huruf-huruf acak berikut!", en: "Rearrange these scrambled letters!" },
    correctAnswer: "INDONESIA",
    explanation: { id: "Huruf I-N-D-O-N-E-S-I-A membentuk kata INDONESIA.", en: "Letters I-N-D-O-N-E-S-I-A form the word INDONESIA." },
    hint: { id: "Negara kepulauan tanah air kita.", en: "Our home country, an archipelago." },
    metadata: { Words: [{ id: "INDONESIA", en: "INDONESIA" }], Answers: ["INDONESIA", "INDONESIA"] }
  }
];
