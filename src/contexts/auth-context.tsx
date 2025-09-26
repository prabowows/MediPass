'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserType = 'Patient' | 'Hospital' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  login: (userType: UserType, path: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType') as UserType;
    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);
    setLoading(false);
  }, []);

  const login = (userType: UserType, path: string) => {
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

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
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
