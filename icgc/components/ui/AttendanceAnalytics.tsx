import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, TrendingUp, Filter } from 'lucide-react';

export default function AttendanceAnalytics() {
  const attendanceOverTime = [
    { date: 'Dec 1', attendance: 235 },
    { date: 'Dec 2', attendance: 180 },
    { date: 'Dec 3', attendance: 220 },
    { date: 'Dec 4', attendance: 245 },
    { date: 'Dec 5', attendance: 210 },
    { date: 'Dec 6', attendance: 190 },
    { date: 'Dec 7', attendance: 260 },
    { date: 'Dec 8', attendance: 247 },
  ];

  const attendanceByAge = [
    { category: 'Children (0-12)', count: 45 },
    { category: 'Teens (13-19)', count: 38 },
    { category: 'Young Adults (20-35)', count: 92 },
    { category: 'Adults (36-60)', count: 58 },
    { category: 'Seniors (60+)', count: 14 },
  ];

  const memberFrequency = [
    { name: 'Sarah Johnson', attended: 8, total: 8, percentage: 100 },
    { name: 'Michael Brown', attended: 8, total: 8, percentage: 100 },
    { name: 'Emily Davis', attended: 7, total: 8, percentage: 88 },
    { name: 'James Wilson', attended: 7, total: 8, percentage: 88 },
    { name: 'Lisa Anderson', attended: 6, total: 8, percentage: 75 },
    { name: 'David Martinez', attended: 6, total: 8, percentage: 75 },
    { name: 'Jennifer Lee', attended: 5, total: 8, percentage: 63 },
    { name: 'Robert Taylor', attended: 4, total: 8, percentage: 50 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Attendance Analytics</h1>
          <p className="text-gray-600">Comprehensive attendance insights and trends</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date Range</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Service Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Services</option>
                <option>Sunday Service</option>
                <option>Midweek Service</option>
                <option>Prayer Meeting</option>
                <option>Youth Service</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Department</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Departments</option>
                <option>Children&apos;s Ministry</option>
                <option>Youth Ministry</option>
                <option>Choir</option>
                <option>Ushering</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                This Week
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">247</h3>
            <p className="text-gray-600">Average Attendance</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                vs Last Week
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">+12%</h3>
            <p className="text-gray-600">Growth Rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                Peak Day
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">260</h3>
            <p className="text-gray-600">Highest Attendance</p>
          </div>
        </div>

        {/* Attendance Over Time Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-gray-900 mb-4">Attendance Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <LineChart data={attendanceOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance by Age Category */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-gray-900 mb-4">Attendance by Age Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <BarChart data={attendanceByAge} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  width={150}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Attendance Frequency */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900 mb-2">Member Attendance Frequency</h2>
            <p className="text-sm text-gray-600">Based on last 8 services</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Services Attended
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {memberFrequency.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {member.attended} / {member.total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          member.percentage === 100
                            ? 'bg-green-50 text-green-700'
                            : member.percentage >= 75
                            ? 'bg-blue-50 text-blue-700'
                            : member.percentage >= 50
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {member.percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            member.percentage === 100
                              ? 'bg-green-600'
                              : member.percentage >= 75
                              ? 'bg-blue-600'
                              : member.percentage >= 50
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${member.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700">
              View All Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}