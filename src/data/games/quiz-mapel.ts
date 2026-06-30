import { Question } from '@/lib/gamesSeedData';

export const quizMapelQuestions: Question[] = [
  // Level 1: Very Easy (3 options)
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
    explanation: { id: "Bendera Indonesia berwarna merah di atas yang melambangkan keberanian, dan putih di bawah yang melambangkan kesucian.", en: "The Indonesian flag is red on top representing bravery, and white on the bottom representing purity." },
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
    question: { id: "Hewan apa yang memiliki belalai panjang dan tubuh sangat besar?", en: "Which animal has a long trunk and a very large body?" },
    options: {
      A: { id: "Gajah", en: "Elephant" },
      B: { id: "Jerapah", en: "Giraffe" },
      C: { id: "Singa", en: "Lion" }
    },
    correctAnswer: "A",
    explanation: { id: "Gajah adalah mamalia darat terbesar yang memiliki belalai untuk mengambil makanan.", en: "Elephants are the largest land mammals that have a trunk to pick up food." },
    hint: { id: "Hewan ini juga memiliki telinga yang lebar.", en: "This animal also has wide ears." }
  },
  {
    id: "quiz-mapel-l1-4",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Di manakah tempat untuk membaca dan meminjam buku di sekolah?", en: "Where is the place to read and borrow books at school?" },
    options: {
      A: { id: "Perpustakaan", en: "Library" },
      B: { id: "Kantin", en: "Canteen" },
      C: { id: "Ruang Guru", en: "Teacher's Room" }
    },
    correctAnswer: "A",
    explanation: { id: "Perpustakaan sekolah adalah ruang khusus membaca dan menyimpan koleksi buku untuk dipinjam siswa.", en: "The school library is a room dedicated to reading and storing book collections for students to borrow." },
    hint: { id: "Tempat yang hening dan tenang untuk membaca.", en: "A quiet and calm place to read." }
  },
  {
    id: "quiz-mapel-l1-5",
    gameId: "quiz-mapel",
    level: 1,
    question: { id: "Sebelum makan kita harus mencuci tangan menggunakan...", en: "Before eating, we must wash our hands using..." },
    options: {
      A: { id: "Sabun dan Air mengalir", en: "Soap and Running water" },
      B: { id: "Air saja", en: "Water only" },
      C: { id: "Tisu kering", en: "Dry tissue" }
    },
    correctAnswer: "A",
    explanation: { id: "Mencuci tangan menggunakan sabun dan air mengalir efektif membunuh kuman penyebab penyakit.", en: "Washing hands using soap and running water is effective in killing disease-causing germs." },
    hint: { id: "Kombinasi pembersih kuman dan cairan pembersih.", en: "A combination of germ cleaner and cleansing fluid." }
  },

  // Level 2: Easy (4 options)
  {
    id: "quiz-mapel-l2-1",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Siapakah nama presiden pertama Republik Indonesia?", en: "Who was the first president of the Republic of Indonesia?" },
    options: {
      A: { id: "Ir. Soekarno", en: "Ir. Soekarno" },
      B: { id: "Drs. Moh. Hatta", en: "Drs. Moh. Hatta" },
      C: { id: "Soeharto", en: "Soeharto" },
      D: { id: "B.J. Habibie", en: "B.J. Habibie" }
    },
    correctAnswer: "A",
    explanation: { id: "Ir. Soekarno bersama Moh. Hatta memproklamasikan kemerdekaan Indonesia dan menjadi presiden pertama.", en: "Ir. Soekarno along with Moh. Hatta proclaimed Indonesian independence and became the first president." },
    hint: { id: "Beliau akrab dipanggil Bung Karno.", en: "He is familiarly called Bung Karno." }
  },
  {
    id: "quiz-mapel-l2-2",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Hewan air apa yang bernapas menggunakan paru-paru?", en: "Which aquatic animal breathes using lungs?" },
    options: {
      A: { id: "Lumba-lumba", en: "Dolphin" },
      B: { id: "Ikan Mas", en: "Goldfish" },
      C: { id: "Hiu", en: "Shark" },
      D: { id: "Gurita", en: "Octopus" }
    },
    correctAnswer: "A",
    explanation: { id: "Lumba-lumba adalah mamalia laut, sehingga bernapas dengan paru-paru dan menghirup udara ke permukaan.", en: "Dolphins are marine mammals, so they breathe with lungs and inhale air at the surface." },
    hint: { id: "Hewan ini menyusui anaknya dan sangat bersahabat dengan manusia.", en: "This animal nurses its young and is very friendly to humans." }
  },
  {
    id: "quiz-mapel-l2-3",
    gameId: "quiz-mapel",
    level: 2,
    question: { id: "Pancasila terdiri dari berapa sila?", en: "How many principles are there in Pancasila?" },
    options: {
      A: { id: "5", en: "5" },
      B: { id: "4", en: "4" },
      C: { id: "6", en: "6" },
      D: { id: "7", en: "7" }
    },
    correctAnswer: "A",
    explanation: { id: "Pancasila merupakan dasar negara Indonesia yang memiliki lima sila dasar.", en: "Pancasila is the state foundation of Indonesia which has five basic principles." },
    hint: { id: "Artinya panca adalah lima.", en: "Panca means five." }
  },

  // Level 3: Medium (4 options)
  {
    id: "quiz-mapel-l3-1",
    gameId: "quiz-mapel",
    level: 3,
    question: { id: "Candi Borobudur yang merupakan candi Buddha terbesar terletak di provinsi...", en: "Borobudur Temple, which is the largest Buddhist temple, is located in the province of..." },
    options: {
      A: { id: "Jawa Tengah", en: "Central Java" },
      B: { id: "Jawa Timur", en: "East Java" },
      C: { id: "Yogyakarta", en: "Yogyakarta" },
      D: { id: "Jawa Barat", en: "West Java" }
    },
    correctAnswer: "A",
    explanation: { id: "Candi Borobudur berlokasi di Magelang, Jawa Tengah.", en: "Borobudur Temple is located in Magelang, Central Java." },
    hint: { id: "Ibu kota provinsinya adalah Semarang.", en: "The capital of its province is Semarang." }
  },
  {
    id: "quiz-mapel-l3-2",
    gameId: "quiz-mapel",
    level: 3,
    question: { id: "Zat hijau pada daun yang berfungsi menyerap cahaya matahari disebut...", en: "The green substance in leaves that functions to absorb sunlight is called..." },
    options: {
      A: { id: "Klorofil", en: "Chlorophyll" },
      B: { id: "Oksigen", en: "Oxygen" },
      C: { id: "Stomata", en: "Stomata" },
      D: { id: "Karbon", en: "Carbon" }
    },
    correctAnswer: "A",
    explanation: { id: "Klorofil menangkap energi matahari untuk menggerakkan proses fotosintesis tumbuhan.", en: "Chlorophyll captures solar energy to drive the plant's photosynthesis process." },
    hint: { id: "Berperan sebagai zat hijau daun.", en: "Acts as leaf green substance." }
  },

  // Level 4: Hard (5 options)
  {
    id: "quiz-mapel-l4-1",
    gameId: "quiz-mapel",
    level: 4,
    question: { id: "Siapakah pencipta lagu kebangsaan Indonesia Raya?", en: "Who composed the national anthem Indonesia Raya?" },
    options: {
      A: { id: "W.R. Soepratman", en: "W.R. Soepratman" },
      B: { id: "Ibu Sud", en: "Ibu Sud" },
      C: { id: "Kusbini", en: "Kusbini" },
      D: { id: "Ismail Marzuki", en: "Ismail Marzuki" },
      E: { id: "C. Simanjuntak", en: "C. Simanjuntak" }
    },
    correctAnswer: "A",
    explanation: { id: "Lagu kebangsaan Indonesia Raya digubah oleh Wage Rudolf Soepratman pada tahun 1928.", en: "The national anthem Indonesia Raya was composed by Wage Rudolf Soepratman in 1928." },
    hint: { id: "Singkatan dari Wage Rudolf.", en: "Abbreviation of Wage Rudolf." }
  },

  // Level 5: Expert (5 options)
  {
    id: "quiz-mapel-l5-1",
    gameId: "quiz-mapel",
    level: 5,
    question: { id: "Peristiwa penculikan Soekarno-Hatta ke Rengasdengklok didorong oleh perbedaan pendapat mengenai...", en: "The kidnapping of Soekarno-Hatta to Rengasdengklok was driven by differences of opinion regarding..." },
    options: {
      A: { id: "Waktu pelaksanaan proklamasi kemerdekaan", en: "The timing of the proclamation of independence" },
      B: { id: "Isi naskah proklamasi", en: "The content of the proclamation draft" },
      C: { id: "Struktur pemerintahan RIS", en: "The government structure of RIS" },
      D: { id: "Bantuan tentara Jepang", en: "Japanese military support" },
      E: { id: "Pembentukan PPKI", en: "The formation of PPKI" }
    },
    correctAnswer: "A",
    explanation: { id: "Golongan muda mendesak proklamasi dilakukan segera setelah Jepang menyerah tanpa menunggu janji kemerdekaan Jepang.", en: "The young group urged the proclamation to be made immediately after Japan's surrender without waiting for Japan's independence promise." },
    hint: { id: "Terkait dengan kapan kemerdekaan harus diumumkan.", en: "Related to when independence should be announced." }
  }
];
