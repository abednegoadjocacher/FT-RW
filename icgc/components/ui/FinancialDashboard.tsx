import { DollarSign, TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialDashboard() {
  const weeklyData = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 800 },
    { day: 'Wed', amount: 1500 },
    { day: 'Thu', amount: 600 },
    { day: 'Fri', amount: 900 },
    { day: 'Sat', amount: 2100 },
    { day: 'Sun', amount: 5800 },
  ];

  const recentTransactions = [
    { id: 1, member: 'John Doe', type: 'First Fruit', amount: 500, date: '2025-12-08' },
    { id: 2, member: 'Jane Smith', type: 'Welfare', amount: 200, date: '2025-12-08' },
    { id: 3, member: 'Mike Johnson', type: 'Project Offering', amount: 1000, date: '2025-12-07' },
    { id: 4, member: 'Sarah Williams', type: 'First Fruit', amount: 300, date: '2025-12-07' },
    { id: 5, member: 'David Brown', type: 'Welfare', amount: 150, date: '2025-12-06' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Track offerings and contributions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                This Month
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">$12,450</h3>
            <p className="text-gray-600">First Fruit Total</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                This Month
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">$8,230</h3>
            <p className="text-gray-600">Welfare Contributions</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                This Month
              </span>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">$15,670</h3>
            <p className="text-gray-600">Project Offering</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Weekly Giving Trends</h2>
              <p className="text-sm text-gray-600">Last 7 days overview</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-900">Recent Transactions</h2>
              <div className="flex gap-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All Types</option>
                  <option>First Fruit</option>
                  <option>Welfare</option>
                  <option>Project Offering</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600">Latest financial activities</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{transaction.member}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">${transaction.amount}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}