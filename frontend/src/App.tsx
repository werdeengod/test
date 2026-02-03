import { Route, Routes } from 'react-router';
import { Suspense } from 'react';
import Articles from './pages/Articles/Articles';
import Article from './pages/Article/Article';

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
