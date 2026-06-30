import { Question } from '@/lib/gamesSeedData';

export const wordSearchQuestions: Question[] = [
  // Level 1: Find simple words
  {
    id: "wordsearch-l1-1",
    gameId: "word-search",
    level: 1,
    question: { id: "Carilah kata 'BUKU' di antara susunan huruf acak. Apa kegunaan utama buku?", en: "Find the word 'BUKU' in the scramble. What is the primary use of a book?" },
    options: {
      A: { id: "Untuk membaca dan belajar", en: "To read and study" },
      B: { id: "Untuk menulis surat saja", en: "Only to write letters" },
      C: { id: "Untuk membungkus makanan", en: "To wrap food" }
    },
    correctAnswer: "A",
    explanation: { id: "Buku berisi ilmu pengetahuan yang dibaca untuk belajar.", en: "Books contain knowledge read for learning purposes." },
    hint: { id: "Dipakai belajar oleh siswa.", en: "Used by students to study." }
  },
  {
    id: "wordsearch-l1-2",
    gameId: "word-search",
    level: 1,
    question: { id: "Carilah kata 'TAS' di dalam grid. Manakah benda yang ditaruh di dalam tas sekolah?", en: "Find the word 'TAS' in the grid. Which item is placed inside a school bag?" },
    options: {
      A: { id: "Buku dan Pensil", en: "Book and Pencil" },
      B: { id: "Piring dan Sendok", en: "Plate and Spoon" },
      C: { id: "Bantal tidur", en: "Sleeping pillow" }
    },
    correctAnswer: "A",
    explanation: { id: "Buku tulis dan alat tulis disimpan di dalam tas sekolah agar mudah dibawa.", en: "Notebooks and writing tools are stored in school bags for easy transport." },
    hint: { id: "Alat tulis menulis.", en: "Writing utensils." }
  }
];
