import { Tag as TagLayout, Header, Footer, Pagination, Link } from '../components';
import siteMetadata from '../data/siteMetadata';
import { useState, useEffect } from 'react';
import { map } from 'lodash';
import {
  getRequest,
  formatDate,
  convertKeysToCamelCase,
} from '../utils/index';
import { Post, PaginationMeta, Tag } from '../types/interfaces';
import { useParams } from 'react-router-dom';

const Home: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPages] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
console.log("slug", slug);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    let endpoint = 'articles';
    if (slug !== undefined) {
      endpoint = `tags/${slug}`;
    }
    getArticles(endpoint);
    getTags('tags');
  }, []);

  function getArticles(endpoint: string) {
    getRequest(
      endpoint,
      setPaginationData,
      setErrors,
    );
  }

  function getTags(endpoint: string) {
    getRequest(
      endpoint,
      setTags,
      setErrors,
    );
  }

  function setPaginationData(data: any, meta: PaginationMeta) {
    console.log('setPaginationData', data);
    if (slug === undefined) {
      setData(data);
    } else {
      let articles = data.articles;
      articles = map(articles, item => convertKeysToCamelCase(item));
      setData(articles);
    }
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
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">All Posts</h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              <h3 className="font-bold uppercase text-primary-500">Tất cả bài viết</h3>
              <ul>
                {tags.map((tag) => {
                  return (
                    <li key={`blog-${tag.id}`} className="my-3">
                      <Link
                        key={tag.name}
                        href={`/tags/${tag.slug}`}
                        className={`px-3 py-2 text-sm font-medium uppercase  hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500 ${
                          tag.slug === slug ? "text-primary-500" : "text-gray-500"
                        }`}
                      >
                        {tag.name}{" "}({tag.articlesCount})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="w-fill">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {!data.length && 'No posts found.'}
              {data.map((post) => {
                return (
                  <li key={`blog-${post.slug}`} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
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
                              <TagLayout key={tag.id} text={tag.name} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {post.description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6 text-end">
                        <a
                          href={`/articles/${post.slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${post.title}"`}
                        >
                          Xem tiếp &rarr;
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
            <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} totalCount={totalCount} onPageChange={handlePageChange} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
