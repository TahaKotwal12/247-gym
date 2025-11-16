/**
 * Avatar component for displaying user/trainer images
 */

import { HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  className = '',
  ...props
}: AvatarProps): JSX.Element => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden bg-secondary-200 dark:bg-secondary-700 flex-shrink-0 ${className}`}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

