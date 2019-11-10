export interface Question {
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

interface PrismicText {
  type: 'paragraph';
  text: string;
  spans: any[];
};

export interface PrismicResponse {
  page: number;
  results: PrismicQuestion[];
  total_pages: number;
}

export interface PrismicQuestion {
  data: {
    question_text: PrismicText[];
    answers: {
      text: PrismicText[];
      is_correct: 'true' | 'false';
    }[]
  }
}