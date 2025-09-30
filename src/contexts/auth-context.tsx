
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserType = 'Patient' | 'Hospital' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  isLoading: boolean;
  login: (userType: UserType, path: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to simulate a network request
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
      const storedUserType = localStorage.getItem('userType') as UserType;
      setIsLoggedIn(loggedInStatus);
      setUserType(storedUserType);
    } catch (error) {
      // localStorage is not available (e.g., in server-side rendering or private browsing)
      console.warn("Could not access localStorage. Auth state will not be persisted.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (userType: UserType, path: string) => {
    // Simulate network delay
    await sleep(1000);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType || '');
    setIsLoggedIn(true);
    setUserType(userType);
    router.push(path);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

    