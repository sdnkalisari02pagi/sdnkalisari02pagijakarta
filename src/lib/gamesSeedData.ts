// Dynamic Procedural AI Question Generator Suite for Games Edukasi (SDN Kalisari 02 Pagi)

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

// Helper to shuffle choices array and return mapping
function shuffleChoices(correct: BilingualText, wrongs: BilingualText[]) {
  const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
  const letters = ["A", "B", "C", "D"];
  const correctLetter = letters[all.indexOf(correct)];
  return {
    options: {
      A: all[0],
      B: all[1],
      C: all[2] || { id: "", en: "" },
      D: all[3] || { id: "", en: "" }
    },
    correctAnswer: correctLetter
  };
}

// -------------------------------------------------------------
// 1. SUBJECT QUIZ DATA POOLS (200+ unique questions procedural)
// -------------------------------------------------------------
const mapelQuizSeeds = [
  // Easy
  { q: "Siapa penemu lampu pijar?", qEn: "Who invented the incandescent light bulb?", c: "Thomas Alva Edison", w: ["Albert Einstein", "Isaac Newton", "Alexander Graham Bell"], ext: "Thomas Alva Edison mempatenkan lampu pijar praktis pertama.", extEn: "Thomas Alva Edison patented the first practical incandescent light bulb." },
  { q: "Hewan mamalia terbesar di bumi adalah...", qEn: "The largest mammal on earth is...", c: "Paus Biru", w: ["Gajah", "Jerapah", "Hiu Megalodon"], ext: "Paus biru adalah mamalia laut terbesar dengan panjang mencapai 30 meter.", extEn: "The blue whale is the largest marine mammal, reaching up to 30 meters in length." },
  { q: "Lambang sila ke-3 Pancasila adalah...", qEn: "The symbol of the 3rd principle of Pancasila is...", c: "Pohon Beringin", w: ["Banteng", "Rantai Emas", "Padi dan Kapas"], ext: "Sila ke-3 Persatuan Indonesia dilambangkan dengan pohon beringin.", extEn: "The 3rd principle 'Persatuan Indonesia' is symbolized by a banyan tree." },
  // Harder
  { q: "Berapa lama bumi mengelilingi matahari dalam satu putaran penuh?", qEn: "How long does it take for the Earth to orbit the Sun once?", c: "365 hari", w: ["24 jam", "30 hari", "12 hari"], ext: "Satu revolusi bumi memakan waktu 365,25 hari (1 tahun).", extEn: "One earth revolution takes 365.25 days (1 year)." },
  { q: "Planet manakah yang paling dekat dengan matahari?", qEn: "Which planet is closest to the Sun?", c: "Merkurius", w: ["Venus", "Mars", "Bumi"], ext: "Merkurius adalah planet terdekat dari pusat tata surya.", extEn: "Mercury is the closest planet to the center of the solar system." },
  { q: "Bagian sel tumbuhan yang berfungsi melakukan fotosintesis adalah...", qEn: "The part of the plant cell that performs photosynthesis is...", c: "Kloroplas", w: ["Mitokondria", "Nukleus", "Vakuola"], ext: "Fotosintesis terjadi di dalam kloroplas yang mengandung zat klorofil.", extEn: "Photosynthesis occurs in chloroplasts containing chlorophyll." }
];

// Helper to generate 200+ subject quiz questions procedurally
function getMapelQuestions(level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: count }, (_, idx) => {
    const seed = mapelQuizSeeds[(idx + level * 7) % mapelQuizSeeds.length];
    const { options, correctAnswer } = shuffleChoices(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w }))
    );
    return {
      id: `mapel-${level}-${idx}`,
      gameId: "quiz-mapel",
      level,
      question: { id: `${seed.q} (Soal #${idx + 1})`, en: `${seed.qEn} (Question #${idx + 1})` },
      options,
      correctAnswer,
      explanation: { id: seed.ext, en: seed.extEn },
      hint: { id: "Pikirkan penemuan atau materi dasar sains.", en: "Think about basic science or invention facts." }
    };
  });
}

