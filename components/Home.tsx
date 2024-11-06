import { useEffect } from "react";
import useQuestion from "./language-quiz/hooks/useQuestion";
import { Button } from "./ui/button";

export default function Home() {
  const { currentQuestion, isQuestionLoading, error, getNewQuestion } = useQuestion();

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!currentQuestion) {
        console.log("🐔 ", currentQuestion);
        await getNewQuestion();
      }
    };
    fetchQuestion();
  }, [currentQuestion]);

  return (
    <div>
      <h1>User and Post Data</h1>
      <section>
        <h2>User Data</h2>
        {isQuestionLoading ? (
          <p>Loading user data...</p>
        ) : currentQuestion ? (
          <pre>{JSON.stringify(currentQuestion, null, 2)}</pre>
        ) : (
          <p>No user data available</p>
        )}
        <Button onClick={() => getNewQuestion()}>Retrieve User Data Again</Button>
      </section>


    </div>
  );
}