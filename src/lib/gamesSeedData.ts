// Dynamic AI Question & Vocabulary Bank Generator for Games Edukasi (SDN Kalisari 02 Pagi)

export interface BilingualText {
  id: string;
  en: string;
}

export interface Question {
  id: string;
  gameId: string;
  level: number;
  question: BilingualText;
  options?: {
    A: BilingualText;
    B: BilingualText;
    C: BilingualText;
    D: BilingualText;
    E?: BilingualText;
  };
  correctAnswer: string;
  explanation: BilingualText;
  hint: BilingualText;
  imageUrl?: string;
  metadata?: any;
}

export const gamesList = [
  {
    id: "quiz-mapel",
    slug: "quiz-mapel",
    title: { id: "Kuis Mata Pelajaran", en: "Subject Quiz" },
    description: { id: "Kuis pilihan ganda seru berbagai mata pelajaran sekolah yang selalu berganti setiap dimainkan!", en: "Fun multiple choice quiz of school subjects that changes every time you play!" },
    cover: "/games/kuis-mapel.png",
    difficulty: "easy",
    xpReward: 100,
    coinReward: 10,
    totalLevels: 5
  },
  {
    id: "math-challenge",
    slug: "math-challenge",
    title: { id: "Tantangan Matematika", en: "Math Challenge" },
    description: { id: "Uji kecepatan berhitungmu dengan penjumlahan, pecahan, KPK, dan lainnya secara cepat!", en: "Test your calculation speed with addition, fractions, LCM, and more quickly!" },
    cover: "/games/math-challenge.png",
    difficulty: "medium",
    xpReward: 120,
    coinReward: 15,
    totalLevels: 5
  },
  {
    id: "susun-kata",
    slug: "susun-kata",
    title: { id: "Susun Kata", en: "Word Scramble" },
    description: { id: "Susun huruf-huruf acak menjadi kata yang benar sesuai kategori tema menarik.", en: "Arrange scrambled letters into correct words based on exciting categories." },
    cover: "/games/susun-kata.png",
    difficulty: "easy",
    xpReward: 80,
    coinReward: 8,
    totalLevels: 5
  },
  {
    id: "tebak-gambar",
    slug: "tebak-gambar",
    title: { id: "Tebak Gambar", en: "Guess the Image" },
    description: { id: "Perhatikan gambar dengan saksama dan tebak nama objeknya!", en: "Observe the image carefully and guess the name of the object!" },
    cover: "/games/tebak-gambar.png",
    difficulty: "easy",
    xpReward: 90,
    coinReward: 10,
    totalLevels: 5
  },
  {
    id: "memory-card",
    slug: "memory-card",
    title: { id: "Kartu Memori", en: "Memory Match" },
    description: { id: "Buka pasangan kartu bergambar yang cocok untuk melatih daya ingatmu.", en: "Flip matching pair cards of images to exercise your brain memory." },
    cover: "/games/memory-card.png",
    difficulty: "easy",
    xpReward: 80,
    coinReward: 8,
    totalLevels: 5
  },
  {
    id: "word-search",
    slug: "word-search",
    title: { id: "Cari Kata", en: "Word Search" },
    description: { id: "Temukan semua kata tersembunyi di dalam grid susunan huruf acak.", en: "Find all the hidden words within the grid of scrambled letters." },
    cover: "/games/word-search.png",
    difficulty: "medium",
    xpReward: 100,
    coinReward: 10,
    totalLevels: 5
  },
  {
    id: "puzzle-indo",
    slug: "puzzle-indo",
    title: { id: "Puzzle Nusantara", en: "Nusantara Puzzle" },
    description: { id: "Susun potongan gambar wilayah pulau, pakaian adat, dan budaya khas Indonesia.", en: "Assemble puzzle pieces of islands, traditional clothes, and cultures of Indonesia." },
    cover: "/games/puzzle-indo.png",
    difficulty: "medium",
    xpReward: 110,
    coinReward: 12,
    totalLevels: 5
  },
  {
    id: "pilah-sampah",
    slug: "pilah-sampah",
    title: { id: "Pilah Sampah", en: "Waste Sorting" },
    description: { id: "Bantu bersihkan lingkungan dengan memilah jenis sampah ke tempat yang tepat!", en: "Help clean up the environment by sorting waste types into the correct bins!" },
    cover: "/games/pilah-sampah.png",
    difficulty: "easy",
    xpReward: 100,
    coinReward: 12,
    totalLevels: 5
  },
  {
    id: "cerita-rakyat",
    slug: "cerita-rakyat",
    title: { id: "Cerita Rakyat", en: "Folktales Quest" },
    description: { id: "Baca kisah cerita rakyat nusantara dan jawab kuis petualangannya.", en: "Read the stories of Indonesian folktales and answer adventure quizzes." },
    cover: "/games/cerita-rakyat.png",
    difficulty: "easy",
    xpReward: 90,
    coinReward: 10,
    totalLevels: 5
  },
  {
    id: "rambu-lalu-lintas",
    slug: "rambu-lalu-lintas",
    title: { id: "Rambu Lalu Lintas", en: "Traffic Signs Edu" },
    description: { id: "Pahami arti rambu-rambu di jalan raya agar selamat dalam berlalu lintas.", en: "Understand the meaning of road signs to stay safe in highway traffic." },
    cover: "/games/rambu-lalu-lintas.png",
    difficulty: "easy",
    xpReward: 90,
    coinReward: 10,
    totalLevels: 5
  }
];

