'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getReports, addReport, updateReport, deleteReport, uploadReportFile, deleteReportFile } from '@/services/reports';
import { Report, ReportFormData } from '@/types/reports';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ReportsManagement() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    date: '',
    fileUrl: '',
    fileRef: '',
  });
  const [file, setFile] = useState<File | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [authLoading, user, router]);

  // Load reports when user is authenticated
  useEffect(() => {
    const loadReports = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const reportsList = await getReports();
        setReports(reportsList);
      } catch (err) {
        console.error('Error loading reports:', err);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadReports();
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFormLoading(true);

    try {
      let fileUrl = formData.fileUrl;
      let fileRef = formData.fileRef;

      if (file) {
        const { url, ref } = await uploadReportFile(file);
        fileUrl = url;
        fileRef = ref;

        // Delete old file if editing
        if (editingReport?.fileRef) {
          await deleteReportFile(editingReport.fileRef);
        }
      }

      const reportData = {
        ...formData,
        fileUrl,
        fileRef,
      };

      if (editingReport) {
        await updateReport(editingReport.id, reportData);
        setSuccess('Report updated successfully');
      } else {
        await addReport(reportData);
        setSuccess('Report added successfully');
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        fileUrl: '',
        fileRef: '',
      });
      setFile(null);
      setEditingReport(null);

      // Refresh reports list
      const reportsList = await getReports();
      setReports(reportsList);
    } catch (err) {
      console.error('Error saving report:', err);
      setError('Failed to save report');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (report: Report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      description: report.description,
      date: report.date,
      fileUrl: report.fileUrl,
      fileRef: report.fileRef,
    });
  };

  const handleDelete = async (id: string, fileRef: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      // Delete the file first if it exists
      if (fileRef) {
        await deleteReportFile(fileRef);
      }
      
      // Then delete the report
      await deleteReport(id);
      setSuccess('Report deleted successfully');
      
      // Refresh reports list
      const reportsList = await getReports();
      setReports(reportsList);
    } catch (err) {
      console.error('Error deleting report:', err);
      setError('Failed to delete report');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 sm:mb-4 bg-red-50 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 sm:mb-4 bg-green-50 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg relative"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Report Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">
            {editingReport ? 'Edit Report' : 'Add New Report'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
              />
              {formData.fileUrl && (
                <div className="mt-2">
                  <a
                    href={formData.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF4B00] hover:text-[#FF4B00]/80"
                  >
                    View Current File
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              {editingReport && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReport(null);
                    setFormData({
                      title: '',
                      description: '',
                      date: '',
                      fileUrl: '',
                      fileRef: '',
                    });
                    setFile(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={formLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF4B00] rounded-lg hover:bg-[#FF4B00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4B00] disabled:opacity-50"
              >
                {formLoading ? 'Saving...' : editingReport ? 'Update' : 'Add'} Report
              </button>
            </div>
          </form>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">Reports</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No reports added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-500">{report.date}</p>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF4B00] hover:text-[#FF4B00]/80 text-sm mt-2 inline-block"
                      >
                        View File
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(report)}
                        className="text-[#FF4B00] hover:text-[#FF4B00]/80"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(report.id, report.fileRef)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 