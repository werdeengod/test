import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Article from './pages/Article/Article';
import Articles from './pages/Articles/Articles';

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </Suspense>
  );
}

export default App;