export const badgesData = [
  { code: "math-master", name: { id: "Master Matematika", en: "Math Master" }, desc: { id: "Selesaikan level 5 game Tantangan Matematika", en: "Complete level 5 of Math Challenge game" }, icon: "📐" },
  { code: "bahasa-master", name: { id: "Master Bahasa", en: "Language Master" }, desc: { id: "Selesaikan semua level game Susun Kata", en: "Complete all levels of Word Scramble game" }, icon: "✍️" },
  { code: "green-hero", name: { id: "Pahlawan Hijau", en: "Green Hero" }, desc: { id: "Dapatkan skor sempurna di game Pilah Sampah", en: "Get perfect score in Waste Sorting game" }, icon: "🌱" }
];

export const avatarItems = [
  { id: "av-1", type: "avatar", name: { id: "Anak Berani", en: "Brave Kid" }, cost: 20, itemValue: "🦁" },
  { id: "av-2", type: "avatar", name: { id: "Kucing Cerdas", en: "Smart Cat" }, cost: 40, itemValue: "🐱" },
  { id: "av-3", type: "avatar", name: { id: "Astronot Cilik", en: "Junior Astronaut" }, cost: 60, itemValue: "👩‍🚀" },
  { id: "av-4", type: "avatar", name: { id: "Robot Belajar", en: "Learning Robot" }, cost: 80, itemValue: "🤖" },
  { id: "av-5", type: "avatar", name: { id: "Naga Emas", en: "Golden Dragon" }, cost: 100, itemValue: "🐉" },
  { id: "fr-1", type: "frame", name: { id: "Bingkai Emas", en: "Gold Frame" }, cost: 30, itemValue: "border-amber-400 border-4 animate-pulse" },
  { id: "fr-2", type: "frame", name: { id: "Bingkai Neon", en: "Neon Frame" }, cost: 50, itemValue: "border-cyan-400 border-4 shadow-[0_0_10px_#22d3ee]" },
  { id: "fr-3", type: "frame", name: { id: "Bingkai Pelangi", en: "Rainbow Frame" }, cost: 70, itemValue: "border-pink-500 border-4 border-double" }
];

// Emojis for Memory Match Games (100+ pairs)
export const memoryCardEmojis = [
  "🦁", "🐱", "👩‍🚀", "🤖", "🐉", "🐼", "🦄", "🐨", "🦊", "🐯", "🐶", "🐹", "🐰", "🐻", "🐮", 
  "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🐝", "🐛",
  "🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥕",
  "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🚲", "🛵",
  "🚀", "🛸", "🚁", "⛵", "🚢", "✈️", "🗺️", "🌍", "🪐", "⭐", "🌙", "☀️", "☁️", "⚡", "🌈"
];

