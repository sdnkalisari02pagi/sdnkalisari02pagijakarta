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
    cover: "https://images.unsplash.com/photo-1576357002159-f1cc076e5945?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1596495578065-6e076baf188f?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
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
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
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

// Lists of Dynamic Question Components for AI Generation
const mapelQuizPool = [
  {
    subject: "Matematika",
    qId: "Berapakah hasil dari 25 dikali 4?",
    qEn: "What is 25 multiplied by 4?",
    options: {
      A: { id: "100", en: "100" },
      B: { id: "80", en: "80" },
      C: { id: "90", en: "90" },
      D: { id: "120", en: "120" }
    },
    correct: "A",
    expId: "25 dikali 4 sama dengan 100.",
    expEn: "25 times 4 equals 100.",
    hintId: "Coba tambahkan 25 sebanyak empat kali.",
    hintEn: "Try adding 25 four times."
  },
  {
    subject: "IPAS",
    qId: "Hewan apa yang bernapas menggunakan insang?",
    qEn: "Which animal breathes using gills?",
    options: {
      A: { id: "Lumba-lumba", en: "Dolphin" },
      B: { id: "Ikan Mas", en: "Goldfish" },
      C: { id: "Paus", en: "Whale" },
      D: { id: "Katak", en: "Frog" }
    },
    correct: "B",
    expId: "Ikan mas bernapas dengan insang di dalam air.",
    expEn: "Goldfish breathe using gills underwater.",
    hintId: "Hewan ini bukan mamalia laut.",
    hintEn: "This animal is not a marine mammal."
  },
  {
    subject: "Bahasa Indonesia",
    qId: "Manakah kata yang baku di bawah ini?",
    qEn: "Which of the following is the correct formal Indonesian word?",
    options: {
      A: { id: "Apotek", en: "Apotek" },
      B: { id: "Apotik", en: "Apotik" },
      C: { id: "Aktip", en: "Aktip" },
      D: { id: "Praktek", en: "Praktek" }
    },
    correct: "A",
    expId: "Kata baku yang benar menurut KBBI adalah Apotek.",
    expEn: "The correct standard word according to KBBI is Apotek.",
    hintId: "Gunakan vokal 'e' bukan 'i'.",
    hintEn: "Use vowel 'e' instead of 'i'."
  },
  {
    subject: "PPKn",
    qId: "Bhinneka Tunggal Ika memiliki arti...",
    qEn: "Bhinneka Tunggal Ika means...",
    options: {
      A: { id: "Berbeda-beda tetapi tetap satu jua", en: "Different but still one" },
      B: { id: "Satu nusa satu bangsa", en: "One land one nation" },
      C: { id: "Bersatu kita teguh bercerai kita runtuh", en: "United we stand divided we fall" },
      D: { id: "Keadilan bagi seluruh rakyat", en: "Justice for all people" }
    },
    correct: "A",
    expId: "Semboyan bangsa Indonesia ini berarti persatuan dalam perbedaan.",
    expEn: "This motto of the Indonesian nation means unity in diversity.",
    hintId: "Semboyan persatuan bangsa Indonesia.",
    hintEn: "Motto of Indonesian national unity."
  }
];

const scramblePool = [
  { id: "GAJAH", en: "ELEPHANT", hintId: "Hewan darat terbesar.", hintEn: "The largest land animal." },
  { id: "KUCING", en: "CAT", hintId: "Hewan peliharaan berbulu yang mengeong.", hintEn: "Furry pet that meows." },
  { id: "PISANG", en: "BANANA", hintId: "Buah kesukaan monyet, warna kuning.", hintEn: "Monkey's favorite fruit, yellow color." },
  { id: "GURU", en: "TEACHER", hintId: "Pahlawan tanpa tanda jasa di sekolah.", hintEn: "Teacher who guides you at school." },
  { id: "MEJA", en: "TABLE", hintId: "Pasangan dari kursi di ruang kelas.", hintEn: "Pair of chairs in classroom." }
];

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

