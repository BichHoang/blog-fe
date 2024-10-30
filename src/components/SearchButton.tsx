import React, { FC, ButtonHTMLAttributes } from 'react';
import siteMetadata from '../data/siteMetadata';

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const AlgoliaButton: FC<SearchButtonProps> = ({ children, ...props }) => (
  <button {...props} className="algolia-button">
    {children}
  </button>
);

const KBarButton: FC<SearchButtonProps> = ({ children, ...props }) => (
  <button {...props} className="kbar-button">
    {children}
  </button>
);

const SearchButton: FC = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton;

    return (
      <SearchButtonWrapper aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-900 hover:text-primary-500 dark:text-gray-100
          dark:hover:text-primary-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </SearchButtonWrapper>
    );
  }
  return null;
};

export default SearchButton;
