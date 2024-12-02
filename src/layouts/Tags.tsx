import { Header, Footer, Link } from '../components';
import { useState, useEffect } from 'react';
import { Tag } from '../types/interfaces';
import {
  getRequest,
} from '../utils/index';

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    getTags('tags');
  }, []);

  function getTags(endpoint: string) {
    getRequest(
      endpoint,
      setTags,
      setErrors,
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <Header />
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              Chuyên mục
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {!tags.length && 'Hiện tại chưa có chuyên mục nào.'}
            {tags.map((tag) => {
              return (
                <div key={tag.id} className="mb-2 mr-5 mt-2">
                  <Link
                    key={tag.name}
                    href={`/tags/${tag.slug}`}
                    className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                  {tag.name}
                  </Link>
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                  {" "}({tag.articlesCount})
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Tags;
