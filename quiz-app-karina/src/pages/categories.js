import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'categories.json');
  const jsonData = await fs.promises.readFile(filePath, 'utf-8');
  const categories = JSON.parse(jsonData);

  return {
    props: {
      categories,
    },
  };
}

export default function Categories({ categories }) {
  return (
    <div>
      <h1>Categorii disponibile</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/quiz/${category.name}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
