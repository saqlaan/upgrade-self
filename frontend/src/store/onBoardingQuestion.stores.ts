import { create } from "zustand";

interface onBoardingQuestionsState {
  selections: {
    [key: string]: string;
  } | null;
  setSelection: (questionId: string, optionId: string) => void;
  clearQuestions: () => void;
}

export const useOnBoardingQuestionsStore = create<onBoardingQuestionsState>(
  (set) => ({
    selections: null,
    setSelection: (questionId, optionId) =>
      set((state) => {
        return {
          selections: {
            ...state.selections,
            [questionId]: optionId,
          },
        };
      }),
    clearQuestions: () => set((state) => ({ selections: null })),
  })
);
