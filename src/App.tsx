import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { RegionLandingPage } from './pages/RegionLandingPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ActivatePage } from './pages/ActivatePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LegalPage } from './pages/LegalPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/uk" element={<RegionLandingPage targetRegion="UK" />} />
              <Route path="/ca" element={<RegionLandingPage targetRegion="CA" />} />
              <Route path="/activate" element={<ActivatePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;

