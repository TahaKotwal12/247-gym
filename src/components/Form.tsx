/**
 * Form component wrapper with validation
 */

import { FormHTMLAttributes, ReactNode } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({
  children,
  onSubmit,
  className = '',
  ...props
}: FormProps): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className} {...props}>
      {children}
    </form>
  );
};

