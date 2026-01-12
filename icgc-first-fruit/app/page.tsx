/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useState, useEffect } from 'react';
import SignupPage  from '@/components/SignupPage';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import PaymentPage from '@/components/PaymentPage';
import { Toaster } from 'sonner';

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};

type Page = 'login' | 'signup' | 'dashboard' | 'payment';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleSignup = (userData: User) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if phone number already exists
    const existingUser = users.find((u: User) => u.phoneNumber === userData.phoneNumber);
    if (existingUser) {
      alert('Phone number already registered');
      return;
    }

    // Add new user
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log them in
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogin = (phoneNumber: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.phoneNumber === phoneNumber && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setCurrentPage('dashboard');
    } else {
      alert('Invalid phone number or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Refresh dashboard when navigating back from payment
    if (page === 'dashboard') {
      setRefreshKey(prev => prev + 1);
    }
  };

  return (
    <div className="size-full bg-background">
      <Toaster />
      {currentPage === 'signup' && (
        <SignupPage onSignup={handleSignup} onNavigateToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onNavigateToSignup={() => setCurrentPage('signup')} />
      )}
      {currentPage === 'dashboard' && currentUser && (
        <Dashboard 
          key={refreshKey}
          user={currentUser} 
          onLogout={handleLogout}
          onNavigateToPayment={() => handleNavigate('payment')}
        />
      )}
      {currentPage === 'payment' && currentUser && (
        <PaymentPage 
          user={currentUser}
          onNavigateBack={() => handleNavigate('dashboard')}
        />
      )}
    </div>
  );
}