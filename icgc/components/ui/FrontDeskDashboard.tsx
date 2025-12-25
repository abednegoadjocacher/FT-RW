import { Users, Clock, QrCode, List, ChevronRight } from 'lucide-react';

interface FrontDeskDashboardProps {
  onNavigate: (screen: string) => void;
}

export default function FrontDeskDashboard({ onNavigate }: FrontDeskDashboardProps) {
  const recentScans = [
    { id: 1, name: 'Sarah Johnson', time: '09:45 AM', status: 'checked-in' },
    { id: 2, name: 'Michael Brown', time: '09:42 AM', status: 'checked-in' },
    { id: 3, name: 'Emily Davis', time: '09:38 AM', status: 'checked-in' },
    { id: 4, name: 'James Wilson', time: '09:35 AM', status: 'checked-in' },
    { id: 5, name: 'Lisa Anderson', time: '09:30 AM', status: 'checked-in' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Front Desk Dashboard</h1>
          <p className="text-gray-600">Monitor attendance and service status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Total Attendance Today */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                +12 from last week
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">247</h3>
            <p className="text-gray-600">Total Attendance Today</p>
          </div>

          {/* Service Timer */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                In Progress
              </span>
            </div>
            <h3 className="text-3xl mb-1">1h 23m</h3>
            <p className="text-green-100">Service Duration</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => onNavigate('scanner')}
            className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="mb-1">Scan Attendance</h3>
                <p className="text-sm text-green-100">Record member check-in</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="bg-white p-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-between group border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <List className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900 mb-1">View Member List</h3>
                <p className="text-sm text-gray-600">Browse all members</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Recent Scanned Members */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Recent Check-ins</h2>
            <p className="text-sm text-gray-600">Latest members scanned</p>
          </div>

          <div className="divide-y divide-gray-100">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-green-700">
                    {scan.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{scan.name}</p>
                  <p className="text-sm text-gray-500">{scan.time}</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700">
              View All Check-ins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
