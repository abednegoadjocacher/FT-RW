'use client';
import { useState } from 'react';
import  AdminDashboard  from '@/components/AdminDashboard';
import  ApplicantPortal  from '@/components/ApplicantPortal';
import { Shield, UserPlus, Eye, EyeOff } from 'lucide-react';
import { Toaster } from 'sonner';

type View = 'admin' | 'applicant';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('applicant');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin authentication (in production, use proper authentication)
    if (adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
    } else {
      alert('Invalid password. Try: admin123');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPassword('');
  };

  const views = [
    { id: 'applicant' as View, label: 'Apply Now', icon: UserPlus },
    { id: 'admin' as View, label: 'Admin Login', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-neutral-900">AGBOFAH CLOTHING</h1>
              <p className="text-neutral-500 text-sm mt-1">Training Program Application System</p>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-2 items-center">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === view.id
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{view.label}</span>
                  </button>
                );
              })}
              {isAdminLoggedIn && currentView === 'admin' && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    currentView === view.id
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{view.label}</span>
                </button>
              );
            })}
            {isAdminLoggedIn && currentView === 'admin' && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm whitespace-nowrap"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentView === 'applicant' && <ApplicantPortal />}
        {currentView === 'admin' && (
          <>
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl p-8 border border-neutral-200">
                  <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-neutral-900 mb-2 text-center">Admin Login</h2>
                  <p className="text-neutral-600 mb-6 text-center text-sm">
                    Enter your password to access the admin dashboard
                  </p>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-neutral-700 mb-2 text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Enter admin password"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Login
                    </button>
                    <p className="text-neutral-500 text-xs text-center">
                      Demo password: admin123
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <AdminDashboard onLogout={handleLogout} />
            )}
          </>
        )}
      </main>
    </div>
  );
}