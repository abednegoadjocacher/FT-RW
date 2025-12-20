import { useState } from 'react';
import { QrCode, Keyboard, CheckCircle, User } from 'lucide-react';

export default function AttendanceScanner() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [memberCode, setMemberCode] = useState('');
  const [lastScanned, setLastScanned] = useState<{ name: string; time: string } | null>(null);

  const handleScan = () => {
    // Simulate scanning
    setLastScanned({
      name: 'John Doe',
      time: new Date().toLocaleTimeString(),
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleManualSubmit = () => {
    if (memberCode.trim()) {
      setLastScanned({
        name: `Member #${memberCode}`,
        time: new Date().toLocaleTimeString(),
      });
      setShowSuccess(true);
      setMemberCode('');
      setManualEntry(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 pb-24 lg:pb-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Ready to Scan</span>
          </div>
          <h1 className="text-gray-900 mb-2">Attendance Scanner</h1>
          <p className="text-gray-500">Scan member QR code to record attendance</p>
        </div>

        {/* Scanner Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {!manualEntry ? (
            <div className="text-center">
              {/* QR Scanner Placeholder */}
              <div className="relative mx-auto w-64 h-64 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center border-4 border-dashed border-green-300">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-600 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-600 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-600 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-600 rounded-br-2xl"></div>
                <QrCode className="w-20 h-20 text-gray-300" />
              </div>

  
              {/* Test Scan Button */}
              <button
                onClick={handleScan}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors mb-3"
              >
                Simulate Scan
              </button>

              <button
                onClick={() => setManualEntry(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Keyboard className="w-5 h-5" />
                Manual Code Entry
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Enter Member Code
                </label>
                <input
                  type="text"
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  placeholder="e.g., MEM12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleManualSubmit}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setManualEntry(false);
                    setMemberCode('');
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Last Scanned */}
        {lastScanned && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{lastScanned.name}</p>
                <p className="text-sm text-gray-500">Scanned at {lastScanned.time}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-gray-900 mb-2">Attendance Recorded!</h2>
              <p className="text-gray-600">Member check-in successful</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
