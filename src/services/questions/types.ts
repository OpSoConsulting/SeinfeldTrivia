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
  id: string;
  data: {
    question_text: PrismicText[];
    answers: PrismicAnswer[]
  }
}

export interface PrismicAnswer {
  text: PrismicText[];
  is_correct: 'true' | 'false';
  // this property only exists locally
  originalIndex?: number;
}