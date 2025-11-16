/**
 * Main layout wrapper component
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