const trafficPool = [
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
  },
  {
    qId: "Apakah arti rambu huruf 'P' dicoret garis merah?",
    qEn: "What is the meaning of a sign with letter 'P' crossed by a red line?",
    options: {
      A: { id: "Dilarang Parkir", en: "No Parking" },
      B: { id: "Dilarang Berhenti", en: "No Stopping" },
      C: { id: "Khusus Parkir", en: "Parking Only" },
      D: { id: "Jalan Terus", en: "Keep Going" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
    expId: "Rambu P dicoret berarti dilarang parkir.",
    expEn: "Crossed P sign means no parking.",
    hintId: "P singkatan dari Parkir.",
    hintEn: "P stands for Parking."
  }
];

// Folktale Quizzes
const ceritaPool = [
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
  },
  {
    storyTitle: "Sangkuriang",
    qId: "Gunung apakah yang terbentuk dari perahu Tangkuban Parahu yang ditendang Sangkuriang?",
    qEn: "Which mountain was formed from the Tangkuban Parahu boat kicked by Sangkuriang?",
    options: {
      A: { id: "Gunung Merapi", en: "Mount Merapi" },
      B: { id: "Tangkuban Parahu", en: "Tangkuban Parahu" },
      C: { id: "Gunung Gede", en: "Mount Gede" },
      D: { id: "Gunung Bromo", en: "Mount Bromo" }
    },
    correct: "B",
    url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400",
    expId: "Tangkuban Parahu terbentuk dari perahu terbalik yang ditendang karena marah.",
    expEn: "Tangkuban Parahu was formed from an overturned boat kicked in anger.",
    hintId: "Namanya mirip dengan perahu terbalik.",
    hintEn: "Its name is similar to an overturned boat."
  }
];

// Puzzle Nusantara Regions
const puzzleNusantaraPool = [
  {
    qId: "Manakah pulau terbesar di Indonesia yang memiliki fauna endemik Orangutan?",
    qEn: "Which largest island in Indonesia has endemic Orangutan fauna?",
    options: {
      A: { id: "Kalimantan", en: "Kalimantan" },
      B: { id: "Jawa", en: "Java" },
      C: { id: "Bali", en: "Bali" },
      D: { id: "Madura", en: "Madura" }
    },
    correct: "A",
    url: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=400",
    expId: "Pulau Kalimantan terkenal dengan hutan rimba dan habitat aseli Orangutan.",
    expEn: "Kalimantan Island is famous for its rainforests and original habitat of Orangutan.",
    hintId: "Disebut juga pulau Borneo.",
    hintEn: "Also known as Borneo island."
  }
];

// Helper to generate dynamic Math Questions
export function generateMathQuestion(level: number): Question {
  const operations = ["+", "-", "*", "/"];
  let op = "+";
  let num1 = 0;
  let num2 = 0;
  let ans = 0;

  if (level === 1) {
    op = Math.random() > 0.5 ? "+" : "-";
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
  } else if (level === 2) {
    op = operations[Math.floor(Math.random() * 3)]; // +, -, *
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  } else {
    op = operations[Math.floor(Math.random() * 4)]; // +, -, *, /
    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 12) + 2;
  }

  // Ensure division is clean integer
  if (op === "/") {
    ans = Math.floor(Math.random() * 10) + 1;
    num1 = num2 * ans;
  } else if (op === "+") {
    ans = num1 + num2;
  } else if (op === "-") {
    if (num1 < num2) {
      const temp = num1;
      num1 = num2;
      num2 = temp;
    }
    ans = num1 - num2;
  } else {
    ans = num1 * num2;
  }

  const wrong1 = ans + (Math.random() > 0.5 ? 5 : -5);
  const wrong2 = ans + (Math.random() > 0.5 ? 2 : -2);
  const wrong3 = ans * 2 - 1;

  const choices = [ans, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
  const correctLetter = ["A", "B", "C", "D"][choices.indexOf(ans)];

  return {
    id: `dynamic-math-${Date.now()}`,
    gameId: "math-challenge",
    level,
    question: {
      id: `Berapakah ${num1} ${op} ${num2}?`,
      en: `What is ${num1} ${op} ${num2}?`
    },
    options: {
      A: { id: String(choices[0]), en: String(choices[0]) },
      B: { id: String(choices[1]), en: String(choices[1]) },
      C: { id: String(choices[2]), en: String(choices[2]) },
      D: { id: String(choices[3]), en: String(choices[3]) }
    },
    correctAnswer: correctLetter,
    explanation: {
      id: `Hasil perhitungan dari ${num1} ${op} ${num2} adalah ${ans}.`,
      en: `The result of ${num1} ${op} ${num2} is ${ans}.`
    },
    hint: {
      id: `Coba hitung perlahan digit satuannya.`,
      en: `Try to calculate the units digit carefully.`
    }
  };
}

