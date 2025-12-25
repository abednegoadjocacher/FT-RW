import { useState } from 'react';
import CediIcon from './CediIcon';
import { DollarSign, TrendingUp, Download, Search, Award, MessageSquare, UserPlus, Edit2, Save, X, CheckCircle} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: number;
  date: string;
  time: string;
  member: string;
  phone: string;
  type: string;
  amount: number;
  method: 'MoMo' | 'Cash' | 'Bank';
  status: string;
  month: string;
}

interface Member {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
}

interface PaymentForm {
  memberId: number;
  type: string;
  amount: string;
  method: 'MoMo' | 'Cash' | 'Bank';
  month: string;
}

export default function FinancialRecords() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [paymentFormId, setPaymentFormId] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [visibleTransactions, setVisibleTransactions] = useState(3);

  const [newMember, setNewMember] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    memberId: 0,
    type: 'First Fruit',
    amount: '',
    method: 'MoMo',
    month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  });

  const [members, setMembers] = useState<Member[]>([
    { id: 1, firstName: 'John', middleName: 'Michael', lastName: 'Doe', phone: '+233501234567' },
    { id: 2, firstName: 'Jane', middleName: 'Marie', lastName: 'Smith', phone: '+233502345678' },
    { id: 3, firstName: 'Mike', middleName: 'Andrew', lastName: 'Johnson', phone: '+233503456789' },
    { id: 4, firstName: 'Sarah', middleName: 'Ann', lastName: 'Williams', phone: '+233504567890' },
    { id: 5, firstName: 'David', middleName: 'Lee', lastName: 'Brown', phone: '+233505678901' },
    { id: 6, firstName: 'Emily', middleName: 'Rose', lastName: 'Davis', phone: '+233506789012' },
  ]);

  const [editForm, setEditForm] = useState<Member | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2025-12-08',
      time: '09:45 AM',
      member: 'John Doe',
      phone: '+233501234567',
      type: 'First Fruit',
      amount: 500,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 2,
      date: '2025-12-08',
      time: '10:12 AM',
      member: 'Jane Smith',
      phone: '+233502345678',
      type: 'Welfare',
      amount: 200,
      method: 'Cash',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 3,
      date: '2025-12-08',
      time: '10:30 AM',
      member: 'Mike Johnson',
      phone: '+233503456789',
      type: 'Project Offering',
      amount: 1000,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 4,
      date: '2025-12-07',
      time: '09:20 AM',
      member: 'Sarah Williams',
      phone: '+233504567890',
      type: 'First Fruit',
      amount: 300,
      method: 'Bank',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 5,
      date: '2025-12-07',
      time: '11:15 AM',
      member: 'David Brown',
      phone: '+233505678901',
      type: 'Tithes',
      amount: 750,
      method: 'Cash',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 6,
      date: '2025-12-06',
      time: '08:45 AM',
      member: 'Emily Davis',
      phone: '+233506789012',
      type: 'Welfare',
      amount: 150,
      method: 'MoMo',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 7,
      date: '2025-12-06',
      time: '02:30 PM',
      member: 'John Doe',
      phone: '+233501234567',
      type: 'Tithes',
      amount: 400,
      method: 'Bank',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 8,
      date: '2025-12-05',
      time: '10:00 AM',
      member: 'Jane Smith',
      phone: '+233502345678',
      type: 'Project Offering',
      amount: 850,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 9,
      date: '2025-12-05',
      time: '03:15 PM',
      member: 'Mike Johnson',
      phone: '+233503456789',
      type: 'First Fruit',
      amount: 600,
      method: 'Cash',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 10,
      date: '2025-12-04',
      time: '11:20 AM',
      member: 'Sarah Williams',
      phone: '+233504567890',
      type: 'Welfare',
      amount: 250,
      method: 'MoMo',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 11,
      date: '2025-12-04',
      time: '01:45 PM',
      member: 'David Brown',
      phone: '+233505678901',
      type: 'Project Offering',
      amount: 950,
      method: 'Bank',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 12,
      date: '2025-12-03',
      time: '09:00 AM',
      member: 'Emily Davis',
      phone: '+233506789012',
      type: 'First Fruit',
      amount: 450,
      method: 'Cash',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 13,
      date: '2025-12-03',
      time: '12:30 PM',
      member: 'John Doe',
      phone: '+233501234567',
      type: 'Welfare',
      amount: 175,
      method: 'MoMo',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 14,
      date: '2025-12-02',
      time: '10:45 AM',
      member: 'Jane Smith',
      phone: '+233502345678',
      type: 'Tithes',
      amount: 800,
      method: 'Bank',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 15,
      date: '2025-12-02',
      time: '02:20 PM',
      member: 'Mike Johnson',
      phone: '+233503456789',
      type: 'Project Offering',
      amount: 1100,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 16,
      date: '2025-12-01',
      time: '09:30 AM',
      member: 'Sarah Williams',
      phone: '+233504567890',
      type: 'First Fruit',
      amount: 550,
      method: 'Cash',
      status: 'Completed',
      month: 'November 2025',
    },
    {
      id: 17,
      date: '2025-12-01',
      time: '03:00 PM',
      member: 'David Brown',
      phone: '+233505678901',
      type: 'Welfare',
      amount: 225,
      method: 'MoMo',
      status: 'Completed',
      month: 'December 2025',
    },
    {
      id: 18,
      date: '2025-11-30',
      time: '11:10 AM',
      member: 'Emily Davis',
      phone: '+233506789012',
      type: 'Tithes',
      amount: 700,
      method: 'Bank',
      status: 'Completed',
      month: 'November 2025',
    },
  ]);

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

  const topGivers = [
    { name: 'Sarah Johnson', amount: 2400, frequency: 8 },
    { name: 'Michael Brown', amount: 2200, frequency: 8 },
    { name: 'David Martinez', amount: 1950, frequency: 7 },
    { name: 'Emily Davis', amount: 1800, frequency: 8 },
  ];

  const handleAddMember = () => {
    if (!newMember.firstName || !newMember.lastName || !newMember.phone) {
      alert('Please fill in required fields: First Name, Last Name, and Phone Number');
      return;
    }

    const member: Member = {
      id: members.length + 1,
      ...newMember,
    };

    setMembers([...members, member]);
    setNewMember({ firstName: '', middleName: '', lastName: '', phone: '' });
    setShowMemberModal(false);
    alert('Member added successfully!');
  };

  const handleEditMember = (member: Member) => {
    setEditingMemberId(member.id);
    setEditForm({ ...member });
  };

  const handleSaveMember = () => {
    if (!editForm) return;

    setMembers(members.map(m => m.id === editForm.id ? editForm : m));
    setEditingMemberId(null);
    setEditForm(null);
    alert('Member updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setEditForm(null);
  };

  const handleMethodChange = (transactionId: number, newMethod: 'MoMo' | 'Cash' | 'Bank') => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, method: newMethod } : t
    ));
  };

  const generateMessage = (transaction: Transaction) => {
    return `Dear ${transaction.member},\n\nThank you for your ${transaction.type} contribution of $${transaction.amount} for the month of ${transaction.month}.\n\nYour support is greatly appreciated and helps us continue our mission.\n\nPayment Method: ${transaction.method}\nDate: ${transaction.date} at ${transaction.time}\n\nGod bless you!\n\nChurch Administration`;
  };

  const handleSendMessage = (transaction: Transaction) => {
    const message = generateMessage(transaction);
    setSelectedMessage(message);
    setSelectedPhone(transaction.phone);
    setShowMessageModal(true);
  };

