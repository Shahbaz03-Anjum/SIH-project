import React, { useState, useEffect } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import {
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  Calendar,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { CandidateApplication, ApplicationStatus } from '../../types';
import { getStoredApplications, saveApplications } from '../../lib/industryData';

const pipelineStages: ApplicationStatus[] = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Selected',
  'Rejected'
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<CandidateApplication | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setApplications(getStoredApplications());
  }, []);

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    saveApplications(updated);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    setToastMessage(`Status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
              <Users className="text-sky-600" size={24} /> Application Management System
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Track and transition candidates across the recruitment pipeline
            </p>
          </div>
        </div>

        {toastMessage && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {toastMessage}
          </div>
        )}

        {/* Section 6 Requirement: Pipeline Visual Workflow Bar */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recruitment Stage Pipeline Workflow
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-semibold">
            {pipelineStages.map((stage, i) => {
              const stageCount = applications.filter((a) => a.status === stage).length;
              return (
                <div
                  key={stage}
                  className={`rounded-2xl p-3 border transition ${
                    stage === 'Selected'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                      : stage === 'Rejected'
                      ? 'border-rose-200 bg-rose-50 text-rose-800'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="text-xs text-slate-500 font-medium">{stage}</div>
                  <div className="mt-1 text-lg font-black">{stageCount}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kanban Board / Pipeline Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => {
            const stageApps = applications.filter((a) => a.status === stage);

            return (
              <div key={stage} className="rounded-3xl border border-[var(--border)] bg-slate-100/70 p-3 space-y-3 shrink-0 min-w-[200px]">
                <div className="flex items-center justify-between px-1">
                  <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">{stage}</span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm space-y-3 hover:border-[var(--accent)] transition cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-xs shrink-0">
                          {app.studentName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-xs truncate">{app.studentName}</div>
                          <div className="text-[11px] text-slate-500 truncate">{app.studentDepartment}</div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-1">
                        <div className="font-semibold text-slate-800 truncate">{app.opportunityTitle}</div>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            {app.matchScore}% Match
                          </span>
                          <span className="text-[10px] text-slate-400">{app.appliedDate}</span>
                        </div>
                      </div>

                      {/* Quick Status Advance Button */}
                      <div className="border-t pt-2 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                          className="text-[11px] font-semibold text-slate-700 bg-slate-100 rounded px-2 py-1 border-none focus:outline-none cursor-pointer"
                        >
                          {pipelineStages.map((s) => (
                            <option key={s} value={s}>
                              Move to: {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {stageApps.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-[11px] text-slate-400">
                      No candidates in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Candidate Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-base shadow">
                    {selectedApp.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{selectedApp.studentName}</h3>
                    <p className="text-xs text-slate-500">{selectedApp.studentDepartment} • Applied: {selectedApp.appliedDate}</p>
                  </div>
                </div>
                <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
                  {selectedApp.matchScore}% AI Match
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-slate-700">Target Role:</div>
                <div className="font-bold text-slate-900 text-sm">{selectedApp.opportunityTitle}</div>
              </div>

              {/* Status Selector */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <label className="block text-xs font-bold text-slate-800">Update Application Status:</label>
                <div className="flex flex-wrap gap-2">
                  {pipelineStages.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedApp.id, s)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        selectedApp.status === s
                          ? 'bg-[var(--accent)] text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Match Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" /> AI Skill Verification:
                </div>
                <div className="rounded-xl border border-slate-200 p-3 space-y-1 bg-white">
                  {selectedApp.matchBreakdown.positiveNotes.map((n, i) => (
                    <div key={i} className="text-emerald-800 font-medium">✓ {n}</div>
                  ))}
                  {selectedApp.matchBreakdown.gapNotes.map((n, i) => (
                    <div key={i} className="text-amber-800 font-medium">⚠️ {n}</div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-3 border-t">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutIndustry>
  );
}
