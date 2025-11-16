/**
 * BookingModal component for booking class slots
 */

import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { Form } from './Form';
import { bookClass } from '@/services/api/mockApi';
import type { ScheduleSlot } from '@/types';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ScheduleSlot | null;
  className?: string;
}

export const BookingModal = ({
  isOpen,
  onClose,
  slot,
  className = '',
}: BookingModalProps): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setName('');
      setEmail('');
      setErrors({});
      setSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate() || !slot) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await bookClass({
        slotId: slot.id,
        name: name.trim(),
        email: email.trim(),
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          // Could trigger a refresh of schedule data here
        }, 2000);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!slot) {
    return <></>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Class"
      size="md"
      className={className}
    >
      {success ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-neutral-100 mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            Your class has been booked successfully. We'll send a confirmation email shortly.
          </p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="bg-secondary-50 dark:bg-secondary-900/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-secondary-700 dark:text-neutral-300">
                Class: <span className="font-semibold">{className}</span>
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                {slot.day} at {slot.time}
              </p>
            </div>

            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
              autoComplete="name"
              aria-label="Full name"
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              autoComplete="email"
              aria-label="Email address"
            />

            {errorMessage && (
              <div
                className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                isLoading={isLoading}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

