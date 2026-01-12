'use client'
import { ListTodo, Calendar, Bell, Clock } from 'lucide-react';

const assignedTasks = [
  {
    id: 'TASK-001',
    order: 'ORD-001',
    customer: 'John Doe',
    item: 'Custom Suit',
    stage: 'Sewing',
    deadline: 'Dec 15, 2025',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'TASK-002',
    order: 'ORD-007',
    customer: 'Jane Smith',
    item: 'Evening Gown',
    stage: 'Finishing',
    deadline: 'Dec 10, 2025',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'TASK-003',
    order: 'ORD-008',
    customer: 'Robert Lee',
    item: 'Casual Shirt',
    stage: 'Cutting',
    deadline: 'Dec 18, 2025',
    priority: 'Low',
    status: 'Not Started',
  },
];

const todaySchedule = [
  { time: '9:00 AM', task: 'Start sewing - Custom Suit', status: 'completed' },
  { time: '11:00 AM', task: 'Fitting session - Evening Gown', status: 'completed' },
  { time: '2:00 PM', task: 'Quality check - Wedding Dress', status: 'upcoming' },
  { time: '4:00 PM', task: 'Begin cutting - Casual Shirt', status: 'upcoming' },
];

const notifications = [
  { id: 1, message: 'New task assigned: Evening Gown finishing', time: '1 hour ago' },
  { id: 2, message: 'Deadline reminder: Custom Suit due in 7 days', time: '3 hours ago' },
  { id: 3, message: 'Material restocked: Premium cotton fabric', time: '1 day ago' },
];

export default function TailorDashboard() {
  const handleStatusUpdate = (taskId: string, newStatus: string) => {
    alert(`Updated ${taskId} to ${newStatus}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-neutral-900 mb-2">Tailor Dashboard</h2>
        <p className="text-neutral-600">Manage your assigned tasks and schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
              <ListTodo className="w-5 h-5" />
              Assigned Tasks
            </h3>
            <div className="space-y-4">
              {assignedTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl p-6 border border-neutral-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-neutral-900">{task.item}</h4>
                      <p className="text-neutral-500 text-sm mt-1">
                        {task.order} • {task.customer}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-neutral-500 text-sm mb-1">Stage</p>
                      <p className="text-neutral-900">{task.stage}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-sm mb-1">Deadline</p>
                      <p className="text-neutral-900 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 text-sm bg-white"
                      defaultValue={task.status}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                    <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Progress Summary */}
          <div>
            <h3 className="text-neutral-900 mb-4">Task Progress Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <p className="text-neutral-600 text-sm mb-2">Not Started</p>
                <p className="text-neutral-900">1 task</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <p className="text-neutral-600 text-sm mb-2">In Progress</p>
                <p className="text-neutral-900">2 tasks</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <p className="text-neutral-600 text-sm mb-2">Completed Today</p>
                <p className="text-neutral-900">3 tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Daily Schedule */}
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {"Today's Schedule"}
            </h3>
            <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-200">
              {todaySchedule.map((item, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        item.status === 'completed' ? 'bg-neutral-900' : 'bg-neutral-300'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-neutral-600 text-sm">{item.time}</p>
                      <p
                        className={`text-sm mt-1 ${
                          item.status === 'completed' ? 'text-neutral-500 line-through' : 'text-neutral-900'
                        }`}
                      >
                        {item.task}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h3>
            <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-200">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4">
                  <p className="text-neutral-900 text-sm mb-1">{notification.message}</p>
                  <p className="text-neutral-500 text-xs">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