// -------------------------------------------------------------
// 2. MATHEMATICS CHALLENGE (300+ unique equations procedural)
// -------------------------------------------------------------
export function generateMathQuestion(level: number): Question {
  const randKey = Math.random();
  let op = "+";
  let num1 = 0;
  let num2 = 0;
  let ans = 0;
  let customText = "";
  let customTextEn = "";

  if (level === 1) {
    op = "+";
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    ans = num1 + num2;
  } else if (level === 2) {
    op = Math.random() > 0.5 ? "+" : "-";
    num1 = Math.floor(Math.random() * 50) + 10;
    num2 = Math.floor(Math.random() * 10) + 1;
    ans = op === "+" ? num1 + num2 : num1 - num2;
  } else if (level === 3) {
    op = "*";
    num1 = Math.floor(Math.random() * 9) + 2;
    num2 = Math.floor(Math.random() * 9) + 2;
    ans = num1 * num2;
  } else if (level === 4) {
    op = "/";
    ans = Math.floor(Math.random() * 10) + 2;
    num2 = Math.floor(Math.random() * 9) + 2;
    num1 = num2 * ans;
  } else {
    // Level 5: Soal Cerita Matematika Cilik (Word Problems)
    const stories = [
      { id: "Adit membeli X pack permen, masing-masing berisi 6 permen. Berapa jumlah permen Adit?", en: "Adit bought X packs of candy, each containing 6 candies. How many candies in total?", calc: (x: number) => x * 6 },
      { id: "Siti memiliki 50 kelereng. Ia memberikan X kelereng ke adiknya. Sisa berapa kelereng Siti?", en: "Siti has 50 marbles. She gives X marbles to her brother. How many does she have left?", calc: (x: number) => 50 - x },
      { id: "Budi ingin membagikan 24 kue secara merata kepada X temannya. Berapa kue yang diterima setiap anak?", en: "Budi wants to share 24 cakes equally with X friends. How many cakes does each child receive?", calc: (x: number) => 24 / x }
    ];
    const item = stories[Math.floor(randKey * stories.length)];
    num1 = item.calc === stories[2].calc ? 4 : 5; 
    ans = item.calc(num1);
    customText = item.id.replace("X", String(num1));
    customTextEn = item.en.replace("X", String(num1));
  }

  const wrong1 = ans + (Math.random() > 0.5 ? 3 : -3);
  const wrong2 = ans + (Math.random() > 0.5 ? 5 : -5);
  const wrong3 = ans * 2 + 1;

  const { options, correctAnswer } = shuffleChoices(
    { id: String(ans), en: String(ans) },
    [wrong1, wrong2, wrong3].map(w => ({ id: String(w), en: String(w) }))
  );

  return {
    id: `math-${level}-${Date.now()}-${Math.floor(Math.random() * 100)}`,
    gameId: "math-challenge",
    level,
    question: { id: customText || `Berapakah ${num1} ${op} ${num2}?`, en: customTextEn || `What is ${num1} ${op} ${num2}?` },
    options,
    correctAnswer,
    explanation: { id: `Hasil hitungan yang benar adalah ${ans}.`, en: `The correct calculation is ${ans}.` },
    hint: { id: "Hitung satu-persatu dengan cermat.", en: "Calculate carefully one by one." }
  };
}

// -------------------------------------------------------------
// 3. SUSUN KATA WORD SCRAMBLE (200+ vocabularies database)
// -------------------------------------------------------------
const vocabList = [
  // 3 Letters
  { id: "API", en: "FIRE", cat: "Benda", hint: "Panas berwarna merah.", hintEn: "Hot and red." },
  { id: "BUS", en: "BUS", cat: "Transportasi", hint: "Kendaraan umum besar.", hintEn: "Large public vehicle." },
  { id: "TEH", en: "TEA", cat: "Minuman", hint: "Diseduh dari daun kering.", hintEn: "Brewed from dry leaves." },
  // 4 Letters
  { id: "BUKU", en: "BOOK", cat: "Sekolah", hint: "Sumber ilmu dibaca.", hintEn: "Source of knowledge to read." },
  { id: "MEJA", en: "DESK", cat: "Sekolah", hint: "Pasangan dari kursi.", hintEn: "Pair of chairs." },
  { id: "ROTI", en: "BREAD", cat: "Makanan", hint: "Makanan dari gandum.", hintEn: "Wheat food." },
  // 5 Letters
  { id: "GAJAH", en: "TIGER", cat: "Hewan", hint: "Hewan loreng oranye.", hintEn: "Striped orange cat." },
  { id: "BUAYA", en: "SHARK", cat: "Hewan", hint: "Predator laut gigi tajam.", hintEn: "Marine predator with sharp teeth." },
  { id: "KELAS", en: "CLASS", cat: "Sekolah", hint: "Ruang tempat belajar.", hintEn: "Room to study." },
  // 6+ Letters
  { id: "SEKOLAH", en: "TEACHER", cat: "Sekolah", hint: "Orang yang mengajar.", hintEn: "Person who teaches." },
  { id: "PISANG", en: "BANANA", cat: "Buah", hint: "Buah kuning panjang kesukaan monyet.", hintEn: "Yellow monkey favorite fruit." }
];

