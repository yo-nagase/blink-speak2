import { Question, QuestionRequest } from "@/types/Question.type";
import axios, { AxiosError } from "axios";
import { useState } from "react";

/**
 * Hook to manage question state and API interactions
 */
export default function useQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [isQuestionLoading, setIsQuestionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getNewQuestion = async (params?: QuestionRequest): Promise<Question | undefined> => {
    try {
      setIsQuestionLoading(true);
      setError(null);

      const result = await axios.get<Question>("/api/ai/question", {
        params: {
          level: params?.level,
          category: JSON.stringify(params?.category)
        }
      });

      setCurrentQuestion(result.data);
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
      return undefined;
    } finally {
      setIsQuestionLoading(false);
    }
  };

  return {
    getNewQuestion,
    currentQuestion,
    isQuestionLoading,
    error
  };
}