// Helper to shuffle array and return choices mapping based on requested choices count
function shuffleChoicesProgressive(correct: BilingualText, wrongs: BilingualText[], choiceCount: number) {
  // slice wrongs to match options limit
  const neededWrongs = wrongs.slice(0, choiceCount - 1);
  const all = [correct, ...neededWrongs].sort(() => Math.random() - 0.5);
  const letters = ["A", "B", "C", "D", "E"];
  
  const options: Record<string, BilingualText> = {};
  all.forEach((val, idx) => {
    options[letters[idx]] = val;
  });

  const correctLetter = letters[all.indexOf(correct)];
  return { options, correctAnswer: correctLetter };
}

// -------------------------------------------------------------
// 1. SUBJECT QUIZ DATA POOLS (100+ unique questions per level group)
// -------------------------------------------------------------
const mapelSeedsL1_2 = [
  { q: "Apa nama ibukota negara Indonesia?", qEn: "What is the capital city of Indonesia?", c: "Jakarta", w: ["Bandung", "Surabaya", "Medan", "Semarang"], ext: "Jakarta adalah ibukota negara Indonesia saat ini.", extEn: "Jakarta is currently the capital of Indonesia." },
  { q: "Warna bendera negara kita Indonesia adalah...", qEn: "The colors of the Indonesian flag are...", c: "Merah dan Putih", w: ["Merah dan Biru", "Hijau dan Putih", "Kuning dan Merah", "Biru dan Putih"], ext: "Bendera Indonesia berwarna Merah di bagian atas dan Putih di bagian bawah.", extEn: "The Indonesian flag is Red on top and White on the bottom." },
  { q: "Hewan apa yang berkokok di pagi hari?", qEn: "Which animal crows in the morning?", c: "Ayam", w: ["Bebek", "Kambing", "Kucing", "Sapi"], ext: "Ayam jantan berkokok di pagi hari menandakan fajar tiba.", extEn: "Roosters crow in the morning to signal dawn." },
  { q: "Benda langit yang memancarkan cahaya sendiri di siang hari adalah...", qEn: "The celestial body that emits its own light during the day is...", c: "Matahari", w: ["Bulan", "Bintang", "Planet", "Meteor"], ext: "Matahari adalah bintang terdekat yang menyinari bumi di siang hari.", extEn: "The sun is the closest star that lights the earth during the day." }
];

