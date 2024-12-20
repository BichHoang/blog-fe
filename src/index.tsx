import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './layouts/ErrorPage';
import Home from './layouts/Home';
import reportWebVitals from './reportWebVitals';
import Article from './layouts/Article';
import Tags from './layouts/Tags';
import Blog from './layouts/Blog';
import About from './layouts/About';
import Questions from './layouts/Questions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home  />,
      },
      {
        path: "/articles/:slug",
        element: <Article />,
      },
      {
        path: "/tags",
        element: <Tags />,
      },
      {
        path: "/tags/:slug",
        element: <Blog />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
