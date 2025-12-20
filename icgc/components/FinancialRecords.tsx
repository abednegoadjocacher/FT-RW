import { useState } from 'react';
import { DollarSign, TrendingUp, Download, Search, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialRecords() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const weeklyTotals = [
    { period: 'Week 1', total: 8500 },
    { period: 'Week 2', total: 9200 },
    { period: 'Week 3', total: 10100 },
    { period: 'Week 4', total: 8650 },
  ];

  const categoryBreakdown = [
    { category: 'First Fruit', amount: 12450 },
    { category: 'Welfare', amount: 8230 },
    { category: 'Project', amount: 15670 },
    { category: 'Tithes', amount: 18900 },
  ];

  const transactions = [
    {
      id: 1,
      date: '2025-12-08',
      time: '09:45 AM',
      member: 'John Doe',
      type: 'First Fruit',
      amount: 500,
      method: 'MoMo',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-12-08',
      time: '10:12 AM',
      member: 'Jane Smith',
      type: 'Welfare',
      amount: 200,
      method: 'Cash',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2025-12-08',
      time: '10:30 AM',
      member: 'Mike Johnson',
      type: 'Project Offering',
      amount: 1000,
      method: 'MoMo',
      status: 'Completed',
    },
    {
      id: 4,
      date: '2025-12-07',
      time: '09:20 AM',
      member: 'Sarah Williams',
      type: 'First Fruit',
      amount: 300,
      method: 'Transfer',
      status: 'Completed',
    },
    {
      id: 5,
      date: '2025-12-07',
      time: '11:15 AM',
      member: 'David Brown',
      type: 'Tithes',
      amount: 750,
      method: 'Cash',
      status: 'Completed',
    },
    {
      id: 6,
      date: '2025-12-06',
      time: '08:45 AM',
      member: 'Emily Davis',
      type: 'Welfare',
      amount: 150,
      method: 'MoMo',
      status: 'Completed',
    },
  ];

  const topGivers = [
    { name: 'Sarah Johnson', amount: 2400, frequency: 8 },
    { name: 'Michael Brown', amount: 2200, frequency: 8 },
    { name: 'David Martinez', amount: 1950, frequency: 7 },
    { name: 'Emily Davis', amount: 1800, frequency: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Financial Records Overview</h1>
          <p className="text-gray-600">Comprehensive financial tracking and reports</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-2 p-2">
              <button
                onClick={() => setActiveTab('daily')}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'daily'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'weekly'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'monthly'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Giving</p>
              <h3 className="text-3xl text-gray-900 mb-1">$36,350</h3>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+8% from last period</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <h3 className="text-3xl text-gray-900 mb-1">247</h3>
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12 from last period</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Average Contribution</p>
              <h3 className="text-3xl text-gray-900 mb-1">$147</h3>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <TrendingUp className="w-4 h-4" />
                <span>+5% from last period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Total Giving Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">Giving Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                <LineChart data={weeklyTotals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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
                    dataKey="total"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ fill: '#16a34a', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">Breakdown by Category</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                <BarChart data={categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="amount" fill="#16a34a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Most Consistent Givers */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Most Consistent Givers</h2>
              <p className="text-sm text-gray-600">Top contributors this month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topGivers.map((giver, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm text-green-700">
                      {giver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">#{index + 1}</span>
                  </div>
                </div>
                <p className="text-gray-900 mb-1">{giver.name}</p>
                <p className="text-2xl text-green-600 mb-1">${giver.amount}</p>
                <p className="text-xs text-gray-600">{giver.frequency} contributions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-gray-900 mb-2">Transaction History</h2>
                <p className="text-sm text-gray-600">Complete record of all financial activities</p>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{transaction.date}</p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{transaction.member}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{transaction.method}</td>
                    <td className="px-6 py-4 text-gray-900">${transaction.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700">
              Load More Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}   