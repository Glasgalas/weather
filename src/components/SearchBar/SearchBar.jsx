import { useState } from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ fetch }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target }) => setQuery(target.value);

  // поиск по кнопке
  const search = () => {
    fetch(query);
    setQuery('');
  };

  // поиск по нажатию клавиши
  const searchOnKey = e => {
    if (e.key === 'Enter') {
      fetch(query);
      setQuery('');
    }
  };

  return (
    <div className={s.searchBar}>
      <input
        className={s.input}
        type="text"
        onKeyPress={searchOnKey}
        value={query}
        onChange={handleChange}
        placeholder="City..."
      />
      <button className={s.btn} onClick={search}>
        search
      </button>
    </div>
  );
};

export default SearchBar;
