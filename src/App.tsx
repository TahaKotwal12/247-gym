/**
 * Main App component with routing
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/layout/Layout';
import { Home } from '@/pages/Home';

// Lazy load routes for code splitting
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Classes = lazy(() => import('@/pages/Classes').then((m) => ({ default: m.Classes })));
const Trainers = lazy(() => import('@/pages/Trainers').then((m) => ({ default: m.Trainers })));
const Schedule = lazy(() => import('@/pages/Schedule').then((m) => ({ default: m.Schedule })));
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

const LoadingSpinner = (): JSX.Element => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4" />
      <p className="text-secondary-600 dark:text-secondary-400">Loading...</p>
    </div>
  </div>
);

export const App = (): JSX.Element => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

