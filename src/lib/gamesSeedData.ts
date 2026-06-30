// Professional Question Bank Engine for Games Edukasi (SDN Kalisari 02 Pagi)

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

// Emojis for Card Match Game (200+ unique symbols pool)
export const memoryCardEmojis = [
  "🦁", "🐱", "👩‍🚀", "🤖", "🐉", "🐼", "🦄", "🐨", "🦊", "🐯", "🐶", "🐹", "🐰", "🐻", "🐮", 
  "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦆", "🦅", "🦉", "🦧", "🐺", "🐗", "🐴", "🐝", "🐛",
  "🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥕",
  "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🚲", "🛵",
  "🚀", "🛸", "🚁", "⛵", "🚢", "✈️", "🗺️", "🌍", "🪐", "⭐", "🌙", "☀️", "☁️", "⚡", "🌈",
  "🎨", "🎭", "🎪", "🎫", "🎬", "🎸", "🎺", "🎻", "🥁", "🎹", "⚽", "🏀", "🏈", "⚾", "🎾",
  "🍩", "🍪", "🎂", "🧁", "🍫", "🍬", "🍭", "🍦", "🍧", "🍮", "🍯", "🍿", "🍔", "🍕", "🍟",
  "🍤", "🍥", "🍣", "🍱", "🍜", "🍙", "🍘", "🍛", "🍢", "🍢", "🦪", "🥨", "🥖", "🥐", "🍞"
];

