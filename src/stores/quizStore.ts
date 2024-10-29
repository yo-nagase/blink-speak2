import { create } from 'zustand'

type Quiz = {
  id: string
  result?: 'CORRECT' | 'INCORRECT'
  question: string
  correctAnswer: string
  yourAnswer?: string
  comment?: string
}

type QuizStore = {
  quizzes: Quiz[]
  addQuiz: (quiz: Quiz) => void
  setAnswer: (index: number, answer: string) => void
  // 必要に応じて他のアクション
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  
  addQuiz: (quiz) => set((state) => ({
    quizzes: [...state.quizzes, quiz]
  })),
  
  setAnswer: (index, answer) => set((state) => ({
    quizzes: state.quizzes.map((quiz, i) => 
      i === index ? { ...quiz, yourAnswer: answer } : quiz
    )
  }))
})) 