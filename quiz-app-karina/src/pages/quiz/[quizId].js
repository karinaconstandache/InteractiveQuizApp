import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;

  if (!quizId) {
    return <div>Încărcare...</div>;
  }
  
  return (
    <div>
      <h1>Quiz-ul {quizId}</h1>
      <p>Începe quiz-ul pentru categoria {quizId}!</p>
      <Link href={`/quiz/${quizId}/question/0`}>
        Începe Quiz-ul
      </Link>
    </div>
  );
}
