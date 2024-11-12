import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bine ai venit la aplicația noastră de quiz!</h1>
      <p>Alege o opțiune pentru a începe:</p>
      <ul>
        <li>
          <Link href="/categories">Vezi categorii</Link>
        </li>
        <li>
          <Link href="/addQuestion">Adaugă o nouă întrebare</Link>
        </li>
      </ul>
    </div>
  );
}
