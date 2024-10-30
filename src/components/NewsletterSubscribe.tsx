import React, { useState } from 'react';

const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle the email subscription logic here
    console.log('Email submitted:', email);
  };

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Subscribe to the newsletter
      </div>
      <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              autoComplete="email"
              className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
              id="email-input"
              placeholder="Enter your email"
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className="bg-primary-500 w-full rounded-md py-2 px-4 font-medium text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
