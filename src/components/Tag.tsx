import React from 'react';

interface Props {
  text: string;
}

// Simple slugify function to convert text to a URL-friendly format
const slugify = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const Tag: React.FC<Props> = ({ text }) => {
  return (
    <a
      href={`/tags/${slugify(text)}`}
      className="mr-4 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text}
    </a>
  );
};

export default Tag;
