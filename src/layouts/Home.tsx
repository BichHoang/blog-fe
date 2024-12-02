import { Tag as TagLayout, NewsletterSubscribe, Header, Footer, Pagination } from '../components';
import siteMetadata from '../data/siteMetadata';
import { useState, useEffect } from 'react';
import {
  getRequest,
  formatDate,
} from '../utils/index';
import { Post, PaginationMeta } from '../types/interfaces';

const Home: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPages] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    getArticles('articles');
  }, []);

  function getArticles(endpoint: string) {
    getRequest(
      endpoint,
      setPaginationData,
      setErrors,
    );
  }

  function setPaginationData(data: Post[], meta: PaginationMeta) {
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
              Bài viết mới nhất
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!data.length && 'Hiện tại chưa có bài viết nào.'}
            {data.map((post) => {
              return (
                <li key={`home-${post.slug}`} className="py-12">
                  <article>
                    <div className="space-y-2 2xl:grid 2xl:grid-cols-4 2xl:items-baseline 2xl:space-y-0">
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
                                href={`/articles/${post.slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {post.title}
                              </a>
                            </h2>
                            <div className="flex flex-wrap">
                              {post.tags.map((tag) => (
                                <TagLayout key={`home-${tag.id}`} text={tag.name} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {post.description}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <a
                            href={`/articles/${post.slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${post.title}"`}
                          >
                            Xem tiếp &rarr;
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
