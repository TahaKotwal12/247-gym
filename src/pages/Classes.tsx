/**
 * Classes page displaying all available fitness classes
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card } from '@/components';
import { classes, trainers } from '@/data/sampleData';

export const Classes = (): JSX.Element => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filteredClasses =
    selectedDifficulty === 'All'
      ? classes
      : classes.filter((c) => c.difficulty === selectedDifficulty);

  const getTrainerName = (trainerId: string): string => {
    return trainers.find((t) => t.id === trainerId)?.name || 'Unknown Trainer';
  };

  return (
    <>
      <Helmet>
        <title>Classes | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="Browse all fitness classes at 247 Gym. From beginner to advanced, find the perfect class for your fitness level."
        />
        <link rel="canonical" href="https://247gym.com/classes" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Our Classes
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            Find the perfect class for your fitness level
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-neutral-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem, index) => (
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
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-neutral-100 mb-2">
                  {classItem.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {classItem.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-500 dark:text-secondary-400">
                      Trainer: {getTrainerName(classItem.trainerId)}
                    </span>
                    <span className="text-secondary-500 dark:text-secondary-400">
                      {classItem.duration} min
                    </span>
                  </div>
                  <span
                    className={`inline-block text-sm px-3 py-1 rounded ${
                      classItem.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : classItem.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {classItem.difficulty}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

