/**
 * 404 Not Found page
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components';

export const NotFound = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | 247 Gym - The Fitness District</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-neutral-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary-600 dark:text-secondary-400 mb-6 sm:mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

