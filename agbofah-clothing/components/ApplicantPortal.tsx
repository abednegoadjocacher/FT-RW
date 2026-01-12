'use client';

import { useState, FormEvent } from 'react';
import { Upload, CheckCircle, User, Mail, Phone, Briefcase, Loader2 } from 'lucide-react';
import { Application } from '@/interface';

export default function ApplicantPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: null as File | null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Helper function to send the actual request to our MySQL API
    const sendToDatabase = async (base64Data: string | null, fileType: string | null) => {
      const applicationData: Application = {
        id: `APP-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        portfolio: formData.portfolio ? formData.portfolio.name : null,
        portfolioData: base64Data,
        portfolioType: fileType,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData),
        });

        if (response.ok) {
          setSubmitted(true);
          // Reset form after 5 seconds
          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              experience: '',
              portfolio: null,
            });
          }, 5000);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to submit'}`);
        }
      } catch (error) {
        console.error("Submission Error:", error);
        alert("Could not connect to the server. Ensure your MySQL and Next.js app are running.");
      } finally {
        setIsSubmitting(false);
      }
    };

    // Check if there is a file to process and convert to Base64
    if (formData.portfolio) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendToDatabase(reader.result as string, formData.portfolio!.type);
      };
      reader.readAsDataURL(formData.portfolio);
    } else {
      // No file, send nulls for portfolio fields
      sendToDatabase(null, null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, portfolio: e.target.files[0] });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length <= 13) {
      setFormData({ ...formData, phone: numbersOnly });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-neutral-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-neutral-900 mb-4 font-bold text-2xl">Application Submitted!</h2>
          <p className="text-neutral-600 mb-6">
            Thank you for applying to AGBOFAH CLOTHING&apos;s training program. Your details are now in our database for review.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Tailoring Training Program</h2>
        <p className="text-neutral-600">Join AGBOFAH CLOTHING and master the craft of professional tailoring</p>
      </div>

      <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-neutral-700 mb-2 font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-neutral-700 mb-2 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-neutral-700 mb-2 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none transition-all"
              placeholder="e.g. 0244000000"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-neutral-700 mb-2 font-medium">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Experience Level <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none bg-white"
            >
              <option value="">Select level</option>
              <option value="None">Beginner (No experience)</option>
              <option value="0-6 months">Apprentice (0-6 months)</option>
              <option value="6-12 months">Junior (6-12 months)</option>
              <option value="1-2 years">Intermediate (1-2 years)</option>
              <option value="2+ years">Advanced (2+ years)</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-neutral-700 mb-2 font-medium">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Portfolio / Resume
              </div>
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-900 transition-colors cursor-pointer relative">
              <input
                type="file"
                id="portfolio-upload"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-neutral-400" />
                {formData.portfolio ? (
                  <p className="text-neutral-900 font-medium">{formData.portfolio.name}</p>
                ) : (
                  <>
                    <p className="text-neutral-700">Click to upload your work</p>
                    <p className="text-neutral-500 text-sm">PDF or Images (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-900 text-white px-6 py-4 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading Application...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}