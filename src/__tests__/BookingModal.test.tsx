/**
 * Test for BookingModal input validation
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingModal } from '@/components/BookingModal';
import type { ScheduleSlot } from '@/types';

const mockSlot: ScheduleSlot = {
  id: 'slot-1',
  classId: 'class-1',
  trainerId: 'trainer-1',
  day: 'Monday',
  time: '06:00',
  capacity: 20,
  booked: 12,
};

const renderWithProviders = (ui: React.ReactElement): void => {
  render(
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>,
  );
};

describe('BookingModal', () => {
  it('validates inputs before submission', async () => {
    const onClose = jest.fn();
    renderWithProviders(
      <BookingModal
        isOpen={true}
        onClose={onClose}
        slot={mockSlot}
        className="Test Class"
      />,
    );

    const submitButton = screen.getByText(/Confirm Booking/i);
    fireEvent.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderWithProviders(
      <BookingModal
        isOpen={true}
        onClose={onClose}
        slot={mockSlot}
        className="Test Class"
      />,
    );

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByText(/Confirm Booking/i);
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
    });
  });
});

