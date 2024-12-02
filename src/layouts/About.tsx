
import {Header, Footer } from '../components';

const About: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <Header />
        <div>About page</div>
        <Footer />
      </div>
    </>
  );
} 

export default About;
