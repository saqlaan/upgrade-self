export type OptionType = {
  id: number;
  value: string;
};

export type QuestionType = {
  id: number;
  question: string;
  options: OptionType[];
};
