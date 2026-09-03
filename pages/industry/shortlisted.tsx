import React, { useState, useEffect } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
  Eye,
  Clock,
  Send,
  X
} from 'lucide-react';
import { CandidateApplication, ApplicationStatus } from '../../types';
import { getStoredApplications, saveApplications } from '../../lib/industryData';

export default function ShortlistedPage() {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [scheduleModalApp, setScheduleModalApp] = useState<CandidateApplication | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-09-08T10:00');
  const [interviewNotes, setInterviewNotes] = useState('Technical interview focused on Python and SQL architecture.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setApplications(getStoredApplications());
  }, []);

  const shortlistedList = applications.filter(
    (a) => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected'
  );

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setApplications(updated);
    saveApplications(updated);
    setToastMessage(`Candidate status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalApp) return;

    const updated = applications.map((a) =>
      a.id === scheduleModalApp.id
        ? {
            ...a,
            status: 'Interview' as ApplicationStatus,
            interviewDate: interviewDate.replace('T', ' '),
            notes: interviewNotes
          }
        : a
    );

    setApplications(updated);
    saveApplications(updated);
    setScheduleModalApp(null);
    setToastMessage(`Interview scheduled with ${scheduleModalApp.studentName}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
              <UserCheck className="text-amber-600" size={24} /> Shortlisted Candidates
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Dedicated management for shortlisted students, interviews, and final selection
            </p>
          </div>
        </div>

        {toastMessage && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {toastMessage}
          </div>
        )}

        {/* Shortlisted Candidates Table / Cards */}
        <div className="space-y-4">
          {shortlistedList.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No shortlisted candidates yet. Discover matching students in Talent Matches and click Shortlist.
            </div>
          ) : (
            shortlistedList.map((app) => (
              <div
                key={app.id}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4 transition hover:border-[var(--accent)]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-lg shadow-md shrink-0">
                      {app.studentName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">{app.studentName}</h3>
                        <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-900">
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {app.studentDepartment} • Applied for <strong className="text-slate-800">{app.opportunityTitle}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl bg-emerald-100 px-4 py-1.5 text-base font-black text-emerald-900">
                      {app.matchScore}% Match
                    </span>
                  </div>
                </div>

                {/* Skills & Assessments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1 border-t">
                  <div className="space-y-1.5">
                    <div className="font-semibold text-slate-700">Top Verified Skills:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {app.topSkills.map((sk) => (
                        <span
                          key={sk.name}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-800"
                        >
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          {sk.name} ({sk.proficiency}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-semibold text-slate-700">Interview Status:</div>
                    {app.interviewDate ? (
                      <div className="rounded-xl border border-sky-200 bg-sky-50 p-2.5 text-sky-900 font-medium flex items-center gap-2">
                        <Calendar size={15} className="text-sky-600 shrink-0" />
                        <span>Scheduled: {app.interviewDate}</span>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 p-2.5 text-slate-500">
                        No interview scheduled yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 7 Actions: View Profile | Schedule Interview | Update Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                      className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Shortlisted">Status: Shortlisted</option>
                      <option value="Interview">Status: Interview</option>
                      <option value="Selected">Status: Selected (Hire)</option>
                      <option value="Rejected">Status: Rejected</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setScheduleModalApp(app)}
                      className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow"
                    >
                      <Calendar size={14} /> Schedule Interview
                    </button>
                    <a
                      href="/industry/applications"
                      className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Eye size={14} /> View Application
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Schedule Interview Modal */}
        {scheduleModalApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <form
              onSubmit={handleScheduleSubmit}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 relative"
            >
              <button
                type="button"
                onClick={() => setScheduleModalApp(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-slate-900">Schedule Interview</h3>
              <p className="text-xs text-slate-500">Candidate: {scheduleModalApp.studentName}</p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Agenda / Notes</label>
                <textarea
                  rows={3}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setScheduleModalApp(null)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-white shadow"
                >
                  <Send size={13} /> Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </LayoutIndustry>
  );
}
