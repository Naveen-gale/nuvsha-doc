import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DocsPage } from './components/DocsPage';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/*" element={
          <Layout>
            <DocsPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
