/**
 * ScheduleGrid component for displaying weekly class schedule
 */

import { useMemo } from 'react';
import type { ScheduleSlot } from '@/types';
import { Card } from './Card';
import { Button } from './Button';

export interface ScheduleGridProps {
  slots: ScheduleSlot[];
  classes: Array<{ id: string; name: string }>;
  trainers: Array<{ id: string; name: string }>;
  onBook?: (slotId: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ScheduleGrid = ({
  slots,
  classes,
  trainers,
  onBook,
}: ScheduleGridProps): JSX.Element => {
  const scheduleByDay = useMemo(() => {
    const grouped: Record<string, ScheduleSlot[]> = {};
    DAYS.forEach((day) => {
      grouped[day] = [];
    });
    slots.forEach((slot) => {
      const dayGroup = grouped[slot.day];
      if (dayGroup) {
        dayGroup.push(slot);
      }
    });
    // Sort slots by time
    Object.keys(grouped).forEach((day) => {
      const dayGroup = grouped[day];
      if (dayGroup) {
        dayGroup.sort((a, b) => a.time.localeCompare(b.time));
      }
    });
    return grouped;
  }, [slots]);

  const getClassName = (classId: string): string => {
    const found = classes.find((c) => c.id === classId);
    return found?.name ?? 'Unknown Class';
  };

  const getTrainerName = (trainerId: string): string => {
    const found = trainers.find((t) => t.id === trainerId);
    return found?.name ?? 'Unknown Trainer';
  };

  const getAvailability = (slot: ScheduleSlot): string => {
    const available = slot.capacity - slot.booked;
    if (available === 0) return 'Full';
    if (available <= 3) return `${available} spots left`;
    return `${available} available`;
  };

  const isFull = (slot: ScheduleSlot): boolean => {
    return slot.booked >= slot.capacity;
  };

  return (
    <div className="space-y-6">
      {DAYS.map((day) => {
        const daySlots = scheduleByDay[day];
        if (!daySlots || daySlots.length === 0) return null;

        return (
          <div key={day}>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-neutral-100 mb-3">
              {day}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {daySlots.map((slot) => (
                <Card key={slot.id} hover padding="md">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-neutral-100">
                        {getClassName(slot.classId)}
                      </h4>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {getTrainerName(slot.trainerId)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-700 dark:text-neutral-300">
                        {slot.time}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          isFull(slot)
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-primary-600 dark:text-primary-400'
                        }`}
                      >
                        {getAvailability(slot)}
                      </span>
                    </div>
                    {onBook && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        disabled={isFull(slot)}
                        onClick={() => onBook(slot.id)}
                      >
                        {isFull(slot) ? 'Full' : 'Book'}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

