// Seed data and generator logic for Games Edukasi (SDN Kalisari 02 Pagi)

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
  metadata?: any; // Untuk data custom seperti kata acak, koordinat, jenis sampah, dll.
}

export const gamesList = [
  {
    id: "quiz-mapel",
    slug: "quiz-mapel",
    title: { id: "Kuis Mata Pelajaran", en: "Subject Quiz" },
    description: { id: "Kuis pilihan ganda seru untuk menguji pengetahuan berbagai mata pelajaran sekolah.", en: "Fun multiple choice quiz to test knowledge of various school subjects." },
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
  { code: "green-hero", name: { id: "Pahlawan Hijau", en: "Green Hero" }, desc: { id: "Dapatkan skor sempurna di game Pilah Sampah", en: "Get perfect score in Waste Sorting game" }, icon: "🌱" },
  { code: "indonesia-expert", name: { id: "Ahli Nusantara", en: "Nusantara Expert" }, desc: { id: "Selesaikan puzzle seluruh pulau di Indonesia", en: "Assemble all island puzzles in Indonesia" }, icon: "🇮🇩" },
  { code: "safety-hero", name: { id: "Pelopor Keselamatan", en: "Safety Pioneer" }, desc: { id: "Selesaikan semua rambu keselamatan jalan", en: "Complete all road safety signs" }, icon: "🚦" },
  { code: "perfect-score", name: { id: "Skor Sempurna", en: "Perfect Score" }, desc: { id: "Jawab semua soal dengan benar dalam satu kuis", en: "Answer all questions correctly in one quiz session" }, icon: "⭐" },
  { code: "weekly-king", name: { id: "Raja Mingguan", en: "Weekly King" }, desc: { id: "Masuk 3 besar di Papan Skor Mingguan", en: "Enter top 3 in Weekly Leaderboard" }, icon: "👑" },
  { code: "level-5-master", name: { id: "Master Level 5", en: "Level 5 Master" }, desc: { id: "Selesaikan game apa saja hingga Level 5", en: "Complete any game up to Level 5" }, icon: "🔥" }
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

export const questionsData: Question[] = [
  // Quiz Mapel - Matematika Level 1
  {
    id: "q-mapel-1",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Berapakah hasil dari 15 + 27?", en: "What is 15 + 27?" },
    options: {
      A: { id: "32", en: "32" },
      B: { id: "42", en: "42" },
      C: { id: "38", en: "38" },
      D: { id: "45", en: "45" }
    },
    correctAnswer: "B",
    explanation: { id: "15 ditambah 27 adalah 42.", en: "15 plus 27 is 42." },
    hint: { id: "Gunakan penjumlahan satuan terlebih dahulu (5 + 7 = 12)", en: "Use unit addition first (5 + 7 = 12)" }
  },
  {
    id: "q-mapel-2",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Manakah yang merupakan lambang sila pertama Pancasila?", en: "Which one is the symbol of the first principle of Pancasila?" },
    options: {
      A: { id: "Rantai", en: "Chain" },
      B: { id: "Pohon Beringin", en: "Banyan Tree" },
      C: { id: "Bintang", en: "Star" },
      D: { id: "Padi dan Kapas", en: "Rice and Cotton" }
    },
    correctAnswer: "C",
    explanation: { id: "Sila pertama dilambangkan dengan Bintang Emas.", en: "The first principle is symbolized by the Gold Star." },
    hint: { id: "Sesuatu yang bersinar terang di malam hari.", en: "Something that shines brightly in the night sky." }
  },
  // Susun Kata - Level 1
  {
    id: "sc-1",
    gameId: "susun-kata",
    level: 1,
    question: { id: "Kategori: Hewan. Susun huruf berikut: G - A - N - A - K", en: "Category: Animal. Scramble: E - P - A - H - L - T - N" },
    correctAnswer: "ANGKA", // fallback jika tidak terjemah
    explanation: { id: "Hewan tersebut adalah GAJAH (acakan: G-A-J-A-H)", en: "The scrambled animal is ELEPHANT." },
    hint: { id: "Memiliki belalai panjang.", en: "It has a long trunk." },
    metadata: { Scrambled: "GAJAH", Answers: ["GAJAH", "ELEPHANT"] }
  },
  // Tebak Gambar - Level 1
  {
    id: "tg-1",
    gameId: "tebak-gambar",
    level: 1,
    question: { id: "Hewan apakah yang ada pada gambar?", en: "Which animal is shown in the picture?" },
    options: {
      A: { id: "Kucing", en: "Cat" },
      B: { id: "Singa", en: "Lion" },
      C: { id: "Harimau", en: "Tiger" },
      D: { id: "Serigala", en: "Wolf" }
    },
    correctAnswer: "C",
    explanation: { id: "Gambar tersebut adalah Harimau Sumatera yang langka.", en: "The picture is the rare Sumatran Tiger." },
    hint: { id: "Memiliki corak garis belang hitam oranye.", en: "It has orange and black stripes." },
    imageUrl: "https://images.unsplash.com/photo-1508817628294-5a453fa0b802?auto=format&fit=crop&q=80&w=400"
  },
  // Word Search - Level 1
  {
    id: "ws-1",
    gameId: "word-search",
    level: 1,
    question: { id: "Temukan kata-kata sekolah!", en: "Find school words!" },
    correctAnswer: "GURU, BUKU, KELAS",
    explanation: { id: "Kata yang harus dicari: GURU, BUKU, KELAS.", en: "Find the words: TEACHER, BOOK, CLASS." },
    hint: { id: "Lihat susunan vertikal atau horizontal.", en: "Look vertically or horizontally." },
    metadata: { Words: [{ id: "GURU", en: "TEACHER" }, { id: "BUKU", en: "BOOK" }, { id: "KELAS", en: "CLASS" }] }
  },
  // Pilah Sampah - Level 1
  {
    id: "ps-1",
    gameId: "pilah-sampah",
    level: 1,
    question: { id: "Pilah barang berikut ke tong sampah yang benar!", en: "Sort the following items into the correct trash bins!" },
    correctAnswer: "ORGANIK",
    explanation: { id: "Kulit pisang adalah sampah organik yang mudah membusuk.", en: "Banana peel is organic waste that decays easily." },
    hint: { id: "Termasuk sisa buah atau makanan.", en: "Includes remnants of fruit or foods." },
    metadata: { Items: [
      { name: { id: "Kulit Pisang", en: "Banana Peel" }, type: "ORGANIK" },
      { name: { id: "Botol Plastik", en: "Plastic Bottle" }, type: "ANORGANIK" },
      { name: { id: "Baterai Bekas", en: "Used Battery" }, type: "B3" },
      { name: { id: "Puntung Rokok", en: "Cigarette Butt" }, type: "RESIDU" }
    ]}
  },
  // Cerita Rakyat - Level 1
  {
    id: "cr-1",
    gameId: "cerita-rakyat",
    level: 1,
    question: { id: "Dalam cerita Malin Kundang, apa kutukan ibunya karena kedurhakaan Malin?", en: "In the Malin Kundang story, what was the mother's curse due to his disobedience?" },
    options: {
      A: { id: "Menjadi monyet", en: "Turned into a monkey" },
      B: { id: "Menjadi batu", en: "Turned into a stone" },
      C: { id: "Tenggelam di laut", en: "Drowned in the sea" },
      D: { id: "Menjadi pohon", en: "Turned into a tree" }
    },
    correctAnswer: "B",
    explanation: { id: "Malin Kundang dikutuk menjadi batu oleh ibunya yang kecewa.", en: "Malin Kundang was cursed into a stone by his disappointed mother." },
    hint: { id: "Benda keras di alam.", en: "A hard natural object." },
    imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
  },
  // Rambu Lalu Lintas - Level 1
  {
    id: "rl-1",
    gameId: "rambu-lalu-lintas",
    level: 1,
    question: { id: "Apakah arti dari rambu dengan huruf 'S' dicoret garis merah?", en: "What is the meaning of a sign with letter 'S' crossed by a red line?" },
    options: {
      A: { id: "Dilarang Parkir", en: "No Parking" },
      B: { id: "Dilarang Berhenti", en: "No Stopping" },
      C: { id: "Batas Kecepatan", en: "Speed Limit" },
      D: { id: "Jalan Satu Arah", en: "One Way Road" }
    },
    correctAnswer: "B",
    explanation: { id: "Rambu S dicoret berarti dilarang berhenti (Stop).", en: "Sign S crossed means No Stopping." },
    hint: { id: "S singkatan dari Stop / Berhenti.", en: "S stands for Stop / Stop." },
    imageUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=400"
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
