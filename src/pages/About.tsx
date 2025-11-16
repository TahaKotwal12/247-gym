/**
 * About page with gym information and values
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card } from '@/components';

export const About = (): JSX.Element => {
  const values = [
    {
      title: '24/7 Access',
      description:
        'Train on your schedule. Our facilities are open around the clock, so you can work out whenever it fits your life.',
      icon: '🕐',
    },
    {
      title: 'Expert Trainers',
      description:
        'Our experienced trainers bring years of expertise and passion to help you achieve your fitness goals safely and effectively.',
      icon: '💪',
    },
    {
      title: 'Community Focus',
      description:
        'Join a supportive community of 296+ members who motivate and inspire each other on their fitness journeys.',
      icon: '👥',
    },
    {
      title: 'Flexible Hours',
      description:
        'Life is busy. That\'s why we\'re open 24 hours a day, 7 days a week, so you never have to miss a workout.',
      icon: '⚡',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="Learn about 247 Gym - The Fitness District. Our mission, values, and commitment to providing 24/7 fitness access with expert trainers."
        />
        <link rel="canonical" href="https://247gym.com/about" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            About 247 Gym
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            The Fitness District
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card padding="lg">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-neutral-100 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-secondary-700 dark:text-neutral-300 mb-4">
              At 247 Gym - The Fitness District, we believe fitness should be
              accessible to everyone, on their own schedule. That's why we're
              open 24 hours a day, 7 days a week, providing a welcoming
              environment where members can pursue their fitness goals at any
              time.
            </p>
            <p className="text-lg text-secondary-700 dark:text-neutral-300">
              With a 4.5-star rating from 296 members, we're proud to be the
              fitness destination that fits your life. Our experienced trainers,
              diverse class offerings, and state-of-the-art facilities create a
              community where everyone can thrive.
            </p>
          </Card>
        </motion.section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-neutral-100 text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card hover>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-neutral-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary-600 dark:bg-primary-800 rounded-xl p-8 lg:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">296+</div>
              <div className="text-sm sm:text-base text-primary-100">Active Members</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">4.5</div>
              <div className="text-sm sm:text-base text-primary-100">Star Rating</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm sm:text-base text-primary-100">Open Hours</div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

