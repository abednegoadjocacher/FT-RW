'use client'
import { Plus, Bell, Package, Ruler, Clock } from 'lucide-react';

const activeOrders = [
  {
    id: 'ORD-001',
    item: 'Custom Suit',
    status: 'Sewing',
    progress: 60,
    dueDate: 'Dec 15, 2025',
    stages: [
      { name: 'Cutting', completed: true },
      { name: 'Sewing', completed: false },
      { name: 'Finishing', completed: false },
      { name: 'Ready', completed: false },
    ],
  },
  {
    id: 'ORD-002',
    item: 'Evening Dress',
    status: 'Finishing',
    progress: 85,
    dueDate: 'Dec 12, 2025',
    stages: [
      { name: 'Cutting', completed: true },
      { name: 'Sewing', completed: true },
      { name: 'Finishing', completed: false },
      { name: 'Ready', completed: false },
    ],
  },
  {
    id: 'ORD-003',
    item: 'Shirt & Trousers',
    status: 'Cutting',
    progress: 25,
    dueDate: 'Dec 20, 2025',
    stages: [
      { name: 'Cutting', completed: false },
      { name: 'Sewing', completed: false },
      { name: 'Finishing', completed: false },
      { name: 'Ready', completed: false },
    ],
  },
];

const measurements = [
  { date: 'Nov 28, 2025', type: 'Suit', chest: '40"', waist: '34"', shoulder: '18"' },
  { date: 'Oct 15, 2025', type: 'Shirt', chest: '39"', waist: '33"', shoulder: '17.5"' },
];

const notifications = [
  { id: 1, message: 'Your Evening Dress is ready for final fitting', time: '2 hours ago', unread: true },
  { id: 2, message: 'Custom Suit moved to Sewing stage', time: '1 day ago', unread: true },
  { id: 3, message: 'New promotion: 20% off on all shirts', time: '3 days ago', unread: false },
];

export default function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-neutral-900 mb-2">Welcome back, John!</h2>
        <p className="text-neutral-600">Track your orders and manage your measurements</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <button className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Place New Order
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Active Orders
            </h3>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl p-6 border border-neutral-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-neutral-900">{order.item}</h4>
                      <p className="text-neutral-500 text-sm mt-1">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                        {order.status}
                      </span>
                      <p className="text-neutral-500 text-sm mt-2 flex items-center gap-1 justify-end">
                        <Clock className="w-4 h-4" />
                        {order.dueDate}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-neutral-600 mb-2">
                      <span>Progress</span>
                      <span>{order.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full transition-all"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stages */}
                  <div className="grid grid-cols-4 gap-2">
                    {order.stages.map((stage, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            stage.completed
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <p className={`text-xs ${stage.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>
                          {stage.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measurement History */}
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Measurement History
            </h3>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-neutral-700">Date</th>
                      <th className="px-6 py-3 text-left text-neutral-700">Type</th>
                      <th className="px-6 py-3 text-left text-neutral-700">Chest</th>
                      <th className="px-6 py-3 text-left text-neutral-700">Waist</th>
                      <th className="px-6 py-3 text-left text-neutral-700">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {measurements.map((measurement, index) => (
                      <tr key={index} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 text-neutral-900">{measurement.date}</td>
                        <td className="px-6 py-4 text-neutral-600">{measurement.type}</td>
                        <td className="px-6 py-4 text-neutral-600">{measurement.chest}</td>
                        <td className="px-6 py-4 text-neutral-600">{measurement.waist}</td>
                        <td className="px-6 py-4 text-neutral-600">{measurement.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div>
          <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${notification.unread ? 'bg-neutral-50' : 'bg-white'}`}
              >
                <p className="text-neutral-900 text-sm mb-1">{notification.message}</p>
                <p className="text-neutral-500 text-xs">{notification.time}</p>
                {notification.unread && (
                  <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