// -------------------------------------------------------------
// DYNAMIC AI GENERATOR FUNCTION (Generates unique questions dynamically)
// -------------------------------------------------------------
export function generateDynamicAIQuestions(gameId: string, level: number): Question[] {
  if (gameId === 'math-challenge') {
    return Array.from({ length: 5 }, () => generateMathQuestion(level));
  }

  // 1. Quiz Mapel Generator
  if (gameId === 'quiz-mapel') {
    return Array.from({ length: 5 }, (_, i) => {
      const base = mapelQuizPool[i % mapelQuizPool.length];
      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: {
          id: `${base.qId}`,
          en: `${base.qEn}`
        },
        options: base.options,
        correctAnswer: base.correct,
        explanation: { id: base.expId, en: base.expEn },
        hint: { id: base.hintId, en: base.hintEn }
      };
    });
  }

  // 3. Susun Kata Anagram
  if (gameId === 'susun-kata') {
    return Array.from({ length: 5 }, (_, i) => {
      const base = scramblePool[i % scramblePool.length];
      return {
        id: `${gameId}-${level}-${i}`,
        gameId,
        level,
        question: {
          id: `Susun huruf berikut agar membentuk kata yang sesuai petunjuk!`,
          en: `Rearrange the letters to form the word based on the hint!`
        },
        correctAnswer: base.id,
        explanation: {
          id: `Kata yang benar adalah GAJAH (Indonesia) atau ELEPHANT (English).`,
          en: `The correct word is GAJAH (Indonesia) or ELEPHANT (English).`
        },
        hint: { id: base.hintId, en: base.hintEn },
        metadata: { Words: [{ id: base.id, en: base.en }], Answers: [base.id, base.en] }
      };
    });
  }

  // 4. Tebak Gambar
  if (gameId === 'tebak-gambar') {
    return Array.from({ length: 2 }, (_, i) => {
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
    return [{
      id: `${gameId}-${level}-0`,
      gameId,
      level,
      question: { id: "Pilah barang ke tong sampah yang benar!", en: "Sort items into the correct bins!" },
      correctAnswer: "ORGANIK",
      explanation: { id: "Kulit pisang mudah membusuk sehingga masuk organik.", en: "Banana peel is organic because it decays." },
      hint: { id: "Pilih organik untuk sisa makanan.", en: "Choose organic for food scraps." },
      metadata: {
        Items: [
          { name: { id: "Kulit Pisang", en: "Banana Peel" }, type: "ORGANIK" },
          { name: { id: "Botol Plastik", en: "Plastic Bottle" }, type: "ANORGANIK" },
          { name: { id: "Baterai Bekas", en: "Used Battery" }, type: "B3" },
          { name: { id: "Kertas Kardus", en: "Cardboard Paper" }, type: "ANORGANIK" },
          { name: { id: "Sisa Makanan", en: "Food Leftovers" }, type: "ORGANIK" }
        ]
      }
    }];
  }

  // 9. Cerita Rakyat
  if (gameId === 'cerita-rakyat') {
    return Array.from({ length: 2 }, (_, i) => {
      const base = ceritaPool[i % ceritaPool.length];
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
    return Array.from({ length: 2 }, (_, i) => {
      const base = trafficPool[i % trafficPool.length];
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

  // 7. Puzzle Nusantara
  if (gameId === 'puzzle-indo') {
    return Array.from({ length: 1 }, (_, i) => {
      const base = puzzleNusantaraPool[i % puzzleNusantaraPool.length];
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

  // General Fallback for Memory, Word Search
  return Array.from({ length: 3 }, (_, i) => ({
    id: `${gameId}-${level}-${i}`,
    gameId,
    level,
    question: {
      id: `Tantangan Belajar ${gameId.replace('-', ' ').toUpperCase()} Level ${level}!`,
      en: `Learning Challenge ${gameId.replace('-', ' ').toUpperCase()} Level ${level}!`
    },
    options: {
      A: { id: "Pilihan Benar", en: "Correct Choice" },
      B: { id: "Pilihan Salah 1", en: "Incorrect 1" },
      C: { id: "Pilihan Salah 2", en: "Incorrect 2" },
      D: { id: "Pilihan Salah 3", en: "Incorrect 3" }
    },
    correctAnswer: "A",
    explanation: { id: "Hebat! Kamu menjawab dengan benar.", en: "Awesome! You answered correctly." },
    hint: { id: "Pilihlah opsi A.", en: "Pick option A." }
  }));
}
