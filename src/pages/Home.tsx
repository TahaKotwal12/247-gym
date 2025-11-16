/**
 * Home page with hero section, featured classes, and testimonials
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button, Card } from '@/components';
import { testimonials, classes } from '@/data/sampleData';

export const Home = (): JSX.Element => {
  const featuredClasses = classes.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>247 Gym - The Fitness District | 24/7 Fitness Center</title>
        <meta
          name="description"
          content="247 Gym - The Fitness District: Open 24 hours, rated 4.5 stars by 296 members. Join our fitness community with expert trainers and diverse classes."
        />
        <link rel="canonical" href="https://247gym.com/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')] opacity-20 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm sm:text-base font-semibold">4.5</span>
                <span className="text-xs sm:text-sm opacity-90 hidden sm:inline">(296 reviews)</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Open 24 hours</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              247 Gym
              <br />
              <span className="text-primary-200">The Fitness District</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8">
              Your 24/7 fitness destination. Train anytime, anywhere. Join a
              community of 296+ members achieving their fitness goals with
              expert trainers and state-of-the-art facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/classes" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Classes
                </Button>
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20">
                  Join Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-12 sm:py-16 bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-2 sm:mb-4">
              Featured Classes
            </h2>
            <p className="text-sm sm:text-base text-secondary-400">
              Discover our most popular fitness classes
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                    {classItem.name}
                  </h3>
                  <p className="text-secondary-400 mb-4">
                    {classItem.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-400">
                      {classItem.duration} min
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        classItem.difficulty === 'Beginner'
                          ? 'bg-green-900/30 text-green-400'
                          : classItem.difficulty === 'Intermediate'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {classItem.difficulty}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/classes">
              <Button variant="primary">View All Classes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-2 sm:mb-4">
              What Our Members Say
            </h2>
            <p className="text-sm sm:text-base text-secondary-400">
              Rated 4.5 stars by 296 members
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-neutral-100">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'text-accent-500'
                                : 'text-secondary-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-300 italic">
                    "{testimonial.text}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