const mapelSeedsL3_4 = [
  { q: "Siapakah pencipta lagu kebangsaan Indonesia Raya?", qEn: "Who composed the national anthem Indonesia Raya?", c: "W.R. Soepratman", w: ["Ibu Sud", "Kusbini", "C. Simanjuntak", "Ismail Marzuki"], ext: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Soepratman.", extEn: "The national anthem Indonesia Raya was composed by Wage Rudolf Soepratman." },
  { q: "Alat pernapasan pada ikan saat berada di dalam air adalah...", qEn: "The breathing organ of fish in water is...", c: "Insang", w: ["Paru-paru", "Trakea", "Kulit", "Pundi udara"], ext: "Ikan bernapas menyerap oksigen air menggunakan insang.", extEn: "Fish breathe by absorbing oxygen from water using gills." },
  { q: "Candi Borobudur terletak di provinsi...", qEn: "Borobudur Temple is located in the province of...", c: "Jawa Tengah", w: ["Jawa Barat", "Jawa Timur", "Yogyakarta", "Bali"], ext: "Candi Borobudur merupakan candi Buddha terbesar di Jawa Tengah.", extEn: "Borobudur Temple is the largest Buddhist temple in Central Java." }
];

const mapelSeedsL5 = [
  { q: "Peristiwa Rengasdengklok terjadi karena adanya perbedaan pendapat antara...", qEn: "The Rengasdengklok event occurred due to differences of opinion between...", c: "Golongan Muda dan Golongan Tua", w: ["Jepang dan Belanda", "BPUPKI dan PPKI", "Sekutu dan Indonesia", "Soekarno dan Hatta"], ext: "Peristiwa penculikan ini terjadi untuk mendesak proklamasi kemerdekaan.", extEn: "This kidnapping incident occurred to hasten the proclamation of independence." },
  { q: "Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari disebut...", qEn: "The process of food making in green plants with the help of sunlight is called...", c: "Fotosintesis", w: ["Respirasi", "Transpirasi", "Oksidasi", "Evaporasi"], ext: "Fotosintesis menghasilkan glukosa dan oksigen bagi tumbuhan.", extEn: "Photosynthesis produces glucose and oxygen for plants." }
];

// -------------------------------------------------------------
// 3. SUSUN KATA WORD SCRAMBLE (200+ vocabularies database)
// -------------------------------------------------------------
const vocabL1 = [
  { id: "API", en: "FIRE", cat: "Benda" }, { id: "BUS", en: "BUS", cat: "Kendaraan" }, { id: "TEH", en: "TEA", cat: "Minuman" },
  { id: "CAT", en: "PAINT", cat: "Benda" }, { id: "TAS", en: "BAG", cat: "Sekolah" }, { id: "AIR", en: "WATER", cat: "Alam" }
];
const vocabL2 = [
  { id: "BUKU", en: "BOOK", cat: "Sekolah" }, { id: "BOLA", en: "BALL", cat: "Mainan" }, { id: "ROTI", en: "BREAD", cat: "Makanan" },
  { id: "MEJA", en: "DESK", cat: "Sekolah" }, { id: "GURU", en: "TEACHER", cat: "Sekolah" }, { id: "SAPI", en: "COW", cat: "Hewan" }
];
const vocabL3 = [
  { id: "GAJAH", en: "ELEPHANT", cat: "Hewan" }, { id: "BUAYA", en: "CROCODILE", cat: "Hewan" }, { id: "KELAS", en: "CLASSROOM", cat: "Sekolah" },
  { id: "POHON", en: "TREE", cat: "Tumbuhan" }, { id: "LAMPU", en: "LAMP", cat: "Benda" }, { id: "RUMAH", en: "HOUSE", cat: "Bangunan" }
];
const vocabL4 = [
  { id: "PENSIL", en: "PENCIL", cat: "Sekolah" }, { id: "KERTAS", en: "PAPER", cat: "Sekolah" }, { id: "MANGGA", en: "MANGO", cat: "Buah" },
  { id: "SEPATU", en: "SHOES", cat: "Pakaian" }, { id: "LEMARI", en: "CABINET", cat: "Benda" }, { id: "SENDOK", en: "SPOON", cat: "Dapur" }
];
const vocabL5 = [
  { id: "INDONESIA", en: "INDONESIA", cat: "Negara" }, { id: "MATEMATIKA", en: "MATHEMATICS", cat: "Pelajaran" }, { id: "PANCASILA", en: "PANCASILA", cat: "Negara" },
  { id: "PERPUSTAKAAN", en: "LIBRARY", cat: "Sekolah" }, { id: "LINGKUNGAN", en: "ENVIRONMENT", cat: "Alam" }
];

// -------------------------------------------------------------
// 4. TEBAK GAMBAR SEEDS
// -------------------------------------------------------------
const imageSeeds = [
  { c: "Harimau", w: ["Kucing", "Singa", "Serigala"], url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400", q: "Hewan buas apakah pada gambar ini?", qEn: "Which wild animal is in this image?" },
  { c: "Mawar", w: ["Melati", "Matahari", "Anggrek"], url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", q: "Bunga indah berduri apakah ini?", qEn: "Which beautiful thorny flower is this?" }
];

// -------------------------------------------------------------
// 9. FOLKTALES / CERITA RAKYAT SEEDS
// -------------------------------------------------------------
const folktalesSeeds = [
  { story: "Malin Kundang", q: "Siapakah nama anak yang dikutuk ibunya menjadi batu?", qEn: "Who is the child cursed into stone by his mother?", c: "Malin Kundang", w: ["Sangkuriang", "Timun Mas", "Kancil"], ext: "Malin Kundang dikutuk karena durhaka kepada ibunya.", extEn: "Malin Kundang was cursed for disobeying his mother." },
  { story: "Sangkuriang", q: "Gunung apakah yang terbentuk dari perahu terbalik Sangkuriang?", qEn: "Which mountain was formed from Sangkuriang's overturned boat?", c: "Tangkuban Parahu", w: ["Merapi", "Bromo", "Semeru"], ext: "Tangkuban Parahu terbentuk dari perahu terbalik Sangkuriang.", extEn: "Tangkuban Parahu was formed from Sangkuriang's overturned boat." }
];

// -------------------------------------------------------------
// 10. TRAFFIC SIGNS / RAMBU LALU LINTAS SEEDS
// -------------------------------------------------------------
const trafficSeeds = [
  { c: "Dilarang Berhenti (Stop)", w: ["Dilarang Parkir", "Hati-hati", "Dilarang Masuk"], url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400", q: "Apakah arti rambu huruf 'S' dicoret garis merah?", qEn: "What is the meaning of a sign with letter 'S' crossed by a red line?" }
];

// -------------------------------------------------------------
// MAIN DYNAMIC GENERATOR ENGINE
// -------------------------------------------------------------
export function generateDynamicAIQuestions(gameId: string, level: number): Question[] {
  // Define progressive session question counts
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  // Define options count: Level 1 has 3 choices, Level 2-3 has 4 choices, Level 4-5 has 5 choices
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;

  if (gameId === 'math-challenge') {
    return Array.from({ length: count }, () => generateMathQuestion(level));
  }

  // 1. Subject Quiz
  if (gameId === 'quiz-mapel') {
    return Array.from({ length: count }, (_, idx) => {
      let pool = mapelSeedsL1_2;
      if (level === 3 || level === 4) pool = mapelSeedsL3_4;
      if (level === 5) pool = mapelSeedsL5;

      const seed = pool[(idx + level * 3) % pool.length];
      const { options, correctAnswer } = shuffleChoicesProgressive(
        { id: seed.c, en: seed.c },
        seed.w.map(w => ({ id: w, en: w })),
        choiceCount
      );

      return {
        id: `${gameId}-${level}-${idx}-${Date.now()}`,
        gameId,
        level,
        question: { id: seed.q, en: seed.qEn },
        options,
        correctAnswer,
        explanation: { id: seed.ext, en: seed.extEn },
        hint: { id: "Pikirkan materi kelas sekolah dasar.", en: "Recall lessons from elementary school class." }
      };
    });
  }

  // 3. Susun Kata
  if (gameId === 'susun-kata') {
    return Array.from({ length: count }, (_, idx) => {
      const pools = [vocabL1, vocabL2, vocabL3, vocabL4, vocabL5];
      const selectedPool = pools[level - 1] || vocabL5;
      const seed = selectedPool[(idx + level * 7) % selectedPool.length];

      return {
        id: `${gameId}-${level}-${idx}`,
        gameId,
        level,
        question: { id: `Kategori: ${seed.cat}. Susun hurufnya!`, en: `Category: ${seed.cat}. Rearrange the letters!` },
        correctAnswer: seed.id,
        explanation: { id: `Kata yang benar adalah ${seed.id}.`, en: `The correct word is ${seed.en}.` },
        hint: { id: `Merupakan nama ${seed.cat.toLowerCase()}.`, en: `It is the name of a ${seed.cat.toLowerCase()}.` },
        metadata: { Words: [{ id: seed.id, en: seed.en }], Answers: [seed.id, seed.en] }
      };
    });
  }

  // 4. Tebak Gambar
  if (gameId === 'tebak-gambar') {
    return Array.from({ length: Math.min(count, 5) }, (_, idx) => {
      const seed = imageSeeds[idx % imageSeeds.length];
      const { options, correctAnswer } = shuffleChoicesProgressive(
        { id: seed.c, en: seed.c },
        seed.w.map(w => ({ id: w, en: w })),
        choiceCount
      );

      return {
        id: `${gameId}-${level}-${idx}`,
        gameId,
        level,
        question: { id: seed.q, en: seed.qEn },
        options,
        correctAnswer,
        imageUrl: seed.url,
        explanation: { id: `Gambar tersebut adalah ${seed.c}.`, en: `The image is indeed ${seed.c}.` },
        hint: { id: "Perhatikan bentuk luarnya.", en: "Pay attention to its outer shape." }
      };
    });
  }

  // 8. Pilah Sampah
  if (gameId === 'pilah-sampah') {
    const itemsCount = level === 1 ? 10 : level === 2 ? 15 : level === 3 ? 20 : level === 4 ? 20 : 25;
    const itemsPool = [
      { name: { id: "Kulit Pisang", en: "Banana Peel" }, type: "ORGANIK" },
      { name: { id: "Botol Plastik", en: "Plastic Bottle" }, type: "ANORGANIK" },
      { name: { id: "Baterai Bekas", en: "Used Battery" }, type: "B3" },
      { name: { id: "Kertas Koran", en: "Newspaper" }, type: "ANORGANIK" },
      { name: { id: "Daun Kering", en: "Dry Leaves" }, type: "ORGANIK" },
      { name: { id: "Pecahan Kaca", en: "Broken Glass" }, type: "RESIDU" }
    ];

    const selectedItems = Array.from({ length: itemsCount }, (_, idx) => {
      const base = itemsPool[idx % itemsPool.length];
      if (level === 1 && (base.type === 'B3' || base.type === 'RESIDU')) {
        return { name: { id: "Daun Kering", en: "Dry Leaves" }, type: "ORGANIK" };
      }
      if (level === 2 && base.type === 'RESIDU') {
        return { name: { id: "Buku Bekas", en: "Old Book" }, type: "ANORGANIK" };
      }
      return base;
    });

    return [{
      id: `${gameId}-${level}-0`,
      gameId,
      level,
      question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
      correctAnswer: "ORGANIK",
      explanation: { id: "Memilah sampah menjaga kebersihan sekolah.", en: "Sorting waste keeps the school clean." },
      hint: { id: "Perhatikan bahan dasarnya.", en: "Observe the basic material." },
      metadata: { Items: selectedItems }
    }];
  }

  // 9. Cerita Rakyat
  if (gameId === 'cerita-rakyat') {
    return Array.from({ length: Math.min(count, 4) }, (_, idx) => {
      const seed = folktalesSeeds[idx % folktalesSeeds.length];
      const { options, correctAnswer } = shuffleChoicesProgressive(
        { id: seed.c, en: seed.c },
        seed.w.map(w => ({ id: w, en: w })),
        choiceCount
      );

      return {
        id: `${gameId}-${level}-${idx}`,
        gameId,
        level,
        question: { id: `Kisah ${seed.story}: ${seed.q}`, en: `Story of ${seed.story}: ${seed.qEn}` },
        options,
        correctAnswer,
        explanation: { id: seed.ext, en: seed.extEn },
        hint: { id: "Legenda rakyat Indonesia.", en: "Indonesian popular legend." }
      };
    });
  }

  // 10. Rambu Lalu Lintas
  if (gameId === 'rambu-lalu-lintas') {
    return Array.from({ length: Math.min(count, 3) }, (_, idx) => {
      const seed = trafficSeeds[idx % trafficSeeds.length];
      const { options, correctAnswer } = shuffleChoicesProgressive(
        { id: seed.c, en: seed.c },
        seed.w.map(w => ({ id: w, en: w })),
        choiceCount
      );

      return {
        id: `${gameId}-${level}-${idx}`,
        gameId,
        level,
        question: { id: seed.q, en: seed.qEn },
        options,
        correctAnswer,
        imageUrl: seed.url,
        explanation: { id: `Rambu tersebut berarti ${seed.c}.`, en: `The sign means ${seed.c}.` },
        hint: { id: "Perhatikan warna latar rambu.", en: "Pay attention to the background color." }
      };
    });
  }

  // 7. Puzzle Nusantara & other placeholders
  return Array.from({ length: 3 }, (_, idx) => ({
    id: `${gameId}-${level}-${idx}`,
    gameId,
    level,
    question: {
      id: `Pecahkan Tantangan Nusantara level ${level}!`,
      en: `Solve Nusantara Challenge level ${level}!`
    },
    options: {
      A: { id: "Pilihan Benar", en: "Correct Answer" },
      B: { id: "Salah 1", en: "Incorrect 1" },
      C: { id: "Salah 2", en: "Incorrect 2" },
      D: { id: "Salah 3", en: "Incorrect 3" }
    },
    correctAnswer: "A",
    explanation: { id: "Jawaban Anda benar.", en: "Your answer is correct." },
    hint: { id: "Pilihlah huruf A.", en: "Choose letter A." }
  }));
}
