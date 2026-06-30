import { Question } from '@/lib/gamesSeedData';

export const puzzleQuestions: Question[] = [
  // Level 1: Islands & Maps
  {
    id: "puzzle-l1-1",
    gameId: "puzzle-indo",
    level: 1,
    question: { id: "Apakah nama pulau terbesar di Indonesia yang ditunjukkan pada peta bagian barat?", en: "What is the name of the largest island in Indonesia shown in the western part of the map?" },
    options: {
      A: { id: "Sumatera", en: "Sumatra" },
      B: { id: "Jawa", en: "Java" },
      C: { id: "Bali", en: "Bali" }
    },
    correctAnswer: "A",
    explanation: { id: "Sumatera adalah pulau terbesar di wilayah barat Indonesia.", en: "Sumatra is the largest island in the western region of Indonesia." },
    hint: { id: "Pulau ini terkenal dengan Danau Toba.", en: "This island is famous for Lake Toba." }
  },
  {
    id: "puzzle-l1-2",
    gameId: "puzzle-indo",
    level: 1,
    question: { id: "Pulau manakah yang memiliki jumlah penduduk terpadat di Indonesia?", en: "Which island has the highest population density in Indonesia?" },
    options: {
      A: { id: "Jawa", en: "Java" },
      B: { id: "Kalimantan", en: "Kalimantan" },
      C: { id: "Papua", en: "Papua" }
    },
    correctAnswer: "A",
    explanation: { id: "Jawa merupakan pusat pemerintahan dan pulau terpadat di Indonesia.", en: "Java is the center of government and the most populated island in Indonesia." },
    hint: { id: "Ibu kota Jakarta terletak di pulau ini.", en: "The capital city Jakarta is located on this island." }
  },

  // Level 2: Traditional Houses (Rumah Adat)
  {
    id: "puzzle-l2-1",
    gameId: "puzzle-indo",
    level: 2,
    question: { id: "Rumah adat Tongkonan dengan atap melengkung menyerupai perahu berasal dari suku...", en: "The Tongkonan traditional house with a curved roof resembling a boat originates from the tribe..." },
    options: {
      A: { id: "Toraja", en: "Toraja" },
      B: { id: "Minangkabau", en: "Minangkabau" },
      C: { id: "Batak", en: "Batak" },
      D: { id: "Dayak", en: "Dayak" }
    },
    correctAnswer: "A",
    explanation: { id: "Rumah adat Tongkonan merupakan rumah tradisional suku Toraja di Sulawesi Selatan.", en: "The Tongkonan house is the traditional home of the Toraja people in South Sulawesi." },
    hint: { id: "Terletak di provinsi Sulawesi Selatan.", en: "Located in the province of South Sulawesi." }
  },

  // Level 3: Traditional Dances
  {
    id: "puzzle-l3-1",
    gameId: "puzzle-indo",
    level: 3,
    question: { id: "Tari Saman yang mengutamakan kekompakan tepukan tangan berasal dari daerah...", en: "The Saman dance which emphasizes synchronized hand clapping originates from the region of..." },
    options: {
      A: { id: "Aceh", en: "Aceh" },
      B: { id: "Sumatera Utara", en: "North Sumatra" },
      C: { id: "Padang", en: "Padang" },
      D: { id: "Jambi", en: "Jambi" }
    },
    correctAnswer: "A",
    explanation: { id: "Tari Saman adalah tari tradisional suku Gayo di provinsi Aceh.", en: "Saman dance is a traditional dance of the Gayo tribe in Aceh province." },
    hint: { id: "Provinsi paling ujung barat Indonesia.", en: "The westernmost province of Indonesia." }
  }
];
