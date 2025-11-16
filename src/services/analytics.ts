/**
 * Analytics stub for tracking page views and events
 * Replace with actual analytics service (Google Analytics, Mixpanel, etc.)
 */

export const trackPageView = (path: string): void => {
  // Stub implementation
  if (import.meta.env.DEV) {
    console.log('[Analytics] Page view:', path);
  }
  // In production, replace with:
  // gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
  // or
  // mixpanel.track('Page View', { path });
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>): void => {
  // Stub implementation
  if (import.meta.env.DEV) {
    console.log('[Analytics] Event:', eventName, properties);
  }
  // In production, replace with:
  // gtag('event', eventName, properties);
  // or
  // mixpanel.track(eventName, properties);
};

export const trackBooking = (slotId: string, className: string): void => {
  trackEvent('Class Booked', { slotId, className });
};

export const trackContactSubmit = (): void => {
  trackEvent('Contact Form Submitted');
};

export const trackMembershipSelect = (planId: string): void => {
  trackEvent('Membership Plan Selected', { planId });
};

