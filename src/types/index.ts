/**
 * Type definitions for 247 Gym application
 */

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  image: string;
  experience: number;
  certifications: string[];
}

export interface Class {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  trainerId: string;
}

export interface ScheduleSlot {
  id: string;
  classId: string;
  trainerId: string;
  day: string;
  time: string;
  capacity: number;
  booked: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: 'Monthly' | 'Quarterly' | 'Yearly';
  features: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
  date: string;
}

export interface BookingRequest {
  slotId: string;
  name: string;
  email: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipPlan?: string;
}

