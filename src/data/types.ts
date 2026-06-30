export interface BilingualText {
  id: string;
  en?: string;
}

export interface OptionItem {
  id: string;
  en?: string;
}

export interface Question {
  id: string;
  kelas: 1 | 2 | 3 | 4 | 5 | 6;
  level: 1 | 2 | 3 | 4 | 5;
  category: string;
  topic: string;
  question: {
    id: string;
    en?: string;
  };
  options?: {
    A: OptionItem;
    B: OptionItem;
    C: OptionItem;
    D: OptionItem;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: {
    id: string;
    en?: string;
  };
  hint?: {
    id: string;
    en?: string;
  };
  image?: string | null;
  tags?: string[];
  
  // Compatibility fields for the current game engine (if referenced)
  gameId?: string;
  imageUrl?: string; 
  metadata?: any;
}
