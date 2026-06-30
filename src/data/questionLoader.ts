import { Question } from './types';
import { bahasaIndonesiaQuestions } from './quiz/bahasa-indonesia';
import { matematikaQuestions } from './quiz/matematika';
import { ipasQuiz } from './quiz/ipas';
import { ppknQuiz } from './quiz/ppkn';
import { agamaQuiz } from './quiz/agama';
import { bahasaInggrisQuiz } from './quiz/bahasa-inggris';

import { tebakGambarData } from './games/tebak-gambar';
import { susunKataData } from './games/susun-kata';
import { cariKataData } from './games/cari-kata';
import { puzzleNusantaraData } from './games/puzzle-nusantara';
import { ceritaRakyatData } from './games/cerita-rakyat';
import { pilahSampahData } from './games/pilah-sampah';
import { rambuLaluLintasData } from './games/rambu-lalu-lintas';

export function getQuestionsFromBank(gameId: string, level: number): Question[] {
  let list: Question[] = [];
  
  if (gameId === 'quiz-mapel') {
    list = [
      ...bahasaIndonesiaQuestions,
      ...matematikaQuestions,
      ...ipasQuiz,
      ...ppknQuiz,
      ...agamaQuiz,
      ...bahasaInggrisQuiz
    ];
  } else if (gameId === 'math-challenge') {
    list = matematikaQuestions;
  } else if (gameId === 'tebak-gambar') {
    list = tebakGambarData;
  } else if (gameId === 'susun-kata') {
    list = susunKataData;
  } else if (gameId === 'cari-kata') {
    list = cariKataData;
  } else if (gameId === 'puzzle-indo') {
    list = puzzleNusantaraData;
  } else if (gameId === 'cerita-rakyat') {
    list = ceritaRakyatData;
  } else if (gameId === 'pilah-sampah') {
    list = pilahSampahData;
  } else if (gameId === 'rambu-lalu-lintas') {
    list = rambuLaluLintasData;
  }

  // Filter strictly by level
  return list.filter(q => q.level === level);
}
export { kartuMemoriData } from './games/kartu-memori';
