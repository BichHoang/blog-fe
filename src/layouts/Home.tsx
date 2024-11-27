import { Tag, NewsletterSubscribe, Header, Footer, Pagination } from '../components';
import siteMetadata from '../data/siteMetadata';
import { useState, useEffect } from 'react';
import { map, isEmpty } from 'lodash';
import {
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  convertKeysToSnakeCase,
} from '../utils/index';

const MAX_DISPLAY = 5;

// Mock function for date formatting
const formatDate = (date: string, locale: string): string => {
  return new Date(date).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

interface Post {
  id: number;
  slug: string;
  date: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
}

interface HomeProps {
  posts: Post[];
}

interface PaginationMeta {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_count: number;
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const [data, setData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPages] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    getArticles('articles');
    console.log('articles', data);
  }, []);

  function getArticles(endpoint: string) {
    getRequest(
      endpoint,
      setPaginationData,
      setErrors,
    );
  }

  function setPaginationData(data: Post[], meta: PaginationMeta) {
    console.log('setPaginationData', data);
    setData(data);
    setCurrentPage(meta.current_page);
    setTotalPages(meta.total_pages);
    setPerPages(meta.per_page);
    setTotalCount(meta.total_count);
  }

  function handlePageChange(pageNumber: number): void {
    const endpoint = `articles?page=${pageNumber}`;
    getArticles(endpoint);
  }
  
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <Header />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Latest
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!data.length && 'No posts found.'}
            {data.map((post) => {
              return (
                <li key={post.slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <a
                                href={`/blog/${post.slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {post.title}
                              </a>
                            </h2>
                            <div className="flex flex-wrap">
                              {/* {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))} */}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {post.description}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <a
                            href={`/blog/${post.slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${post.title}"`}
                          >
                            Read more &rarr;
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} totalCount={totalCount} onPageChange={handlePageChange} />
        {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-8">
            <NewsletterSubscribe />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
