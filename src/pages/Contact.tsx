/**
 * Contact page with form and Google Maps placeholder
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, Form, Input, Button } from '@/components';
import { sendContactMessage } from '@/services/api/mockApi';

export const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSuccess(false);

    try {
      const response = await sendContactMessage(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrors({ submit: response.message });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="Get in touch with 247 Gym - The Fitness District. We're here to answer your questions and help you start your fitness journey."
        />
        <link rel="canonical" href="https://247gym.com/contact" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary-600 dark:text-secondary-400">
            We'd love to hear from you. Get in touch!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-neutral-100 mb-6">
                Send us a Message
              </h2>
              {success && (
                <div
                  className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6"
                  role="alert"
                >
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-secondary-700 dark:text-neutral-300 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-secondary-300 dark:border-secondary-600'
                      } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-neutral-100`}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {errors.submit && (
                    <div
                      className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
                      role="alert"
                    >
                      {errors.submit}
                    </div>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card>
          </motion.div>

          {/* Map and Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-neutral-100 mb-6">
                Visit Us
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-neutral-100 mb-1">
                    Address
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    123 Fitness Street
                    <br />
                    The Fitness District
                    <br />
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-neutral-100 mb-1">
                    Contact
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Phone: (555) 247-GYM
                    <br />
                    Email: info@247gym.com
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-neutral-100 mb-1">
                    Hours
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Open 24 hours, 7 days a week
                  </p>
                </div>
              </div>
            </Card>

            {/* Google Maps Placeholder */}
            <Card padding="none" className="overflow-hidden">
              <div className="aspect-video bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                <div className="text-center text-secondary-500 dark:text-secondary-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm">Google Maps Placeholder</p>
                  <p className="text-xs mt-1">
                    Replace with actual Google Maps iframe
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

