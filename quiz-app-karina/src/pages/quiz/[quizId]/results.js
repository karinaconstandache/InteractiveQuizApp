import { useRouter } from 'next/router';

export default function Results() {
  const router = useRouter();
  const { score = 0, totalQuestions = 0 } = router.query;

  const getMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) {
      return "Excelent! Ai răspuns corect la toate întrebările!";
    } else if (percentage >= 70) {
      return "Foarte bine! Mai ai puțin până la perfecțiune.";
    } else if (percentage >= 50) {
      return "Bine făcut, dar mai este loc de îmbunătățiri.";
    } else {
      return "Nu te descuraja! Mai încearcă!";
    }
  };

  return (
    <div>
      <h1>Rezultatele Tale</h1>
      <p>Total întrebări: {totalQuestions}</p>
      <p>Răspunsuri corecte: {score}</p>
      <p>{getMessage()}</p>
      <button onClick={() => router.push('/categories')}>Înapoi la categorii</button>
      <button onClick={() => router.push('/')}>Înapoi la pagina principală</button>
    </div>
  );
}
