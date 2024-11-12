import { useState, useEffect } from 'react';

export default function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [quizData, setQuizData] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('quizData')) || {};
    }
    return {};
  });

  // Load categories on mount using useEffect
  useEffect(() => {
    const predefinedCategories = ['Geografie', 'Istorie', 'Literatura'];
    if (typeof window !== 'undefined') {
      const storedCategories = JSON.parse(localStorage.getItem('categories')) || predefinedCategories;
      setCategories(storedCategories);
      if (storedCategories.length > 0) {
        setCategory(storedCategories[0]); // Default category
      }
    }
  }, []);

  // Sync quizData to localStorage whenever it changes using useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  }, [quizData]);

  const handleInputChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question || !correctAnswer || !category || options.some((opt) => opt.trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer,
    };

    const updatedQuizData = { ...quizData };
    if (!updatedQuizData[category]) {
      updatedQuizData[category] = [];
    }
    updatedQuizData[category].push(newQuestion);

    // Update state and trigger useEffect to sync with localStorage
    setQuizData(updatedQuizData);

    // Reset form fields
    setQuestion('');
    setOptions(['', '', '']);
    setCorrectAnswer('');
    setCategory(categories[0]); // Reset to first category
    alert('Question added successfully!');
  };

  return (
    <div>
      <h1>Adaugă o nouă întrebare</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Întrebare:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>Opțiuni:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleInputChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label>
            Răspuns corect:
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Selectează categoria:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Adaugă Întrebare</button>
      </form>
    </div>
  );
}
