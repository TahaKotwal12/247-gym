/**
 * Footer component with links and contact information
 */

import { Link } from 'react-router-dom';

export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-secondary-900 dark:bg-black text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              247 Gym - The Fitness District
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 mb-3 sm:mb-4">
              Your 24/7 fitness destination. Rated 4.5 stars by 296 members.
              Open around the clock to fit your schedule.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-green-400">
                Open 24 hours
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/classes"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/trainers"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Trainers
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              <li className="text-sm">
                Email: info@247gym.com
              </li>
              <li className="text-sm">
                Phone: (555) 247-GYM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} 247 Gym - The Fitness District.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

