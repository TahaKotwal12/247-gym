/**
 * Custom hook and context for member authentication
 * Simple demo implementation for auth flow
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Member } from '@/types';

interface MemberContextType {
  member: Member | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [member, setMember] = useState<Member | null>(() => {
    // Check localStorage for persisted member
    const stored = localStorage.getItem('member');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = useCallback((email: string, name: string): void => {
    const newMember: Member = {
      id: `member-${Date.now()}`,
      name,
      email,
    };
    setMember(newMember);
    localStorage.setItem('member', JSON.stringify(newMember));
  }, []);

  const logout = useCallback((): void => {
    setMember(null);
    localStorage.removeItem('member');
  }, []);

  return (
    <MemberContext.Provider
      value={{
        member,
        login,
        logout,
        isAuthenticated: member !== null,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = (): MemberContextType => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};

