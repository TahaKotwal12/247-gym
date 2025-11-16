/**
 * Pricing page with membership plans and payment flow
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, Button, Modal } from '@/components';
import { membershipPlans } from '@/data/sampleData';

export const Pricing = (): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSelectPlan = (planId: string): void => {
    setSelectedPlan(planId);
    setIsPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handlePayment = (): void => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setSelectedPlan(null);
      }, 2000);
    }, 1500);
  };

  const selectedPlanData = membershipPlans.find((p) => p.id === selectedPlan);

  return (
    <>
      <Helmet>
        <title>Pricing & Membership | 247 Gym - The Fitness District</title>
        <meta
          name="description"
          content="Choose the perfect membership plan for your fitness journey at 247 Gym. Monthly, quarterly, and yearly options available."
        />
        <link rel="canonical" href="https://247gym.com/pricing" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Membership Plans
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary-600 dark:text-secondary-400">
            Choose the plan that fits your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hover
                padding="lg"
                className={`relative ${
                  plan.popular
                    ? 'ring-2 ring-primary-600 dark:ring-primary-400'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-neutral-100 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                      ${plan.price}
                    </span>
                    <span className="text-secondary-600 dark:text-secondary-400">
                      /{plan.period.toLowerCase()}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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
                      <span className="text-secondary-700 dark:text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Select Plan
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment Modal */}
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedPlan(null);
            setPaymentSuccess(false);
          }}
          title={paymentSuccess ? 'Payment Successful!' : 'Complete Your Membership'}
          size="md"
        >
          {paymentSuccess ? (
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
                Welcome to 247 Gym!
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Your membership has been activated. You can start using the gym
                immediately!
              </p>
            </div>
          ) : selectedPlanData ? (
            <div className="space-y-4">
              <div className="bg-secondary-50 dark:bg-secondary-900/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-secondary-700 dark:text-neutral-300">
                  Selected Plan: <span className="font-semibold">{selectedPlanData.name}</span>
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                  ${selectedPlanData.price}/{selectedPlanData.period.toLowerCase()}
                </p>
              </div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                This is a demo payment flow. In production, this would integrate
                with a payment processor like Stripe or PayPal.
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    setSelectedPlan(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" onClick={handlePayment}>
                  Complete Payment
                </Button>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </>
  );
};

