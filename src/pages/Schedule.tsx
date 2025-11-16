/**
 * Schedule page displaying weekly class schedule with booking functionality
 */

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ScheduleGrid, BookingModal } from '@/components';
import { getSchedule } from '@/services/api/mockApi';
import { classes, trainers } from '@/data/sampleData';
import type { ScheduleSlot } from '@/types';

export const Schedule = (): JSX.Element => {
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const loadSchedule = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const scheduleData = await getSchedule();
        setSlots(scheduleData);
      } catch (error) {
        console.error('Failed to load schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedule();
  }, []);

  const handleBook = (slotId: string): void => {
    const slot = slots.find((s) => s.id === slotId);
    if (slot) {
      setSelectedSlot(slot);
      setIsBookingModalOpen(true);
    }
  };

  const getClassName = (classId: string): string => {
    return classes.find((c) => c.id === classId)?.name || 'Unknown Class';
  };

  return (
    <>
      <Helmet>
        <title>Schedule | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="View and book fitness classes at 247 Gym. Check our weekly schedule and reserve your spot."
        />
        <link rel="canonical" href="https://247gym.com/schedule" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Class Schedule
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            Book your spot in our weekly classes
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            <p className="mt-4 text-secondary-600 dark:text-secondary-400">
              Loading schedule...
            </p>
          </div>
        ) : (
          <ScheduleGrid
            slots={slots}
            classes={classes.map((c) => ({ id: c.id, name: c.name }))}
            trainers={trainers.map((t) => ({ id: t.id, name: t.name }))}
            onBook={handleBook}
          />
        )}

        {selectedSlot && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedSlot(null);
            }}
            slot={selectedSlot}
            className={getClassName(selectedSlot.classId)}
          />
        )}
      </div>
    </>
  );
};