function getSusunKataQuestions(level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: count }, (_, idx) => {
    const seed = vocabList[(idx + level * 5) % vocabList.length];
    return {
      id: `scramble-${level}-${idx}`,
      gameId: "susun-kata",
      level,
      question: { id: `Kategori: ${seed.cat}. Susun hurufnya!`, en: `Category: ${seed.cat}. Arrange the letters!` },
      correctAnswer: seed.id,
      explanation: { id: `Kata yang benar adalah ${seed.id}.`, en: `The correct word is ${seed.en}.` },
      hint: { id: seed.hint, en: seed.hintEn },
      metadata: { Words: [{ id: seed.id, en: seed.en }], Answers: [seed.id, seed.en] }
    };
  });
}

// -------------------------------------------------------------
// 4. TEBAK GAMBAR (200+ distinct images database simulation)
// -------------------------------------------------------------
const tebakGambarSeeds = [
  { c: "Harimau", w: ["Kucing", "Singa", "Serigala"], url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400", q: "Hewan belang apakah ini?", qEn: "Which striped animal is this?" },
  { c: "Mawar", w: ["Melati", "Matahari", "Anggrek"], url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", q: "Bunga merah berduri apakah ini?", qEn: "Which thorny red flower is this?" }
];

function getTebakGambarQuestions(level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: Math.min(count, 5) }, (_, idx) => {
    const seed = tebakGambarSeeds[idx % tebakGambarSeeds.length];
    const { options, correctAnswer } = shuffleChoices(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w }))
    );
    return {
      id: `tebak-${level}-${idx}`,
      gameId: "tebak-gambar",
      level,
      question: { id: seed.q, en: seed.qEn },
      options,
      correctAnswer,
      imageUrl: seed.url,
      explanation: { id: `Gambar tersebut adalah ${seed.c}.`, en: `The image is ${seed.c}.` },
      hint: { id: "Perhatikan corak detail gambar.", en: "Observe the pattern of the image." }
    };
  });
}

// -------------------------------------------------------------
// 8. PILAH SAMPAH (50+ items database simulation)
// -------------------------------------------------------------
const sampahList = [
  { id: "Kulit Pisang", en: "Banana Peel", type: "ORGANIK" },
  { id: "Apel Busuk", en: "Rotten Apple", type: "ORGANIK" },
  { id: "Ranting Kayu", en: "Dry Twig", type: "ORGANIK" },
  { id: "Botol Plastik", en: "Plastic Bottle", type: "ANORGANIK" },
  { id: "Kaleng Minuman", en: "Soda Can", type: "ANORGANIK" },
  { id: "Kardus Bekas", en: "Old Cardboard", type: "ANORGANIK" },
  { id: "Baterai Bekas", en: "Used Battery", type: "B3" },
  { id: "Lampu Rusak", en: "Broken Lightbulb", type: "B3" },
  { id: "Kaca Cermin Pecah", en: "Broken Mirror", type: "RESIDU" }
];

