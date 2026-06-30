import { Question } from '@/lib/gamesSeedData';

export const mathQuestions: Question[] = [
  // Level 1: Addition
  {
    id: "math-l1-1",
    gameId: "math-challenge",
    level: 1,
    question: { id: "Berapakah 12 + 15?", en: "What is 12 + 15?" },
    options: {
      A: { id: "27", en: "27" },
      B: { id: "25", en: "25" },
      C: { id: "29", en: "29" }
    },
    correctAnswer: "A",
    explanation: { id: "12 + 15 = 27.", en: "12 + 15 = 27." },
    hint: { id: "Jumlahkan 2 + 5 dahulu, kemudian 10 + 10.", en: "Add 2 + 5 first, then 10 + 10." }
  },
  {
    id: "math-l1-2",
    gameId: "math-challenge",
    level: 1,
    question: { id: "Berapakah 34 + 8?", en: "What is 34 + 8?" },
    options: {
      A: { id: "42", en: "42" },
      B: { id: "40", en: "40" },
      C: { id: "44", en: "44" }
    },
    correctAnswer: "A",
    explanation: { id: "34 + 8 = 42.", en: "34 + 8 = 42." },
    hint: { id: "Tambahkan 6 untuk mencapai 40, lalu sisa 2.", en: "Add 6 to reach 40, then add the remaining 2." }
  },

  // Level 2: Subtraction
  {
    id: "math-l2-1",
    gameId: "math-challenge",
    level: 2,
    question: { id: "Berapakah 45 - 18?", en: "What is 45 - 18?" },
    options: {
      A: { id: "27", en: "27" },
      B: { id: "25", en: "25" },
      C: { id: "23", en: "23" },
      D: { id: "29", en: "29" }
    },
    correctAnswer: "A",
    explanation: { id: "45 - 18 = 27.", en: "45 - 18 = 27." },
    hint: { id: "Kurangi 20 dahulu, kemudian tambahkan 2.", en: "Subtract 20 first, then add 2." }
  },

  // Level 3: Multiplication
  {
    id: "math-l3-1",
    gameId: "math-challenge",
    level: 3,
    question: { id: "Berapakah 7 x 8?", en: "What is 7 x 8?" },
    options: {
      A: { id: "56", en: "56" },
      B: { id: "54", en: "54" },
      C: { id: "48", en: "48" },
      D: { id: "62", en: "62" }
    },
    correctAnswer: "A",
    explanation: { id: "7 dikalikan 8 adalah 56.", en: "7 multiplied by 8 is 56." },
    hint: { id: "Dapat dihitung dari (7 x 7) + 7.", en: "Can be calculated as (7 x 7) + 7." }
  },

  // Level 4: Division
  {
    id: "math-l4-1",
    gameId: "math-challenge",
    level: 4,
    question: { id: "Berapakah 72 : 9?", en: "What is 72 / 9?" },
    options: {
      A: { id: "8", en: "8" },
      B: { id: "7", en: "7" },
      C: { id: "9", en: "9" },
      D: { id: "6", en: "6" },
      E: { id: "10", en: "10" }
    },
    correctAnswer: "A",
    explanation: { id: "72 dibagi 9 adalah 8 karena 8 x 9 = 72.", en: "72 divided by 9 is 8 because 8 x 9 = 72." },
    hint: { id: "Ingat tabel perkalian 9.", en: "Recall the multiplication table of 9." }
  },

  // Level 5: Word Problems
  {
    id: "math-l5-1",
    gameId: "math-challenge",
    level: 5,
    question: { id: "Budi memiliki 4 kotak kelereng. Setiap kotak berisi 15 kelereng. Jika ia memberikan 12 kelereng kepada adiknya, berapa sisa kelereng Budi?", en: "Budi has 4 boxes of marbles. Each box contains 15 marbles. If he gives 12 marbles to his sibling, how many marbles are left?" },
    options: {
      A: { id: "48", en: "48" },
      B: { id: "45", en: "45" },
      C: { id: "50", en: "50" },
      D: { id: "42", en: "42" },
      E: { id: "38", en: "38" }
    },
    correctAnswer: "A",
    explanation: { id: "Total awal: 4 x 15 = 60 kelereng. Sisa: 60 - 12 = 48 kelereng.", en: "Initial total: 4 x 15 = 60 marbles. Remainder: 60 - 12 = 48 marbles." },
    hint: { id: "Kalikan jumlah kotak dengan isinya, lalu kurangi pemberiannya.", en: "Multiply the boxes count by its contents, then subtract the given amount." }
  }
];
