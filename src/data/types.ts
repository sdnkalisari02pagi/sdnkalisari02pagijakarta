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
