import { Question } from '@/lib/gamesSeedData';

export const tebakGambarQuestions: Question[] = [
  // Level 1: Clean image
  {
    id: "tebak-l1-1",
    gameId: "tebak-gambar",
    level: 1,
    question: { id: "Hewan buas apakah pada gambar ini?", en: "Which wild animal is in this image?" },
    options: {
      A: { id: "Harimau", en: "Tiger" },
      B: { id: "Singa", en: "Lion" },
      C: { id: "Kucing", en: "Cat" }
    },
    correctAnswer: "A",
    imageUrl: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Gambar tersebut adalah seekor harimau sumatera.", en: "The image is a Sumatran tiger." },
    hint: { id: "Memiliki belang berwarna oranye dan hitam.", en: "It has orange and black stripes." }
  },

  // Level 2: Blurry
  {
    id: "tebak-l2-1",
    gameId: "tebak-gambar",
    level: 2,
    question: { id: "Bunga berwarna merah dan berduri apakah ini?", en: "Which red and thorny flower is this?" },
    options: {
      A: { id: "Mawar", en: "Rose" },
      B: { id: "Melati", en: "Jasmine" },
      C: { id: "Matahari", en: "Sunflower" },
      D: { id: "Anggrek", en: "Orchid" }
    },
    correctAnswer: "A",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Bunga mawar merah tangkainya berduri.", en: "A red rose flower has thorny stems." },
    hint: { id: "Sering digunakan sebagai lambang kasih sayang.", en: "Often used as a symbol of affection." }
  },

  // Level 3: Partially covered
  {
    id: "tebak-l3-1",
    gameId: "tebak-gambar",
    level: 3,
    question: { id: "Benda langit apakah ini?", en: "Which celestial body is this?" },
    options: {
      A: { id: "Bulan", en: "Moon" },
      B: { id: "Bintang", en: "Star" },
      C: { id: "Matahari", en: "Sun" },
      D: { id: "Planet", en: "Planet" }
    },
    correctAnswer: "A",
    imageUrl: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Gambar menunjukkan fase bulan sabit di langit malam.", en: "The image shows a crescent moon phase in the night sky." },
    hint: { id: "Bersinar terang di malam hari memantulkan cahaya matahari.", en: "Shines brightly at night by reflecting sunlight." }
  },

  // Level 4: Tiny circle view
  {
    id: "tebak-l4-1",
    gameId: "tebak-gambar",
    level: 4,
    question: { id: "Buah apakah ini?", en: "Which fruit is this?" },
    options: {
      A: { id: "Apel", en: "Apple" },
      B: { id: "Jeruk", en: "Orange" },
      C: { id: "Pisang", en: "Banana" },
      D: { id: "Semangka", en: "Watermelon" },
      E: { id: "Melon", en: "Melon" }
    },
    correctAnswer: "A",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Gambar menunjukkan apel merah segar.", en: "The image shows a fresh red apple." },
    hint: { id: "Berwarna merah manis dan digemari Snow White.", en: "Red sweet fruit loved by Snow White." }
  },

  // Level 5: Silhouette
  {
    id: "tebak-l5-1",
    gameId: "tebak-gambar",
    level: 5,
    question: { id: "Kendaraan apakah ini?", en: "Which vehicle is this?" },
    options: {
      A: { id: "Sepeda Motor", en: "Motorcycle" },
      B: { id: "Mobil", en: "Car" },
      C: { id: "Sepeda", en: "Bicycle" },
      D: { id: "Kereta", en: "Train" },
      E: { id: "Pesawat", en: "Airplane" }
    },
    correctAnswer: "C",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400",
    explanation: { id: "Siluet menunjukkan bentuk sepeda kayuh roda dua.", en: "The silhouette shows a two-wheeled pedal bicycle." },
    hint: { id: "Kendaraan ramah lingkungan beroda dua yang dijalankan dengan dikayuh.", en: "An eco-friendly two-wheeled vehicle operated by pedaling." }
  }
];
