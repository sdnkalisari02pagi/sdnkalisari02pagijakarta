import { Question } from '@/lib/gamesSeedData';

export const quizMapelQuestions: Question[] = [
  // Level 1: Very Easy
  {
    id: "quiz-mapel-l1-1",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Apa warna bendera negara Indonesia?", en: "What color is the Indonesian national flag?" },
    options: {
      A: { id: "Merah dan Putih", en: "Red and White" },
      B: { id: "Merah dan Biru", en: "Red and Blue" },
      C: { id: "Hijau dan Putih", en: "Green and White" }
    },
    correctAnswer: "A",
    explanation: { id: "Bendera Indonesia berwarna merah di atas dan putih di bawah.", en: "The Indonesian flag is red on top and white on the bottom." },
    hint: { id: "Warna pertama melambangkan keberanian, warna kedua kesucian.", en: "The first color represents bravery, the second represents purity." }
  },
  {
    id: "quiz-mapel-l1-2",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Berapakah hasil dari 5 + 3?", en: "What is 5 + 3?" },
    options: {
      A: { id: "8", en: "8" },
      B: { id: "7", en: "7" },
      C: { id: "9", en: "9" }
    },
    correctAnswer: "A",
    explanation: { id: "Penjumlahan dasar 5 ditambah 3 adalah 8.", en: "The basic addition of 5 plus 3 is 8." },
    hint: { id: "Hitung setelah angka 5 sebanyak 3 kali.", en: "Count 3 steps after the number 5." }
  },
  {
    id: "quiz-mapel-l1-3",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Hewan apa yang memiliki belalai panjang?", en: "Which animal has a long trunk?" },
    options: {
      A: { id: "Gajah", en: "Elephant" },
      B: { id: "Jerapah", en: "Giraffe" },
      C: { id: "Singa", en: "Lion" }
    },
    correctAnswer: "A",
    explanation: { id: "Gajah adalah hewan darat terbesar yang memiliki belalai panjang.", en: "Elephants are the largest land animals and have a long trunk." },
    hint: { id: "Hewan ini berbadan sangat besar dan bertelinga lebar.", en: "This animal has a very large body and wide ears." }
  },
  {
    id: "quiz-mapel-l1-4",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Di manakah tempat untuk meminjam buku di sekolah?", en: "Where is the place to borrow books at school?" },
    options: {
      A: { id: "Perpustakaan", en: "Library" },
      B: { id: "Kantin", en: "Canteen" },
      C: { id: "Kantor Guru", en: "Teacher's Office" }
    },
    correctAnswer: "A",
    explanation: { id: "Perpustakaan sekolah menyediakan buku pelajaran dan cerita untuk dipinjam siswa.", en: "The school library provides textbooks and storybooks for students to borrow." },
    hint: { id: "Tempat yang tenang untuk membaca buku.", en: "A quiet place to read books." }
  },
  {
    id: "quiz-mapel-l1-5",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Sebelum makan kita harus...", en: "Before eating, we must..." },
    options: {
      A: { id: "Mencuci tangan", en: "Wash our hands" },
      B: { id: "Langsung makan", en: "Eat directly" },
      C: { id: "Tidur", en: "Sleep" }
    },
    correctAnswer: "A",
    explanation: { id: "Mencuci tangan penting untuk membersihkan kuman sebelum makan.", en: "Washing hands is important to clean germs before eating." },
    hint: { id: "Gunakan sabun dan air mengalir.", en: "Use soap and running water." }
  },

  // Level 2: Easy
  {
    id: "quiz-mapel-l2-1",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Siapakah presiden pertama Republik Indonesia?", en: "Who was the first president of the Republic of Indonesia?" },
    options: {
      A: { id: "Ir. Soekarno", en: "Ir. Soekarno" },
      B: { id: "Drs. Moh. Hatta", en: "Drs. Moh. Hatta" },
      C: { id: "Soeharto", en: "Soeharto" },
      D: { id: "B.J. Habibie", en: "B.J. Habibie" }
    },
    correctAnswer: "A",
    explanation: { id: "Ir. Soekarno menjabat sebagai presiden pertama Indonesia sejak tahun 1945.", en: "Ir. Soekarno served as the first president of Indonesia since 1945." },
    hint: { id: "Beliau juga dijuluki sebagai Bung Karno.", en: "He is also nicknamed Bung Karno." }
  },
  {
    id: "quiz-mapel-l2-2",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Hewan apa yang bernapas menggunakan insang?", en: "Which animal breathes using gills?" },
    options: {
      A: { id: "Ikan", en: "Fish" },
      B: { id: "Kucing", en: "Cat" },
      C: { id: "Burung", en: "Bird" },
      D: { id: "Cacing", en: "Worm" }
    },
    correctAnswer: "A",
    explanation: { id: "Ikan menggunakan insang untuk menyaring oksigen di dalam air.", en: "Fish use gills to filter oxygen underwater." },
    hint: { id: "Hewan ini hidup di dalam air.", en: "This animal lives in the water." }
  },
  {
    id: "quiz-mapel-l2-3",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Bahan makanan pokok sebagian besar masyarakat Indonesia adalah...", en: "The staple food source for most Indonesian people is..." },
    options: {
      A: { id: "Beras", en: "Rice" },
      B: { id: "Gandum", en: "Wheat" },
      C: { id: "Sagu", en: "Sago" },
      D: { id: "Jagung", en: "Corn" }
    },
    correctAnswer: "A",
    explanation: { id: "Beras diolah menjadi nasi yang dikonsumsi sehari-hari.", en: "Rice is processed into rice, which is consumed daily." },
    hint: { id: "Warna mentahnya putih dan dihasilkan oleh tanaman padi.", en: "Its raw color is white and produced by rice plants." }
  },
  {
    id: "quiz-mapel-l2-4",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Pancasila memiliki berapa sila?", en: "How many principles does Pancasila have?" },
    options: {
      A: { id: "5", en: "5" },
      B: { id: "4", en: "4" },
      C: { id: "6", en: "6" },
      D: { id: "3", en: "3" }
    },
    correctAnswer: "A",
    explanation: { id: "Pancasila berasal dari kata panca yang berarti lima dan sila yang berarti asas.", en: "Pancasila comes from the word 'panca' meaning five and 'sila' meaning principle." },
    hint: { id: "Sesuai dengan jumlah lambang pada perisai burung Garuda.", en: "Corresponds to the number of symbols on the shield of the Garuda bird." }
  },
  {
    id: "quiz-mapel-l2-5",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Benda berikut yang termasuk benda padat adalah...", en: "Which of the following items is a solid object?" },
    options: {
      A: { id: "Batu", en: "Stone" },
      B: { id: "Air", en: "Water" },
      C: { id: "Minyak", en: "Oil" },
      D: { id: "Udara", en: "Air" }
    },
    correctAnswer: "A",
    explanation: { id: "Batu memiliki bentuk dan volume yang tetap, tidak mengikuti bentuk wadahnya.", en: "A stone has a fixed shape and volume, not following the shape of its container." },
    hint: { id: "Keras dan tidak mengalir.", en: "Hard and does not flow." }
  },

  // Level 3: Medium
  {
    id: "quiz-mapel-l3-1",
    gameId: "quiz-mapel",
    level: 3,
    question: { id: "Zat hijau pada daun yang berperan dalam fotosintesis disebut...", en: "The green pigment in leaves that plays a role in photosynthesis is called..." },
    options: {
      A: { id: "Klorofil", en: "Chlorophyll" },
      B: { id: "Kloroplas", en: "Chloroplast" },
      C: { id: "Stomata", en: "Stomata" },
      D: { id: "Floem", en: "Phloem" }
    },
    correctAnswer: "A",
    explanation: { id: "Klorofil menangkap energi cahaya matahari untuk fotosintesis.", en: "Chlorophyll captures solar energy for photosynthesis." },
    hint: { id: "Mulai dengan huruf K.", en: "Starts with the letter C." }
  },
  {
    id: "quiz-mapel-l3-2",
    gameId: "quiz-mapel",
    level: 3,
    question: { id: "Candi Borobudur terletak di provinsi...", en: "Borobudur Temple is located in the province of..." },
    options: {
      A: { id: "Jawa Tengah", en: "Central Java" },
      B: { id: "Yogyakarta", en: "Yogyakarta" },
      C: { id: "Jawa Timur", en: "East Java" },
      D: { id: "Jawa Barat", en: "West Java" }
    },
    correctAnswer: "A",
    explanation: { id: "Candi Borobudur secara administratif berada di Magelang, Jawa Tengah.", en: "Borobudur Temple is administratively located in Magelang, Central Java." },
    hint: { id: "Ibu kota provinsinya adalah Semarang.", en: "The capital of the province is Semarang." }
  },

  // Level 4: Hard (5 choices A-E)
  {
    id: "quiz-mapel-l4-1",
    gameId: "quiz-mapel",
    level: 4,
    question: { id: "Siapakah pencipta lagu kebangsaan Indonesia Raya?", en: "Who is the composer of the national anthem Indonesia Raya?" },
    options: {
      A: { id: "W.R. Soepratman", en: "W.R. Soepratman" },
      B: { id: "Ibu Sud", en: "Ibu Sud" },
      C: { id: "Kusbini", en: "Kusbini" },
      D: { id: "Ismail Marzuki", en: "Ismail Marzuki" },
      E: { id: "C. Simanjuntak", en: "C. Simanjuntak" }
    },
    correctAnswer: "A",
    explanation: { id: "Wage Rudolf Soepratman menciptakan lagu kebangsaan Indonesia Raya.", en: "Wage Rudolf Soepratman composed the national anthem Indonesia Raya." },
    hint: { id: "Inisial namanya adalah W.R.", en: "His initials are W.R." }
  },

  // Level 5: Expert (5 choices A-E)
  {
    id: "quiz-mapel-l5-1",
    gameId: "quiz-mapel",
    level: 5,
    question: { id: "Peristiwa Rengasdengklok terjadi karena adanya perbedaan pendapat antara golongan muda dan tua mengenai...", en: "The Rengasdengklok event occurred due to differences of opinion between young and old groups regarding..." },
    options: {
      A: { id: "Waktu proklamasi kemerdekaan", en: "The timing of the proclamation of independence" },
      B: { id: "Isi teks proklamasi", en: "The content of the proclamation text" },
      C: { id: "Pembentukan PPKI", en: "The formation of PPKI" },
      D: { id: "Pemilihan presiden", en: "The election of the president" },
      E: { id: "Bantuan dari militer Jepang", en: "Assistance from the Japanese military" }
    },
    correctAnswer: "A",
    explanation: { id: "Golongan muda mendesak proklamasi segera dilakukan pasca kekalahan Jepang.", en: "The young group urged an immediate proclamation after the defeat of Japan." },
    hint: { id: "Terkait dengan kapan kemerdekaan diumumkan.", en: "Related to when independence was announced." }
  }
];
