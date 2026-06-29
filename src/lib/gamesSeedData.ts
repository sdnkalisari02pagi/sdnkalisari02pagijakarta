// Dynamic AI Question Generator Suite for Games Edukasi (SDN Kalisari 02 Pagi)

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

// -------------------------------------------------------------
// QUESTION POOLS
// -------------------------------------------------------------

const mapelQuizPoolEasy = [
  {
    qId: "Siapakah presiden pertama Republik Indonesia?",
    qEn: "Who is the first president of the Republic of Indonesia?",
    options: {
      A: { id: "Ir. Soekarno", en: "Ir. Soekarno" },
      B: { id: "Moh. Hatta", en: "Moh. Hatta" },
      C: { id: "Soeharto", en: "Soeharto" },
      D: { id: "B.J. Habibie", en: "B.J. Habibie" }
    },
    correct: "A",
    expId: "Ir. Soekarno memproklamasikan kemerdekaan Indonesia dan terpilih menjadi presiden pertama.",
    expEn: "Ir. Soekarno proclaimed Indonesian independence and was elected the first president.",
    hintId: "Beliau dijuluki Bung Karno.",
    hintEn: "He was nicknamed Bung Karno."
  },
  {
    qId: "Hewan apa yang hidup di air dan bernapas dengan insang?",
    qEn: "Which animal lives in water and breathes with gills?",
    options: {
      A: { id: "Lumba-lumba", en: "Dolphin" },
      B: { id: "Ikan Mas", en: "Goldfish" },
      C: { id: "Paus", en: "Whale" },
      D: { id: "Katak", en: "Frog" }
    },
    correct: "B",
    expId: "Ikan mas bernapas menggunakan insang di dalam air.",
    expEn: "Goldfish breathe using gills underwater.",
    hintId: "Hewan ini bukan mamalia laut.",
    hintEn: "This animal is not a marine mammal."
  }
];

const mapelQuizPoolHard = [
  {
    qId: "Negara manakah yang berbatasan darat langsung dengan Indonesia di Pulau Kalimantan?",
    qEn: "Which country shares a land border with Indonesia on Kalimantan Island?",
    options: {
      A: { id: "Malaysia", en: "Malaysia" },
      B: { id: "Singapura", en: "Singapore" },
      C: { id: "Brunei Darussalam", en: "Brunei Darussalam" },
      D: { id: "Timor Leste", en: "East Timor" }
    },
    correct: "A",
    expId: "Indonesia berbatasan darat langsung dengan Malaysia di Kalimantan Utara dan Barat.",
    expEn: "Indonesia shares a direct land border with Malaysia in North and West Kalimantan.",
    hintId: "Ibu kotanya Kuala Lumpur.",
    hintEn: "Its capital is Kuala Lumpur."
  },
  {
    qId: "Zat hijau daun yang berperan penting dalam proses fotosintesis tumbuhan disebut...",
    qEn: "The green pigment in leaves that plays a vital role in plant photosynthesis is called...",
    options: {
      A: { id: "Klorofil", en: "Chlorophyll" },
      B: { id: "Kloroplas", en: "Chloroplast" },
      C: { id: "Stomata", en: "Stomata" },
      D: { id: "Floem", en: "Phloem" }
    },
    correct: "A",
    expId: "Klorofil berfungsi menangkap cahaya matahari untuk fotosintesis.",
    expEn: "Chlorophyll absorbs sunlight to drive photosynthesis.",
    hintId: "Kata ini berawalan huruf K.",
    hintEn: "This word starts with letter C."
  }
];

// Anagram Pools grouped by word length
const scramble3L = [{ id: "API", en: "FIRE", hintId: "Panas dan bercahaya merah.", hintEn: "Hot and glows red." }];
const scramble4L = [{ id: "BUKU", en: "BOOK", hintId: "Dibaca siswa di perpustakaan.", hintEn: "Read by students in library." }];
const scramble5L = [{ id: "GAJAH", en: "TIGER", hintId: "Kucing besar belang loreng.", hintEn: "Big striped orange cat." }];
const scramble6_7L = [{ id: "SEKOLAH", en: "TEACHER", hintId: "Mengajar anak-anak di kelas.", hintEn: "Teaches children in class." }];
const scrambleLong = [{ id: "MATEMATIKA", en: "INDONESIA", hintId: "Negara kita tercinta dengan ribuan pulau.", hintEn: "Our beloved country with thousands of islands." }];

