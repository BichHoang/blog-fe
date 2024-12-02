import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest, formatDate, convertKeysToCamelCase } from '../utils';
import { Post } from '../types/interfaces';
import siteMetadata from '../data/siteMetadata';
import { Header, Footer, SectionContainer, PageTitle, Comments } from '../components';

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPostDetails(slug);
    }
  }, [slug]);

  const fetchPostDetails = (slug: string) => {
    const endpoint = `articles/${slug}`;
    getRequest(
      endpoint,
      setData,
      setError,
    );
  };

  function setData(post: any) {
    setPost(convertKeysToCamelCase(post));
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <Header />
        <SectionContainer>
          <article>
            <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
              <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                  <dl className="space-y-10">
                    <div>
                      <dt className="sr-only">Đăng vào: </dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt, siteMetadata.locale)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div>
                    <PageTitle>{post.title}</PageTitle>
                  </div>
                </div>
              </header>
              <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                {/* <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                                    <dt className="sr-only">Authors</dt>
                                    <dd>
                                        <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                            Author
                                        </ul>
                                    </dd>
                                </dl> */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose max-w-none pb-8 pt-10 dark:prose-invert"></div>
                  <Comments comments={post.comments} />
                </div>
                <footer>
                  <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Chuyên Mục</h2>
                      <div className="flex flex-wrap">
                        {post.tags.map((tag) => (
                          <a key={`article-${tag.id}`} className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href={`/tags/${tag.name}`}>{tag.name}</a>
                        ))}
                      </div>
                    </div>
                    {/* <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Bài viết liên quan</h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <a className="break-words" href="/blog/new-features-in-v1">To do</a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="pt-4 xl:pt-8">
                    <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Back to the blog" href="/blog">← Trở về trang Tin Tức</a>
                  </div>
                </footer>
              </div>
            </div>
          </article>
        </SectionContainer>
        <Footer />
      </div>
    </>
  );
};

export default Article;
