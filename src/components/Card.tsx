/**
 * Card component for displaying content in a contained box
 */

import { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type CardBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  style?: React.CSSProperties;
};

export interface CardProps extends CardBaseProps {
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

  const motionProps = hover
    ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
        transition: { duration: 0.2 },
      }
    : {};

  if (hover) {
    return (
      <motion.div
        className={`${baseStyles} ${paddings[padding]} ${className}`}
        {...motionProps}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${baseStyles} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

