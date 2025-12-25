import { useState } from 'react';
import { CheckCircle, Clock, User, DollarSign, Calendar, Smartphone, RefreshCw } from 'lucide-react';

export default function PaymentVerification() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      memberName: 'John Doe',
      memberId: 'MEM1234',
      paymentType: 'First Fruit',
      amount: 500,
      date: '2025-12-08',
      time: '09:45 AM',
      status: 'pending',
      reference: 'MOMO-789456123',
    },
    {
      id: 2,
      memberName: 'Jane Smith',
      memberId: 'MEM5678',
      paymentType: 'Welfare',
      amount: 200,
      date: '2025-12-08',
      time: '10:12 AM',
      status: 'pending',
      reference: 'MOMO-789456124',
    },
    {
      id: 3,
      memberName: 'Mike Johnson',
      memberId: 'MEM9012',
      paymentType: 'Project Offering',
      amount: 1000,
      date: '2025-12-08',
      time: '10:30 AM',
      status: 'pending',
      reference: 'MOMO-789456125',
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState(payments[0]);

  const handleVerify = (paymentId: number) => {
    setPayments(
      payments.map((p) => (p.id === paymentId ? { ...p, status: 'verified' } : p))
    );
    if (selectedPayment.id === paymentId) {
      setSelectedPayment({ ...selectedPayment, status: 'verified' });
    }
  };

  const pendingCount = payments.filter((p) => p.status === 'pending').length;
  const verifiedCount = payments.filter((p) => p.status === 'verified').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-gray-900">Payment Verification</h1>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Synced with MoMo API
            </div>
          </div>
          <p className="text-gray-600">Review and verify member payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl text-gray-900">{pendingCount}</h3>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl text-gray-900">{verifiedCount}</h3>
                <p className="text-sm text-gray-600">Verified</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl text-gray-900">
                  ${payments.reduce((sum, p) => sum + p.amount, 0)}
                </h3>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payments List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-gray-900">Payment Queue</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {payments.map((payment) => (
                  <button
                    key={payment.id}
                    onClick={() => setSelectedPayment(payment)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedPayment.id === payment.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{payment.memberName}</p>
                        <p className="text-xs text-gray-500">{payment.memberId}</p>
                      </div>
                      {payment.status === 'verified' ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{payment.paymentType}</span>
                      <span className="text-green-600">${payment.amount}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Payment Details</h2>
                {selectedPayment.status === 'verified' ? (
                  <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Member Information */}
                <div>
                  <h3 className="text-sm text-gray-600 mb-3">Member Information</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{selectedPayment.memberName}</p>
                        <p className="text-sm text-gray-600">ID: {selectedPayment.memberId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-sm text-gray-600 mb-3">Payment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <p className="text-sm text-gray-600">Amount</p>
                      </div>
                      <p className="text-2xl text-gray-900">${selectedPayment.amount}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <p className="text-sm text-gray-600">Date & Time</p>
                      </div>
                      <p className="text-gray-900">{selectedPayment.date}</p>
                      <p className="text-sm text-gray-600">{selectedPayment.time}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                        <p className="text-sm text-gray-600">Payment Type</p>
                      </div>
                      <p className="text-gray-900">{selectedPayment.paymentType}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                        <p className="text-sm text-gray-600">Reference</p>
                      </div>
                      <p className="text-gray-900 text-sm">{selectedPayment.reference}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {selectedPayment.status === 'pending' && (
                  <button
                    onClick={() => handleVerify(selectedPayment.id)}
                    className="w-full bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Verify Payment
                  </button>
                )}

                {selectedPayment.status === 'verified' && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>Payment has been verified</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}