'use client';

import { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Mail, MessageSquare, Calendar, User, Phone, Briefcase, FileText, Eye, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Application } from '@/interface';
import PortfolioViewer from '@/components/PortfolioViewer';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showPortfolioViewer, setShowPortfolioViewer] = useState(false);
  const [viewingPortfolio, setViewingPortfolio] = useState<Application | null>(null);
  const [notificationMethod, setNotificationMethod] = useState<'email' | 'sms'>('email');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // 1. Updated: Load applications from MySQL Database
  const loadApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
    const interval = setInterval(loadApplications, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (application: Application) => {
    setSelectedApplication(application);
    setCustomMessage(
      `Congratulations ${application.fullName}!\n\nWe are pleased to inform you that your application to AGBOFAH CLOTHING's Tailoring Training Program has been APPROVED!\n\nTraining starts on the first Monday of next month. Welcome to the family!\n\nBest regards,\nAGBOFAH CLOTHING Team`
    );
    setShowApprovalModal(true);
  };

  // 2. Updated: Handle Reject via Database API
  const handleReject = async (application: Application) => {
    const confirmed = window.confirm(`Are you sure you want to reject ${application.fullName}?`);
    
    if (confirmed) {
      try {
        const response = await fetch(`/api/applications/${application.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        });

        if (response.ok) {
          loadApplications(); // Refresh list
          toast.error(`Application from ${application.fullName} has been rejected`);
        }
      } catch (error) {
        toast.error("Failed to update status in database.");
      }
    }
  };

  // 3. Updated: Send Approval via Database + SMS Trigger
  const sendApproval = async () => {
  if (!selectedApplication || isSending) return;

  setIsSending(true); // Start loading
  const toastId = toast.loading("Processing approval and sending SMS...");

  try {
    const response = await fetch(`/api/applications/${selectedApplication.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'approved',
        notificationMethod,
        message: customMessage 
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(`✅ Success! Notification sent.`, { id: toastId });
      setShowApprovalModal(false);
      setSelectedApplication(null);
      setCustomMessage('');
      await loadApplications(); // Refresh the list from MySQL
    } else {
      toast.error(`Error: ${data.error || "Failed to process"}`, { id: toastId });
    }
  } catch (error) {
    toast.error("Network error. Please check your connection.", { id: toastId });
  } finally {
    setIsSending(false); // Stop loading
  }
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-neutral-900" />
        <p className="mt-4 text-neutral-600">Syncing with Agbofah Database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-neutral-900 mb-2 font-bold text-2xl">Application Review Dashboard</h2>
          <p className="text-neutral-600">Review and approve training program applications</p>
        </div>
        <button onClick={onLogout} className="text-sm font-medium text-red-600 hover:underline">Logout</button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-neutral-600 text-sm">Total Applications</p>
            <Users className="w-4 h-4 text-neutral-400" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{applications.length}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-2 text-amber-700">
            <p className="text-sm">Pending Review</p>
            <Users className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{pendingApplications.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2 text-green-700">
            <p className="text-sm">Approved</p>
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-green-900">{approvedApplications.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700">
          <div className="flex items-center justify-between mb-2 text-red-700">
            <p className="text-sm">Rejected</p>
            <XCircle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-red-900">{rejectedApplications.length}</p>
        </div>
      </div>

      {/* Pending Applications Section */}
      <div className="space-y-6">
        {pendingApplications.length > 0 ? (
          <div>
            <h3 className="text-neutral-900 mb-4 flex items-center gap-2 font-semibold">
              <Users className="w-5 h-5 text-neutral-600" />
              Pending Applications ({pendingApplications.length})
            </h3>
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <div key={application.id} className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <User className="w-4 h-4" /> {application.fullName}
                          </h4>
                          <p className="text-neutral-500 text-xs mt-1 font-mono">ID: {application.id}</p>
                        </div>
                        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">Pending</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600"><Mail className="w-4 h-4" /> {application.email}</div>
                        <div className="flex items-center gap-2 text-neutral-600"><Phone className="w-4 h-4" /> {application.phone}</div>
                        <div className="flex items-center gap-2 text-neutral-600"><Briefcase className="w-4 h-4" /> Exp: {application.experience}</div>
                        <div className="flex items-center gap-2 text-neutral-600"><Calendar className="w-4 h-4" /> {formatDate(application.submittedAt)}</div>
                      </div>
                      {application.portfolio && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <FileText className="w-4 h-4 text-neutral-400" />
                          <span>Portfolio: {application.portfolio}</span>
                          <button onClick={() => { setViewingPortfolio(application); setShowPortfolioViewer(true); }}
                            className="ml-2 text-neutral-900 hover:text-neutral-700 flex items-center gap-1 text-xs underline font-medium">
                            <Eye className="w-3 h-3" /> View File
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                      <button onClick={() => handleApprove(application)} className="flex-1 lg:w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm">
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button onClick={() => handleReject(application)} className="flex-1 lg:w-full bg-neutral-100 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium border border-neutral-200">
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-neutral-200 text-center shadow-sm">
            <Users className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <h3 className="text-neutral-900 font-bold mb-2">No Applications Yet</h3>
            <p className="text-neutral-600">New submissions will appear here automatically.</p>
          </div>
        )}

        {/* Status Lists for Approved and Rejected */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approved List */}
          {approvedApplications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-neutral-900 flex items-center gap-2 font-semibold">
                <CheckCircle className="w-5 h-5 text-green-600" /> Approved
              </h3>
              {approvedApplications.map(app => (
                <div key={app.id} className="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-bold text-green-900">{app.fullName}</p>
                    <p className="text-xs text-green-700">{app.email}</p>
                  </div>
                  <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Approved</span>
                </div>
              ))}
            </div>
          )}
          {/* Rejected List */}
          {rejectedApplications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-neutral-900 flex items-center gap-2 font-semibold">
                <XCircle className="w-5 h-5 text-red-600" /> Rejected
              </h3>
              {rejectedApplications.map(app => (
                <div key={app.id} className="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-bold text-red-900">{app.fullName}</p>
                    <p className="text-xs text-red-700">{app.email}</p>
                  </div>
                  <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Rejected</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Approval Modal (Maintains your logic) */}
      {showApprovalModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-2 py-10 z-50">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg w-full p-6 h-fit my-auto">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Approve Application</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <button onClick={() => setNotificationMethod('email')} className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${notificationMethod === 'email' ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-100 text-neutral-500'}`}><Mail className="w-5 h-5" /> Email</button>
              <button onClick={() => setNotificationMethod('sms')} className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${notificationMethod === 'sms' ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-100 text-neutral-500'}`}><MessageSquare className="w-5 h-5" /> SMS</button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-neutral-700 mb-2">Notification Message</label>
              <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} rows={8} className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 outline-none text-sm text-neutral-800 leading-relaxed" />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={sendApproval}
                disabled={isSending} // Disable while sending
                className="flex-1 bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {notificationMethod === 'email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    Send {notificationMethod.toUpperCase()} Approval
                  </>
                )}
              </button>
              <button onClick={() => setShowApprovalModal(false)} className="px-6 py-3 bg-neutral-100 text-neutral-600 rounded-xl font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Viewer Component Integration */}
      {showPortfolioViewer && viewingPortfolio?.portfolioData && viewingPortfolio?.portfolioType && (
        <PortfolioViewer
          fileName={viewingPortfolio.portfolio || 'Portfolio'}
          fileData={viewingPortfolio.portfolioData}
          fileType={viewingPortfolio.portfolioType}
          onClose={() => setShowPortfolioViewer(false)}
        />
      )}
    </div>
  );
}