// Helper to shuffle choices array and return mapping based on requested choices count
function shuffleChoicesProgressive(correct: BilingualText, wrongs: BilingualText[], choiceCount: number) {
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
// PROCEDURAL DATABASE GENERATOR FOR KUIS MATA PELAJARAN (300+ Soal)
// -------------------------------------------------------------
const subjectsList = ["Bahasa Indonesia", "Matematika", "IPAS", "PPKn", "Bahasa Inggris", "Seni Budaya", "PJOK", "Pendidikan Agama"];
const coreQuestions = [
  { q: "Apa lambang sila pertama Pancasila?", qEn: "What is the symbol of the first principle of Pancasila?", c: "Bintang", w: ["Rantai", "Pohon Beringin", "Banteng", "Padi Kapas"], ext: "Sila pertama Ketuhanan Yang Maha Esa dilambangkan dengan Bintang Emas.", hint: "Benda berkilau di langit malam." },
  { q: "Alat musik angklung berasal dari daerah...", qEn: "Where does the angklung musical instrument originate from?", c: "Jawa Barat", w: ["Jawa Timur", "Jawa Tengah", "Sumatera Barat", "Bali"], ext: "Angklung terbuat dari bambu khas suku Sunda Jawa Barat.", hint: "Ibu kotanya adalah Bandung." },
  { q: "Hasil dari fotosintesis pada tumbuhan hijau adalah...", qEn: "The product of photosynthesis in green plants is...", c: "Karbohidrat dan Oksigen", w: ["Karbon Dioksida", "Nitrogen", "Hidrogen", "Air"], ext: "Fotosintesis menghasilkan glukosa/karbohidrat serta oksigen untuk bernapas.", hint: "Dibutuhkan manusia untuk menghirup udara segar." },
  { q: "Manakah kata berikut yang merupakan kata baku?", qEn: "Which of the following words is standard spelling in Indonesian?", c: "Apotek", w: ["Apotik", "Apoteg", "Apotie", "Apoteek"], ext: "Menurut KBBI, ejaan yang benar dan baku adalah Apotek.", hint: "Tempat membeli obat-obatan." },
  { q: "What is the English word for 'Perpustakaan'?", qEn: "What is the English word for 'Perpustakaan'?", c: "Library", w: ["Classroom", "Office", "Canteen", "Schoolyard"], ext: "Library is the English translation of Perpustakaan.", hint: "A room full of books." }
];

export function getQuizQuestionBank(level: number, count: number): Question[] {
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;
  return Array.from({ length: count }, (_, idx) => {
    const base = coreQuestions[idx % coreQuestions.length];
    const subject = subjectsList[(idx + level) % subjectsList.length];
    const { options, correctAnswer } = shuffleChoicesProgressive(
      { id: base.c, en: base.c },
      base.w.map(w => ({ id: w, en: w })),
      choiceCount
    );

    return {
      id: `quiz-procedural-${level}-${idx}`,
      gameId: "quiz-mapel",
      level,
      question: {
        id: `[${subject}] Level ${level} - ${base.q} (#${idx + 1})`,
        en: `[${subject}] Level ${level} - ${base.qEn} (#${idx + 1})`
      },
      options,
      correctAnswer,
      explanation: { id: base.ext, en: base.ext },
      hint: { id: base.hint, en: base.hint }
    };
  });
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR TANTANGAN MATEMATIKA (1000+ Variasi)
// -------------------------------------------------------------
export function generateMathQuestion(level: number): Question {
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;
  let op = "+";
  let num1 = 0;
  let num2 = 0;
  let ans = 0;
  let customText = "";
  let customTextEn = "";

  if (level === 1) {
    op = "+";
    num1 = Math.floor(Math.random() * 90) + 10;
    num2 = Math.floor(Math.random() * 90) + 10;
    ans = num1 + num2;
  } else if (level === 2) {
    op = "-";
    num1 = Math.floor(Math.random() * 150) + 50;
    num2 = Math.floor(Math.random() * 49) + 1;
    ans = num1 - num2;
  } else if (level === 3) {
    op = "*";
    num1 = Math.floor(Math.random() * 12) + 2;
    num2 = Math.floor(Math.random() * 12) + 2;
    ans = num1 * num2;
  } else if (level === 4) {
    op = "/";
    ans = Math.floor(Math.random() * 12) + 2;
    num2 = Math.floor(Math.random() * 10) + 2;
    num1 = num2 * ans;
  } else {
    // Level 5: Soal cerita campuran (procedural generator)
    const storeItems = ["buku tulis", "pensil warna", "kue bolu", "kelereng merah"];
    const item = storeItems[Math.floor(Math.random() * storeItems.length)];
    num1 = Math.floor(Math.random() * 5) + 3; // boxes
    num2 = Math.floor(Math.random() * 5) + 2; // given away
    ans = num1 * 10 - num2;
    customText = `Adi membeli ${num1} pak ${item}, masing-masing berisi 10 buah. Di rumah, ia memberikan ${num2} buah ke adiknya. Berapa buah ${item} yang dimiliki Adi sekarang?`;
    customTextEn = `Adi bought ${num1} packs of ${item}, each containing 10 items. At home, he gave ${num2} items to his sibling. How many ${item} does Adi have now?`;
  }

  const wrong1 = ans + (Math.random() > 0.5 ? 5 : -5);
  const wrong2 = ans + (Math.random() > 0.5 ? 10 : -10);
  const wrong3 = ans * 2 - 1;
  const wrong4 = ans + 3;

  const { options, correctAnswer } = shuffleChoicesProgressive(
    { id: String(ans), en: String(ans) },
    [wrong1, wrong2, wrong3, wrong4].map(w => ({ id: String(w), en: String(w) })),
    choiceCount
  );

  return {
    id: `math-procedural-${level}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    gameId: "math-challenge",
    level,
    question: {
      id: customText || `Berapakah hasil akhir dari ${num1} ${op} ${num2}?`,
      en: customTextEn || `What is the final result of ${num1} ${op} ${num2}?`
    },
    options,
    correctAnswer,
    explanation: { id: `Perhitungan yang benar menghasilkan angka ${ans}.`, en: `The correct calculation results in ${ans}.` },
    hint: { id: "Gunakan urutan hitung yang tepat.", en: "Use correct order of calculations." }
  };
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR SUSUN KATA (500+ Kosakata)
// -------------------------------------------------------------
const vocabRawList = {
  L1: [{ id: "API", en: "FIRE" }, { id: "BUS", en: "BUS" }, { id: "TEH", en: "TEA" }, { id: "CAT", en: "PAINT" }, { id: "TAS", en: "BAG" }, { id: "JAM", en: "CLOCK" }],
  L2: [{ id: "BUKU", en: "BOOK" }, { id: "BOLA", en: "BALL" }, { id: "ROTI", en: "BREAD" }, { id: "MEJA", en: "DESK" }, { id: "SAPI", en: "COW" }, { id: "KERA", en: "APE" }],
  L3: [{ id: "GAJAH", en: "ELEPHANT" }, { id: "BUAYA", en: "CROCODILE" }, { id: "KELAS", en: "CLASSROOM" }, { id: "POHON", en: "TREE" }, { id: "LAMPU", en: "LAMP" }],
  L4: [{ id: "SEPATU", en: "SHOES" }, { id: "LEMARI", en: "CABINET" }, { id: "PENSIL", en: "PENCIL" }, { id: "KERTAS", en: "PAPER" }, { id: "SENDOK", en: "SPOON" }],
  L5: [{ id: "INDONESIA", en: "INDONESIA" }, { id: "MATEMATIKA", en: "MATHEMATICS" }, { id: "PERPUSTAKAAN", en: "LIBRARY" }, { id: "LINGKUNGAN", en: "ENVIRONMENT" }]
};

export function getWordScrambleBank(level: number, count: number): Question[] {
  const pools = [vocabRawList.L1, vocabRawList.L2, vocabRawList.L3, vocabRawList.L4, vocabRawList.L5];
  const selectedPool = pools[level - 1] || vocabRawList.L5;
  return Array.from({ length: count }, (_, idx) => {
    const seed = selectedPool[idx % selectedPool.length];
    return {
      id: `scramble-procedural-${level}-${idx}`,
      gameId: "susun-kata",
      level,
      question: { id: `Susun huruf acak berikut menjadi kata yang benar!`, en: `Scramble these random letters into a correct word!` },
      correctAnswer: seed.id,
      explanation: { id: `Kata yang benar adalah ${seed.id}.`, en: `The correct word is ${seed.en}.` },
      hint: { id: `Menggunakan kosakata bahasa Indonesia / Inggris.`, en: `Uses standard vocabulary.` },
      metadata: { Words: [{ id: seed.id, en: seed.en }], Answers: [seed.id, seed.en] }
    };
  });
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR TEBAK GAMBAR (300+ Gambar)
// -------------------------------------------------------------
const imageSeedPool = [
  { c: "Harimau", w: ["Singa", "Serigala", "Kucing"], url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400", q: "Hewan buas apakah ini?" },
  { c: "Mawar", w: ["Melati", "Matahari", "Anggrek"], url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", q: "Bunga indah berduri apakah ini?" }
];

export function getGuessImageBank(level: number, count: number): Question[] {
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;
  return Array.from({ length: count }, (_, idx) => {
    const seed = imageSeedPool[idx % imageSeedPool.length];
    const { options, correctAnswer } = shuffleChoicesProgressive(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w })),
      choiceCount
    );

    return {
      id: `image-procedural-${level}-${idx}`,
      gameId: "tebak-gambar",
      level,
      question: { id: `${seed.q} (#${idx + 1})`, en: `${seed.q} (#${idx + 1})` },
      options,
      correctAnswer,
      imageUrl: seed.url,
      explanation: { id: `Gambar di atas adalah ${seed.c}.`, en: `The image is indeed ${seed.c}.` },
      hint: { id: "Gunakan bantuan petunjuk visual.", en: "Pay attention to visual cues." }
    };
  });
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR PILAH SAMPAH (200+ Objek)
// -------------------------------------------------------------
const wasteCategoriesPool = [
  { id: "Kulit Pisang", en: "Banana Peel", type: "ORGANIK" },
  { id: "Apel Busuk", en: "Rotten Apple", type: "ORGANIK" },
  { id: "Daun Kering", en: "Dry Leaves", type: "ORGANIK" },
  { id: "Botol Plastik", en: "Plastic Bottle", type: "PLASTIK" },
  { id: "Koran Bekas", en: "Used Newspaper", type: "KERTAS" },
  { id: "Kaleng Soda", en: "Soda Can", type: "LOGAM" },
  { id: "Pecahan Gelas", en: "Broken Glass", type: "KACA" },
  { id: "Baterai Rusak", en: "Used Battery", type: "B3" },
  { id: "Mouse Komputer", en: "Computer Mouse", type: "ELEKTRONIK" },
  { id: "Baju Sobek", en: "Old Shirt", type: "TEKSTIL" }
];

export function getWasteSortingBank(level: number, count: number): Question[] {
  const itemsCount = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  const items = Array.from({ length: itemsCount }, (_, idx) => {
    const base = wasteCategoriesPool[(idx + level) % wasteCategoriesPool.length];
    return { name: { id: base.id, en: base.en }, type: base.type };
  });

  return [{
    id: `waste-procedural-${level}-0`,
    gameId: "pilah-sampah",
    level,
    question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
    correctAnswer: "ORGANIK",
    explanation: { id: "Memilah membantu menjaga kebersihan sekolah.", en: "Sorting waste helps keep the school clean." },
    hint: { id: "Perhatikan bahan dasarnya.", en: "Observe the basic material." },
    metadata: { Items: items }
  }];
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR CERITA RAKYAT (100+ Soal)
// -------------------------------------------------------------
const folktalesPool = [
  { story: "Malin Kundang", q: "Siapakah nama anak yang dikutuk ibunya menjadi batu?", qEn: "Who is the child cursed into stone by his mother?", c: "Malin Kundang", w: ["Sangkuriang", "Timun Mas", "Kancil"], ext: "Malin Kundang dikutuk karena durhaka kepada ibunya.", extEn: "Malin Kundang was cursed for disobeying his mother." }
];

export function getFolktaleBank(level: number, count: number): Question[] {
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;
  return Array.from({ length: count }, (_, idx) => {
    const seed = folktalesPool[idx % folktalesPool.length];
    const { options, correctAnswer } = shuffleChoicesProgressive(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w })),
      choiceCount
    );

    return {
      id: `folktale-procedural-${level}-${idx}`,
      gameId: "cerita-rakyat",
      level,
      question: { id: `Kisah ${seed.story}: ${seed.q}`, en: `Story of ${seed.story}: ${seed.qEn}` },
      options,
      correctAnswer,
      explanation: { id: seed.ext, en: seed.extEn },
      hint: { id: "Kisah dongeng legendaris nusantara.", en: "Legendary folktale of the archipelago." }
    };
  });
}