const handleConfirmSendMessage = async () => {
  try {
    // Helper: Convert '0241234567' to '+233241234567'
    let formattedPhone = selectedPhone.trim();
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+233' + formattedPhone.substring(1);
    }

    console.log('Sending to:', formattedPhone); // Debugging

    // Updated URL to match your folder structure
    const response = await fetch('/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: formattedPhone, // Use the formatted version
        messageBody: selectedMessage, 
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert(`Message successfully sent to ${formattedPhone}!`);
    } else {
      alert(`Failed to send: ${data.error}`);
    }

  } catch (error) {
    console.error(error);
    alert('Network error. Check your internet connection.');
  } finally {
    setShowMessageModal(false);
  }
};

  // const handleConfirmSendMessage = () => {
  //   // In a real application, this would integrate with an SMS API
  //   console.log('Sending message to:', selectedPhone);
  //   console.log('Message:', selectedMessage);
  //   alert(`Message sent successfully to ${selectedPhone}!`);
  //   setShowMessageModal(false);
  // };

  const handlePaymentFormChange = (key: keyof PaymentForm, value: string | 'MoMo' | 'Cash' | 'Bank') => {
    setPaymentForm({ ...paymentForm, [key]: value });
  };

  const handlePaymentFormSubmit = () => {
    if (!paymentForm.memberId || !paymentForm.amount) {
      alert('Please fill in required fields: Member and Amount');
      return;
    }

    const member = members.find(m => m.id === paymentForm.memberId);
    if (!member) {
      alert('Member not found');
      return;
    }

    const transaction: Transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      member: `${member.firstName} ${member.lastName}`,
      phone: member.phone,
      type: paymentForm.type,
      amount: parseFloat(paymentForm.amount),
      method: paymentForm.method,
      status: 'Completed',
      month: paymentForm.month,
    };

    setTransactions([...transactions, transaction]);
    setPaymentForm({ memberId: 0, type: 'First Fruit', amount: '', method: 'MoMo', month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }) });
    setPaymentFormId(null);
    alert('Transaction recorded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
        <div className="mb-6">
          <div>
            <h1 className="text-gray-900 mb-2">Financial Records Overview</h1>
            <p className="text-gray-600">Comprehensive financial tracking and reports</p>
          </div>
          <button
            onClick={() => setShowMemberModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Add New Member
          </button>
        </div>
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
              <h3 className="text-3xl text-gray-900 mb-1"><CediIcon />36,350.00</h3>
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
              <h3 className="text-3xl text-gray-900 mb-1"><CediIcon />147.00</h3>
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
                <p className="text-2xl text-green-600 mb-1"><CediIcon />{giver.amount}.00</p>
                <p className="text-xs text-gray-600">{giver.frequency} contributions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
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
                    Phone Number
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
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Actions
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
                    <td className="px-6 py-4 text-gray-600 text-sm">{transaction.phone}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {transaction.method}
                    </td>
                    <td className="px-6 py-4 text-gray-900"><CediIcon />{transaction.amount}.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleSendMessage(transaction)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Send Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 text-center">
            {visibleTransactions < transactions.length && (
              <button
                onClick={() => setVisibleTransactions(visibleTransactions + 3)}
                className="text-sm text-green-600 hover:text-green-700 cursor-pointer"
              >
                Load More Transactions
              </button>
            )}
            {visibleTransactions >= transactions.length && (
              <p className="text-sm text-gray-500">All transactions loaded</p>
            )}
          </div>
        </div>

          {/* <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-green-600 hover:text-green-700">
              Load More Transactions
            </button>
          </div>
        </div> */}

        {/* Members Management Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900 mb-2">Member Management</h2>
            <p className="text-sm text-gray-600">View and edit member information</p>
            <p className="text-sm text-gray-600">View, edit member information, and record payments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Middle Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 opacity-100">
                {members.map((member) => (
                  <>
                  <tr key={member.id} className="hover:bg-gray-100">
                    {editingMemberId === member.id && editForm ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                            className="max-w-40 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300 bag-green-600"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.middleName}
                            onChange={(e) => setEditForm({ ...editForm, middleName: e.target.value })}
                            className="max-w-40 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                            className="max-w-40 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                           <input
                            type="text"
                            value={editForm.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setEditForm({ ...editForm, phone: value });
                            }}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={10}
                          />
                        </td>
                        <td className="px-6 py-4" colSpan={4}></td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveMember}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : paymentFormId === member.id ? (
                      <>
                        <td className="px-6 py-4 text-gray-900">{member.firstName}</td>
                        <td className="px-6 py-4 text-gray-900">{member.middleName}</td>
                        <td className="px-6 py-4 text-gray-900">{member.lastName}</td>
                        <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                        <td className="px-6 py-4">
                          <select
                            value={paymentForm.type}
                            onChange={(e) => handlePaymentFormChange('type', e.target.value)}
                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-600"
                          >
                            <option value="First Fruit">First Fruit</option>
                            <option value="Welfare">Welfare</option>
                            <option value="Project Offering">Project Offering</option>
                            <option value="Tithes">Tithes</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={paymentForm.amount}
                            onChange={(e) => handlePaymentFormChange('amount', e.target.value)}
                            placeholder="0.00"
                            className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-600 text-white"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={paymentForm.method}
                            onChange={(e) => handlePaymentFormChange('method', e.target.value as 'MoMo' | 'Cash' | 'Bank')}
                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-600"
                          >
                            <option value="MoMo">MoMo</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={paymentForm.month}
                            onChange={(e) => handlePaymentFormChange('month', e.target.value)}
                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-600"
                          >
                            <option value="January 2025">January 2025</option>
                            <option value="February 2025">February 2025</option>
                            <option value="March 2025">March 2025</option>
                            <option value="April 2025">April 2025</option>
                            <option value="May 2025">May 2025</option>
                            <option value="June 2025">June 2025</option>
                            <option value="July 2025">July 2025</option>
                            <option value="August 2025">August 2025</option>
                            <option value="September 2025">September 2025</option>
                            <option value="October 2025">October 2025</option>
                            <option value="November 2025">November 2025</option>
                            <option value="December 2025">December 2025</option>
                            <option value="January 2026">January 2026</option>
                            <option value="February 2026">February 2026</option>
                            <option value="March 2026">March 2026</option>
                            <option value="April 2026">April 2026</option>
                            <option value="May 2026">May 2026</option>
                            <option value="June 2026">June 2026</option>
                            <option value="July 2026">July 2026</option>
                            <option value="August 2026">August 2026</option>
                            <option value="September 2026">September 2026</option>
                            <option value="October 2026">October 2026</option>
                            <option value="November 2026">November 2026</option>
                            <option value="December 2026">December 2026</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={handlePaymentFormSubmit}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Record
                            </button>
                            <button
                              onClick={() => {
                                setPaymentFormId(null);
                                setPaymentForm({ memberId: 0, type: 'First Fruit', amount: '', method: 'MoMo', month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }) });
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-gray-900">{member.firstName}</td>
                        <td className="px-6 py-4 text-gray-900">{member.middleName}</td>
                        <td className="px-6 py-4 text-gray-900">{member.lastName}</td>
                        <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-400">-</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-400">-</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-400">-</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-400">-</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setPaymentFormId(member.id);
                                setPaymentForm({ ...paymentForm, memberId: member.id });
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                            >
                              <CediIcon className="w-4 h-4" />
                              Add Payment
                            </button>
                            <button
                              onClick={() => handleEditMember(member)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 flex justify-center">
            <button
              onClick={() => setShowMemberModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <UserPlus className="w-5 h-5" />
              Add New Member
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Add New Member</h2>
              <button
                onClick={() => setShowMemberModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  value={newMember.middleName}
                  onChange={(e) => setNewMember({ ...newMember, middleName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter middle name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                 <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setNewMember({ ...newMember, phone: value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0501234567"
                  maxLength={10}
                />
                <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddMember}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Member
              </button>
              <button
                onClick={() => setShowMemberModal(false)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Send Message</h2>
                  <p className="text-sm text-gray-600">To: {selectedPhone}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">Message Preview</label>
              <textarea
                value={selectedMessage}
                onChange={(e) => setSelectedMessage(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmSendMessage}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Confirm & Send
              </button>
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}