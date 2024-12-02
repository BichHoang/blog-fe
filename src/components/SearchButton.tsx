import { FC, useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import {
  getRequest,
} from '../utils/index';

const SearchButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setQuery('');
    setSuggestions([]);
  };

  const fetchSuggestions = useMemo(() => {
    return debounce((keyword: string) => {
      if (!keyword.trim()) {
        setSuggestions([]);
        return;
      }
      getArticles(keyword);
    }, 500);
  }, []);

  useEffect(() => {
    fetchSuggestions(query);

    return () => fetchSuggestions.cancel();
  }, [query, fetchSuggestions]);

  function getArticles(keyword: string) {
    getRequest(
      'articles?keyword=' + keyword,
      setSuggestions,
      setErrors,
    );
  }

  return (
    <div>
      <div onClick={openModal} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 dark:text-gray-300"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Search
            </h2>
            <input
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-2">
              {loading && <p className="text-sm text-gray-500">Loading...</p>}
              {!loading && suggestions.length === 0 && query && (
                <p className="text-sm text-gray-500">No results found</p>
              )}
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <h3 className="text-xl font-bold leading-8 tracking-tight">
                      <a
                        href={`/articles/${suggestion.slug}`}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {suggestion.title}
                      </a>
                    </h3>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {suggestion.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
