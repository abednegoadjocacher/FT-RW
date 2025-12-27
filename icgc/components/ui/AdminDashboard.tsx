import { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingUp, TrendingDown, Search, Bell, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTransactions, getAssets } from '@/utils/shareData';
import { AdminDashboardProps } from '@/interface';

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [transactions, setTransactions] = useState(getTransactions());
  const [assets, setAssets] = useState(getAssets());

  // Refresh data when component mounts or when navigating back
  useEffect(() => {
    const handleFocus = () => {
      setTransactions(getTransactions());
      setAssets(getAssets());
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Calculate Financial Statistics
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const currentMonthRevenue = transactions
    .filter(t => t.month === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate previous month for comparison
  const prevMonthDate = new Date();
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const prevMonth = prevMonthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const prevMonthRevenue = transactions
    .filter(t => t.month === prevMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const revenueGrowth = prevMonthRevenue > 0 
    ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1)
    : '0.0';

  // Offering breakdown
  const firstFruitTotal = transactions.filter(t => t.type === 'First Fruit').reduce((sum, t) => sum + t.amount, 0);
  const welfareTotal = transactions.filter(t => t.type === 'Welfare').reduce((sum, t) => sum + t.amount, 0);
  const projectTotal = transactions.filter(t => t.type === 'Project').reduce((sum, t) => sum + t.amount, 0);

  // Calculate Asset Statistics
  const totalAssets = assets.length;
  const totalAssetValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalPurchaseValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0);
  const assetValueChange = totalPurchaseValue > 0
    ? ((totalAssetValue - totalPurchaseValue) / totalPurchaseValue * 100).toFixed(1)
    : '0.0';

  // Asset condition breakdown
  const excellentAssets = assets.filter(a => a.condition === 'Excellent').length;
  const goodAssets = assets.filter(a => a.condition === 'Good').length;
  const fairAssets = assets.filter(a => a.condition === 'Fair').length;
  const poorAssets = assets.filter(a => a.condition === 'Poor').length;

  // Categories breakdown
  const categoryCounts = assets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Offering breakdown data for chart
  const offeringData = [
    { name: 'First Fruit', value: firstFruitTotal, color: '#16a34a' },
    { name: 'Welfare', value: welfareTotal, color: '#3b82f6' },
    { name: 'Project', value: projectTotal, color: '#a855f7' },
  ];

  // Asset condition data for chart
  const assetConditionData = [
    { name: 'Excellent', value: excellentAssets, color: '#16a34a' },
    { name: 'Good', value: goodAssets, color: '#3b82f6' },
    { name: 'Fair', value: fairAssets, color: '#f59e0b' },
    { name: 'Poor', value: poorAssets, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Top asset categories for chart
  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([category, count]) => ({
      category: category.length > 15 ? category.substring(0, 15) + '...' : category,
      count,
    }));

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search records, assets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Real-time overview of Assets and Financial Records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">${totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">Total Revenue</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              {parseFloat(revenueGrowth) >= 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">+{revenueGrowth}% from last month</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">{revenueGrowth}% from last month</span>
                </>
              )}
            </div>
          </div>

          {/* Current Month Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">${currentMonthRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">This Month</p>
            <div className="mt-2 text-sm text-gray-500">
              {transactions.filter(t => t.month === currentMonth).length} transactions
            </div>
          </div>

          {/* Total Assets */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">{totalAssets}</h3>
            <p className="text-gray-600">Total Assets</p>
            <div className="mt-2 text-sm text-gray-500">
              {Object.keys(categoryCounts).length} categories
            </div>
          </div>

          {/* Total Asset Value */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl text-gray-900 mb-1">${totalAssetValue.toLocaleString()}</h3>
            <p className="text-gray-600">Asset Value</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              {parseFloat(assetValueChange) >= 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">+{assetValueChange}% value increase</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">{assetValueChange}% depreciation</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Offering Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Offering Breakdown</h2>
              <button
                onClick={() => onNavigate('records')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={offeringData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `$${entry.value.toLocaleString()}`}
                  >
                    {offeringData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => {
                  if (value === undefined) return '$0';
                  return `$${value.toLocaleString()}`;
                  }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Top Asset Categories</h2>
              <button
                onClick={() => onNavigate('assets')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#16a34a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Recent Transactions</h2>
              <button
                onClick={() => onNavigate('records')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'First Fruit' ? 'bg-green-100' :
                        transaction.type === 'Welfare' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <DollarSign className={`w-5 h-5 ${
                          transaction.type === 'First Fruit' ? 'text-green-600' :
                          transaction.type === 'Welfare' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{transaction.member}</p>
                        <p className="text-xs text-gray-500">{transaction.type} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">${transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{transaction.method}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No transactions yet</p>
              )}
            </div>
          </div>

          {/* Asset Condition Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Asset Condition</h2>
              <button
                onClick={() => onNavigate('assets')}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            {assetConditionData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetConditionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={(entry) => `${entry.value}`}
                    >
                      {assetConditionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-16">No assets yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('records')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-900">Financial Records</p>
            </button>

            <button
              onClick={() => onNavigate('assets')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-900">Asset Management</p>
            </button>

            <button
              onClick={() => onNavigate('financial')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-900">Financial Dashboard</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-900">View Reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
