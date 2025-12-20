'use client';
import { useState } from 'react';
import { Home, Users, DollarSign, BarChart3, QrCode, CheckCircle, FileText, Menu, X } from 'lucide-react';
import AttendanceScanner from "@/components/AttendanceScanner";
import FrontDeskDashboard from "@/components/FrontDeskDashboard";
import FinancialDashboard from "@/components/FinancialDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import PaymentVerification from "@/components/PaymentVerification";
import AttendanceAnalytics from "@/components/AttendanceAnalytics";
import FinancialRecords from "@/components/FinancialRecords";

export default function home() {
  const [activeScreen, setActiveScreen] = useState('admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'admin', label: 'Admin Dashboard', icon: Home },
    { id: 'scanner', label: 'Attendance Scanner', icon: QrCode },
    { id: 'frontdesk', label: 'Front Desk', icon: Users },
    { id: 'financial', label: 'Financial Dashboard', icon: DollarSign },
    { id: 'verification', label: 'Payment Verification', icon: CheckCircle },
    { id: 'analytics', label: 'Attendance Analytics', icon: BarChart3 },
    { id: 'records', label: 'Financial Records', icon: FileText },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'scanner':
        return <AttendanceScanner />;
      case 'frontdesk':
        return <FrontDeskDashboard onNavigate={setActiveScreen} />;
      case 'financial':
        return <FinancialDashboard />;
      case 'admin':
        return <AdminDashboard onNavigate={setActiveScreen} />;
      case 'verification':
        return <PaymentVerification />;
      case 'analytics':
        return <AttendanceAnalytics />;
      case 'records':
        return <FinancialRecords />;
      default:
        return <AdminDashboard onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Church Admin</h1>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeScreen === item.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-600">AD</span>
            </div>
            <div>
              <p className="text-sm text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@church.org</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-gray-900">Church Admin</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveScreen(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeScreen === item.id
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pt-0 pt-16">
        {renderScreen()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around p-2">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  activeScreen === item.id
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