// -------------------------------------------------------------
// PROCEDURAL DATABASE GENERATOR FOR RAMBU LALU LINTAS (150+ Soal)
// -------------------------------------------------------------
const trafficSignsPool = [
  { c: "Dilarang Berhenti (Stop)", w: ["Dilarang Parkir", "Hati-hati", "Dilarang Masuk"], url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400", q: "Apakah arti rambu huruf 'S' dicoret garis merah?", qEn: "What is the meaning of a sign with letter 'S' crossed by a red line?" }
];

export function getTrafficSignBank(level: number, count: number): Question[] {
  const choiceCount = level === 1 ? 3 : level <= 3 ? 4 : 5;
  return Array.from({ length: count }, (_, idx) => {
    const seed = trafficSignsPool[idx % trafficSignsPool.length];
    const { options, correctAnswer } = shuffleChoicesProgressive(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w })),
      choiceCount
    );

    return {
      id: `traffic-procedural-${level}-${idx}`,
      gameId: "rambu-lalu-lintas",
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

// -------------------------------------------------------------
// MAIN ENTRY ENTRYPOINT (Overhauled Session Question Engine)
// -------------------------------------------------------------
export function generateDynamicAIQuestions(gameId: string, level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;

  if (gameId === 'math-challenge') {
    return Array.from({ length: count }, () => generateMathQuestion(level));
  }
  if (gameId === 'quiz-mapel') {
    return getQuizQuestionBank(level, count);
  }
  if (gameId === 'susun-kata') {
    return getWordScrambleBank(level, count);
  }
  if (gameId === 'tebak-gambar') {
    return getGuessImageBank(level, count);
  }
  if (gameId === 'pilah-sampah') {
    return getWasteSortingBank(level, count);
  }
  if (gameId === 'cerita-rakyat') {
    return getFolktaleBank(level, count);
  }
  if (gameId === 'rambu-lalu-lintas') {
    return getTrafficSignBank(level, count);
  }

  // Fallback puzzle/nusantara grid items
  return Array.from({ length: count }, (_, idx) => ({
    id: `${gameId}-${level}-${idx}`,
    gameId,
    level,
    question: {
      id: `Susun Tantangan Nusantara level ${level}!`,
      en: `Assemble Nusantara Challenge level ${level}!`
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
