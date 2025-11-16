/**
 * Trainers page displaying all fitness trainers
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, Avatar } from '@/components';
import { trainers } from '@/data/sampleData';

export const Trainers = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Trainers | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="Meet our expert fitness trainers at 247 Gym. Experienced professionals ready to help you achieve your goals."
        />
        <link rel="canonical" href="https://247gym.com/trainers" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Meet Our Trainers
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            Experienced professionals dedicated to your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover padding="lg">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar src={trainer.image} alt={trainer.name} size="xl" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-neutral-100 mb-2">
                      {trainer.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {trainer.specialization}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {trainer.bio}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">
                        <span className="font-medium">Experience:</span>{' '}
                        {trainer.experience} years
                      </div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">
                        <span className="font-medium">Certifications:</span>{' '}
                        {trainer.certifications.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

