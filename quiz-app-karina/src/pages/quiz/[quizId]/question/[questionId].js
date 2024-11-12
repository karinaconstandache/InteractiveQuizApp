import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Question() {
  const router = useRouter();
  const { quizId, questionId } = router.query;
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch questions data from the API and update state
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }

    if (quizId && questionId !== undefined) {
      fetchQuestions();
    }
  }, [quizId, questionId]);

  if (loading) {
    return <div>Încărcare...</div>;
  }

  if (!quizData[quizId]) {
    return <div>Quiz-ul nu a fost găsit.</div>;
  }

  const questionIndex = parseInt(questionId, 10);
  const categoryQuestions = quizData[quizId];

  if (!categoryQuestions || !categoryQuestions[questionIndex]) {
    return <div>Întrebarea nu a fost găsită.</div>;
  }

  const questionData = categoryQuestions[questionIndex];

  // Handle answer selection
  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    if (selectedOption === questionData.correctAnswer) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
  };

  // Handle navigation to the next question
  const handleNextQuestion = () => {
    const nextQuestionId = questionIndex + 1;
    if (nextQuestionId < categoryQuestions.length) {
      router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    } else {
      router.push({
        pathname: `/quiz/${quizId}/results`,
        query: { score, totalQuestions: categoryQuestions.length },
      });
    }
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div>
      <h1>{questionData.question}</h1>
      <ul>
        {questionData.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              style={{
                backgroundColor: selectedAnswer === option ? (isCorrect ? 'green' : 'red') : '',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {isAnswered && (
        <div>
          {isCorrect ? (
            <p style={{ color: 'green' }}>Corect!</p>
          ) : (
            <p style={{ color: 'red' }}>
              Greșit! Răspunsul corect este: {questionData.correctAnswer}
            </p>
          )}
          <button onClick={handleNextQuestion}>Următoarea întrebare</button>
        </div>
      )}
    </div>
  );
}
