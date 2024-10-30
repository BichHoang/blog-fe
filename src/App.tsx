import './App.css';
import { Header, Footer } from './components';
import Home from './layouts/Home';

function App() {
  const samplePosts = [
    {
      slug: 'my-first-post',
      date: '2024-01-01',
      title: 'My First Post',
      summary: 'This is a summary of my first post.',
      tags: ['tag1', 'tag2'],
    },
    {
      slug: 'my-second-post',
      date: '2024-11-02',
      title: 'My Second Post',
      summary: 'This is a summary of my second post.',
      tags: ['tag2', 'tag3'],
    },
    {
      slug: 'my-third-post',
      date: '2024-11-02',
      title: 'My Third Post',
      summary: 'This is a summary of my third post.',
      tags: ['tag2', 'tag3'],
    },
    // Add more sample posts as needed
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Header />
      <Home posts={samplePosts} />
      <Footer />
    </div>
  );
}

export default App;