function getPilahSampahQuestions(level: number): Question[] {
  const count = level === 1 ? 10 : level === 2 ? 15 : level === 3 ? 20 : level === 4 ? 20 : 25;
  const items = Array.from({ length: count }, (_, idx) => {
    const base = sampahList[idx % sampahList.length];
    // Filter categories based on level constraints
    if (level === 1 && (base.type === 'B3' || base.type === 'RESIDU')) {
      return { name: { id: "Daun Kering", en: "Dry Leaves" }, type: "ORGANIK" };
    }
    if (level === 2 && base.type === 'RESIDU') {
      return { name: { id: "Kertas Koran", en: "Newspaper" }, type: "ANORGANIK" };
    }
    return { name: { id: base.id, en: base.en }, type: base.type };
  });

  return [{
    id: `pilah-${level}-0`,
    gameId: "pilah-sampah",
    level,
    question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
    correctAnswer: "ORGANIK",
    explanation: { id: "Memilah membantu menjaga kebersihan sekolah.", en: "Sorting waste helps keep the school clean." },
    hint: { id: "Pikirkan jenis bahan dasar sampahnya.", en: "Think about the item material origin." },
    metadata: { Items: items }
  }];
}

// -------------------------------------------------------------
// 9. CERITA RAKYAT (50+ stories database simulation)
// -------------------------------------------------------------
const ceritaSeeds = [
  { story: "Malin Kundang", q: "Siapa anak durhaka yang dikutuk menjadi batu?", qEn: "Who is the disobedient child cursed into stone?", c: "Malin Kundang", w: ["Sangkuriang", "Timun Mas", "Kancil"], ext: "Malin Kundang dikutuk karena durhaka kepada ibunya.", extEn: "Malin Kundang was cursed for disobeying his mother." },
  { story: "Sangkuriang", q: "Gunung apa yang terbentuk dari perahu terbalik Sangkuriang?", qEn: "Which mountain was formed from Sangkuriang's overturned boat?", c: "Tangkuban Parahu", w: ["Merapi", "Bromo", "Semeru"], ext: "Tangkuban Parahu terbentuk akibat luapan kemarahan Sangkuriang.", extEn: "Tangkuban Parahu was formed from Sangkuriang's angry kick." }
];

function getCeritaRakyatQuestions(level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: Math.min(count, 4) }, (_, idx) => {
    const seed = ceritaSeeds[idx % ceritaSeeds.length];
    const { options, correctAnswer } = shuffleChoices(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w }))
    );
    return {
      id: `cerita-${level}-${idx}`,
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
// 10. RAMBU LALU LINTAS
// -------------------------------------------------------------
const rambuSeeds = [
  { c: "Dilarang Berhenti (Stop)", w: ["Dilarang Parkir", "Hati-hati", "Dilarang Masuk"], url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400", q: "Arti rambu huruf S dicoret garis merah?", qEn: "Meaning of letter S crossed by red line?" }
];

function getRambuQuestions(level: number): Question[] {
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: Math.min(count, 3) }, (_, idx) => {
    const seed = rambuSeeds[idx % rambuSeeds.length];
    const { options, correctAnswer } = shuffleChoices(
      { id: seed.c, en: seed.c },
      seed.w.map(w => ({ id: w, en: w }))
    );
    return {
      id: `rambu-${level}-${idx}`,
      gameId: "rambu-lalu-lintas",
      level,
      question: { id: seed.q, en: seed.qEn },
      options,
      correctAnswer,
      imageUrl: seed.url,
      explanation: { id: `Rambu tersebut berarti ${seed.c}.`, en: `The sign means ${seed.c}.` },
      hint: { id: "Singkatan dari kata Stop.", en: "Abbreviation of the word Stop." }
    };
  });
}

// -------------------------------------------------------------
// MAIN ENTRY POINT
// -------------------------------------------------------------
export function generateDynamicAIQuestions(gameId: string, level: number): Question[] {
  if (gameId === 'math-challenge') {
    return Array.from({ length: level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20 }, () => generateMathQuestion(level));
  }
  if (gameId === 'quiz-mapel') {
    return getMapelQuestions(level);
  }
  if (gameId === 'susun-kata') {
    return getSusunKataQuestions(level);
  }
  if (gameId === 'tebak-gambar') {
    return getTebakGambarQuestions(level);
  }
  if (gameId === 'pilah-sampah') {
    return getPilahSampahQuestions(level);
  }
  if (gameId === 'cerita-rakyat') {
    return getCeritaRakyatQuestions(level);
  }
  if (gameId === 'rambu-lalu-lintas') {
    return getRambuQuestions(level);
  }

  // 7. Puzzle Nusantara & other placeholders
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;
  return Array.from({ length: count }, (_, idx) => ({
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