// Tebak Gambar Pool
const imageGuessPool = [
  {
    id: "tiger",
    qId: "Hewan buas apakah pada gambar ini?",
    qEn: "Which wild animal is in this image?",
    options: {
      A: { id: "Harimau", en: "Tiger" },
      B: { id: "Kucing", en: "Cat" },
      C: { id: "Singa", en: "Lion" },
      D: { id: "Serigala", en: "Wolf" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400",
    expId: "Gambar tersebut adalah harimau dengan belang hitam khas.",
    expEn: "The image is a tiger with typical black stripes.",
    hintId: "Memiliki belang oranye hitam.",
    hintEn: "It has orange black stripes."
  },
  {
    id: "rose",
    qId: "Bunga indah berduri apakah ini?",
    qEn: "Which beautiful thorny flower is this?",
    options: {
      A: { id: "Mawar", en: "Rose" },
      B: { id: "Melati", en: "Jasmine" },
      C: { id: "Matahari", en: "Sunflower" },
      D: { id: "Anggrek", en: "Orchid" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
    expId: "Bunga mawar terkenal karena keindahan merahnya dan duri pelindungnya.",
    expEn: "Rose is famous for its red beauty and defensive thorns.",
    hintId: "Identik dengan warna merah romantis.",
    hintEn: "Identical with romantic red color."
  }
];

// Rambu Lalu Lintas Pool
const trafficPoolBasic = [
  {
    qId: "Apakah arti rambu huruf 'S' dicoret garis merah?",
    qEn: "What is the meaning of a sign with letter 'S' crossed by a red line?",
    options: {
      A: { id: "Dilarang Berhenti (Stop)", en: "No Stopping (Stop)" },
      B: { id: "Dilarang Parkir", en: "No Parking" },
      C: { id: "Hati-hati", en: "Be Careful" },
      D: { id: "Dilarang Masuk", en: "No Entry" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400",
    expId: "Rambu S dicoret berarti dilarang berhenti.",
    expEn: "Crossed S sign means no stopping.",
    hintId: "S singkatan dari Stop.",
    hintEn: "S stands for Stop."
  }
];

const trafficPoolAdvanced = [
  {
    qId: "Menghadapi persimpangan jalan dengan lampu kuning berkedip-kedip, apa yang harus Anda lakukan?",
    qEn: "Approaching an intersection with flashing yellow light, what should you do?",
    options: {
      A: { id: "Berhenti total dan menunggu hijau", en: "Stop completely and wait for green" },
      B: { id: "Berjalan terus dengan kecepatan maksimal", en: "Keep going at maximum speed" },
      C: { id: "Mengurangi kecepatan dan berhati-hati", en: "Slow down and proceed with caution" },
      D: { id: "Memutar balik kendaraan", en: "Turn around the vehicle" }
    },
    correct: "C",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
    expId: "Lampu kuning berkedip-kedip adalah peringatan hati-hati di persimpangan jalan.",
    expEn: "Flashing yellow light warns drivers to proceed with caution at intersections.",
    hintId: "Merupakan peringatan hati-hati.",
    hintEn: "It is a caution signal."
  }
];

// Cerita Rakyat Pool
const ceritaPoolEasy = [
  {
    storyTitle: "Malin Kundang",
    qId: "Siapakah nama anak durhaka yang dikutuk ibunya menjadi batu?",
    qEn: "Who is the disobedient child cursed into stone by his mother?",
    options: {
      A: { id: "Malin Kundang", en: "Malin Kundang" },
      B: { id: "Sangkuriang", en: "Sangkuriang" },
      C: { id: "Kancil", en: "Deer" },
      D: { id: "Timun Mas", en: "Timun Mas" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400",
    expId: "Malin Kundang dikutuk menjadi batu karena menolak mengakui ibu kandungnya.",
    expEn: "Malin Kundang was cursed into stone for refusing to acknowledge his birth mother.",
    hintId: "Namanya berawalan huruf M.",
    hintEn: "His name starts with letter M."
  }
];

const ceritaPoolHard = [
  {
    storyTitle: "Sangkuriang",
    qId: "Mengapa Dayang Sumbi menggagalkan pembangunan bendungan Sangkuriang dengan membunyikan alu?",
    qEn: "Why did Dayang Sumbi sabotage Sangkuriang's dam building by striking rice pestles?",
    options: {
      A: { id: "Karena dia menyadari Sangkuriang adalah anaknya", en: "Because she realized Sangkuriang was her son" },
      B: { id: "Karena dia membenci Sangkuriang", en: "Because she hated Sangkuriang" },
      C: { id: "Karena ingin ayam berkokok lebih awal", en: "To make the roosters crow early" },
      D: { id: "Karena waktu perjanjian telah habis", en: "Because the time agreement expired" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400",
    expId: "Dayang Sumbi menggagalkan Sangkuriang karena tahu Sangkuriang adalah anak kandungnya sendiri.",
    expEn: "Dayang Sumbi stopped Sangkuriang because she discovered he was her long-lost son.",
    hintId: "Untuk mencegah pernikahan sedarah.",
    hintEn: "To prevent incestuous marriage."
  }
];

// -------------------------------------------------------------
// DYNAMIC MATHEMATICS QUESTION GENERATOR
// -------------------------------------------------------------
export function generateMathQuestion(level: number): Question {
  let op = "+";
  let num1 = 0;
  let num2 = 0;
  let ans = 0;
  let customQuestionText = "";
  let customQuestionTextEn = "";

  if (level === 1) {
    // Level 1: Addition only (very simple numbers 1-10)
    op = "+";
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    ans = num1 + num2;
  } else if (level === 2) {
    // Level 2: Addition and subtraction (1-30)
    op = Math.random() > 0.5 ? "+" : "-";
    num1 = Math.floor(Math.random() * 20) + 10;
    num2 = Math.floor(Math.random() * 9) + 1;
    if (op === "-") {
      ans = num1 - num2;
    } else {
      ans = num1 + num2;
    }
  } else if (level === 3) {
    // Level 3: Multiplication start
    op = "*";
    num1 = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 2;
    ans = num1 * num2;
  } else if (level === 4) {
    // Level 4: Division and mixed operations
    op = "/";
    ans = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 2;
    num1 = num2 * ans;
  } else {
    // Level 5: Word Problems / Soal Cerita
    const templates = [
      {
        id: "Rani mempunyai 5 kotak pensil. Setiap kotak berisi X pensil. Berapa total pensil Rani?",
        en: "Rani has 5 pencil boxes. Each box contains X pencils. How many pencils does she have in total?",
        op: "*", val: 6, calc: (x: number) => 5 * x,
        hintId: "Kalikan jumlah kotak dengan isi pensil.", hintEn: "Multiply boxes by pencil count."
      },
      {
        id: "Ibu membeli 30 mangga. Ibu membagikannya kepada X anaknya secara rata. Berapa mangga yang diterima setiap anak?",
        en: "Mother bought 30 mangoes. She distributed them equally to her X children. How many does each child get?",
        op: "/", val: 5, calc: (x: number) => 30 / x,
        hintId: "Bagi total mangga dengan jumlah anak.", hintEn: "Divide total mangoes by child count."
      }
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    num1 = template.val;
    ans = template.calc(num1);
    customQuestionText = template.id.replace("X", String(num1));
    customQuestionTextEn = template.en.replace("X", String(num1));
  }

  const wrong1 = ans + (Math.random() > 0.5 ? 5 : -5);
  const wrong2 = ans + (Math.random() > 0.5 ? 2 : -2);
  const wrong3 = ans * 2 - 1;

  const choices = [ans, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
  const correctLetter = ["A", "B", "C", "D"][choices.indexOf(ans)];

  return {
    id: `math-${level}-${Date.now()}`,
    gameId: "math-challenge",
    level,
    question: {
      id: customQuestionText || `Berapakah hasil dari ${num1} ${op} ${num2}?`,
      en: customQuestionTextEn || `What is the result of ${num1} ${op} ${num2}?`
    },
    options: {
      A: { id: String(choices[0]), en: String(choices[0]) },
      B: { id: String(choices[1]), en: String(choices[1]) },
      C: { id: String(choices[2]), en: String(choices[2]) },
      D: { id: String(choices[3]), en: String(choices[3]) }
    },
    correctAnswer: correctLetter,
    explanation: {
      id: `Hasil perhitungan yang benar adalah ${ans}.`,
      en: `The correct calculation result is ${ans}.`
    },
    hint: {
      id: level === 5 ? "Gunakan hitungan perkalian/pembagian." : `Coba hitung perlahan digit satuannya.`,
      en: level === 5 ? "Use multiplication or division calculation." : `Try to calculate the units digit carefully.`
    }
  };
}

// -------------------------------------------------------------
// DYNAMIC AI GENERATOR FUNCTION (Generates unique questions dynamically)
// -------------------------------------------------------------
export function generateDynamicAIQuestions(gameId: string, level: number): Question[] {
  // Respecting levels question counts
  const count = level === 1 ? 5 : level === 2 ? 8 : level === 3 ? 10 : level === 4 ? 15 : 20;

  if (gameId === 'math-challenge') {
    return Array.from({ length: count }, () => generateMathQuestion(level));
  }

  // 1. Quiz Mapel Generator
  if (gameId === 'quiz-mapel') {
    return Array.from({ length: count }, (_, i) => {
      // Level 1-2 uses easy pool, Level 3-5 uses hard pool
      const base = level <= 2 
        ? mapelQuizPoolEasy[i % mapelQuizPoolEasy.length] 
        : mapelQuizPoolHard[i % mapelQuizPoolHard.length];

      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: { id: base.qId, en: base.qEn },
        options: base.options,
        correctAnswer: base.correct,
        explanation: { id: base.expId, en: base.expEn },
        hint: { id: base.hintId, en: base.hintEn }
      };
    });
  }

  // 3. Susun Kata Anagram
  if (gameId === 'susun-kata') {
    return Array.from({ length: count }, (_, i) => {
      // Pick word pool according to level length rules
      const pools = [scramble3L, scramble4L, scramble5L, scramble6_7L, scrambleLong];
      const selectedPool = pools[level - 1] || scrambleLong;
      const base = selectedPool[i % selectedPool.length];

      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: {
          id: `Susun huruf acak berikut agar membentuk kata yang benar!`,
          en: `Rearrange the scrambled letters to build the correct word!`
        },
        correctAnswer: base.id,
        explanation: {
          id: `Kata yang benar adalah ${base.id}.`,
          en: `The correct word is ${base.en}.`
        },
        hint: { id: base.hintId, en: base.hintEn },
        metadata: { Words: [{ id: base.id, en: base.en }], Answers: [base.id, base.en] }
      };
    });
  }

  // 4. Tebak Gambar
  if (gameId === 'tebak-gambar') {
    return Array.from({ length: Math.min(count, 3) }, (_, i) => {
      const base = imageGuessPool[i % imageGuessPool.length];
      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: { id: base.qId, en: base.qEn },
        options: base.options,
        correctAnswer: base.correct,
        imageUrl: base.url,
        explanation: { id: base.expId, en: base.expEn },
        hint: { id: base.hintId, en: base.hintEn }
      };
    });
  }

  // 8. Pilah Sampah
  if (gameId === 'pilah-sampah') {
    // Return items length based on level
    const itemsCount = level === 1 ? 10 : level === 2 ? 15 : level === 3 ? 20 : level === 4 ? 20 : 25;
    const itemsPool = [
      { name: { id: "Kulit Pisang", en: "Banana Peel" }, type: "ORGANIK" },
      { name: { id: "Botol Plastik", en: "Plastic Bottle" }, type: "ANORGANIK" },
      { name: { id: "Baterai Bekas", en: "Used Battery" }, type: "B3" },
      { name: { id: "Kertas Kardus", en: "Cardboard Paper" }, type: "ANORGANIK" },
      { name: { id: "Sisa Makanan", en: "Food Leftovers" }, type: "ORGANIK" },
      { name: { id: "Kaca Pecah", en: "Broken Glass" }, type: "RESIDU" }
    ];

    const selectedItems = Array.from({ length: itemsCount }, (_, idx) => {
      const base = itemsPool[idx % itemsPool.length];
      // Filter out residu or B3 if level is too low
      if (level === 1 && (base.type === 'B3' || base.type === 'RESIDU')) {
        return { name: { id: "Daun Kering", en: "Dry Leaves" }, type: "ORGANIK" };
      }
      if (level === 2 && base.type === 'RESIDU') {
        return { name: { id: "Kertas Bekas", en: "Used Paper" }, type: "ANORGANIK" };
      }
      return base;
    });

    return [{
      id: `${gameId}-${level}-0`,
      gameId,
      level,
      question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
      correctAnswer: "ORGANIK",
      explanation: { id: "Pilah dengan cermat demi kebersihan lingkungan.", en: "Sort carefully for a cleaner environment." },
      hint: { id: "Perhatikan bahan dasar barang.", en: "Observe the material composition." },
      metadata: { Items: selectedItems }
    }];
  }

  // 9. Cerita Rakyat
  if (gameId === 'cerita-rakyat') {
    return Array.from({ length: Math.min(count, 3) }, (_, i) => {
      const base = level <= 2 ? ceritaPoolEasy[i % ceritaPoolEasy.length] : ceritaPoolHard[i % ceritaPoolHard.length];
      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: { id: base.qId, en: base.qEn },
        options: base.options,
        correctAnswer: base.correct,
        imageUrl: base.url,
        explanation: { id: base.expId, en: base.expEn },
        hint: { id: base.hintId, en: base.hintEn }
      };
    });
  }

  // 10. Rambu Lalu Lintas
  if (gameId === 'rambu-lalu-lintas') {
    return Array.from({ length: Math.min(count, 3) }, (_, i) => {
      const base = level <= 2 ? trafficPoolBasic[i % trafficPoolBasic.length] : trafficPoolAdvanced[i % trafficPoolAdvanced.length];
      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: { id: base.qId, en: base.qEn },
        options: base.options,
        correctAnswer: base.correct,
        imageUrl: base.url,
        explanation: { id: base.expId, en: base.expEn },
        hint: { id: base.hintId, en: base.hintEn }
      };
    });
  }

  // 7. Puzzle Nusantara & other placeholders
  return Array.from({ length: 3 }, (_, i) => ({
    id: `${gameId}-${level}-${i}`,
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
