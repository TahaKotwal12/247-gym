/**
 * Mock API service for 247 Gym
 * Simulates backend API calls with setTimeout for latency
 */

import type {
  Trainer,
  ScheduleSlot,
  BookingRequest,
  BookingResponse,
  ContactRequest,
  ContactResponse,
} from '@/types';
import { trainers, schedule } from '@/data/sampleData';

const API_DELAY = 500; // milliseconds

/**
 * Simulates API latency
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/trainers
 * Returns all trainers
 */
export const getTrainers = async (): Promise<Trainer[]> => {
  await delay(API_DELAY);
  return Promise.resolve(trainers);
};

/**
 * GET /api/schedule
 * Returns weekly schedule
 */
export const getSchedule = async (): Promise<ScheduleSlot[]> => {
  await delay(API_DELAY);
  return Promise.resolve(schedule);
};

/**
 * POST /api/book
 * Books a class slot
 * Randomly fails 10% of the time to simulate seat-unavailable errors
 */
export const bookClass = async (
  request: BookingRequest,
): Promise<BookingResponse> => {
  await delay(API_DELAY);

  // Simulate random failure (10% chance)
  if (Math.random() < 0.1) {
    return Promise.resolve({
      success: false,
      message: 'Sorry, this slot is fully booked. Please try another time.',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(request.email)) {
    return Promise.resolve({
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  // Check if slot exists and has capacity
  const slot = schedule.find((s) => s.id === request.slotId);
  if (!slot) {
    return Promise.resolve({
      success: false,
      message: 'Invalid class slot selected.',
    });
  }

  if (slot.booked >= slot.capacity) {
    return Promise.resolve({
      success: false,
      message: 'Sorry, this slot is fully booked. Please try another time.',
    });
  }

  // Simulate successful booking
  const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return Promise.resolve({
    success: true,
    message: 'Your class has been booked successfully!',
    bookingId,
  });
};

/**
 * POST /api/contact
 * Sends contact form message
 */
export const sendContactMessage = async (
  request: ContactRequest,
): Promise<ContactResponse> => {
  await delay(API_DELAY);

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(request.email)) {
    return Promise.resolve({
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  // Validate required fields
  if (!request.name || !request.subject || !request.message) {
    return Promise.resolve({
      success: false,
      message: 'Please fill in all required fields.',
    });
  }

  // Simulate successful submission
  return Promise.resolve({
    success: true,
    message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
  });
};

