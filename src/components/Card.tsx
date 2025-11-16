/**
 * Card component for displaying content in a contained box
 */

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export const Card = ({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps): JSX.Element => {
  const baseStyles =
    'bg-secondary-800 rounded-xl shadow-md overflow-hidden';

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  };

  const Component = hover ? motion.div : 'div';
  const motionProps = hover
    ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      className={`${baseStyles} ${paddings[padding]} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

