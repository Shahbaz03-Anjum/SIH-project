import React, { useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import {
  Search,
  Filter,
  UserCheck,
  CheckCircle2,
  Award,
  BookOpen,
  X,
  Lock,
  Sparkles
} from 'lucide-react';
import { ExtendedCandidatePool, getStoredApplications, saveApplications } from '../../lib/industryData';
import { Student } from '../../types';

export default function CandidateDiscoveryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [minProficiency, setMinProficiency] = useState(0);
  const [minReadiness, setMinReadiness] = useState(0);
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Student | null>(null);

  const [applications, setApplications] = useState(getStoredApplications());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const departmentsList = [
    'All',
    'Computer Engineering',
    'Information Technology',
    'Computer Science',
    'Bsc-IT'
  ];

  const availableSkills = ['All', 'Python', 'SQL', 'React', 'AWS', 'Docker'];

  const filteredCandidates = ExtendedCandidatePool.filter((candidate) => {
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nameMatch = candidate.name.toLowerCase().includes(term);
      const skillMatch = candidate.topSkills.some((s) => s.name.toLowerCase().includes(term));
      if (!nameMatch && !skillMatch) return false;
    }

    // Skill filter
    if (skillFilter !== 'All') {
      const hasSkill = candidate.topSkills.some(
        (s) => s.name.toLowerCase() === skillFilter.toLowerCase() && s.proficiency >= minProficiency
      );
      if (!hasSkill) return false;
    }

    // Readiness filter
    if (candidate.readiness < minReadiness) return false;

    // Dept filter
    if (deptFilter !== 'All' && candidate.department !== deptFilter) return false;

    return true;
  });

  const handleShortlist = (candidate: Student) => {
    const existing = applications.find((a) => a.studentId === candidate.id);
    let updated = [...applications];
    if (existing) {
      updated = updated.map((a) => (a.studentId === candidate.id ? { ...a, status: 'Shortlisted' as const } : a));
    } else {
      updated.push({
        id: `app-${Date.now()}`,
        studentId: candidate.id,
        studentName: candidate.name,
        studentDepartment: candidate.department,
        opportunityId: 'opp-101',
        opportunityTitle: 'Full Stack Engineer Intern',
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Shortlisted',
        matchScore: candidate.readiness,
        matchBreakdown: {
          score: candidate.readiness,
          requiredMetCount: candidate.topSkills.length,
          requiredTotalCount: 4,
          positiveNotes: candidate.topSkills.map((s) => `${s.name} proficiency (${s.proficiency}%)`),
          gapNotes: candidate.majorGaps.map((g) => `${g.name} needs training`)
        },
        topSkills: candidate.topSkills,
        readiness: candidate.readiness
      });
    }

    setApplications(updated);
    saveApplications(updated);
    setToastMessage(`${candidate.name} shortlisted!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
              <Search className="text-[var(--accent)]" size={24} /> Candidate Discovery
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Discover students filtered by verified skills, proficiency, and readiness score
            </p>
          </div>
        </div>

        {toastMessage && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {toastMessage}
          </div>
        )}

        {/* Filter Controls Panel */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {/* Search Box */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Search Candidates / Skills</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Python, Aarav, SQL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            {/* Skill Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Filter by Skill</label>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              >
                {availableSkills.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Skill Proficiency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Min Proficiency %</label>
              <select
                value={minProficiency}
                onChange={(e) => setMinProficiency(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              >
                <option value={0}>Any Level</option>
                <option value={60}>&gt; 60% Basic</option>
                <option value={75}>&gt; 75% Proficient</option>
                <option value={85}>&gt; 85% Advanced</option>
              </select>
            </div>

            {/* Min Readiness Score */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Min Readiness Score</label>
              <select
                value={minReadiness}
                onChange={(e) => setMinReadiness(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              >
                <option value={0}>Any Readiness</option>
                <option value={60}>&gt; 60% Ready</option>
                <option value={80}>&gt; 80% High Readiness</option>
                <option value={90}>&gt; 90% Top Performers</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span>Department:</span>
              <div className="flex flex-wrap gap-1">
                {departmentsList.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDeptFilter(d)}
                    className={`rounded-lg px-2.5 py-1 transition ${
                      deptFilter === d
                        ? 'bg-[var(--accent)] text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-slate-500 font-semibold">
              Showing {filteredCandidates.length} students
            </div>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-[var(--accent)] transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-base shadow shrink-0">
                      {candidate.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{candidate.name}</h3>
                      <div className="text-xs text-slate-500">{candidate.department}</div>
                    </div>
                  </div>

                  <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                    {candidate.readiness}% Ready
                  </span>
                </div>

                {/* Top Skill Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Top Relevant Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.topSkills.map((sk) => (
                      <span
                        key={sk.name}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800"
                      >
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        {sk.name} ({sk.proficiency}%)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Assessment Scores */}
                <div className="text-xs text-slate-600 space-y-1 pt-1 border-t">
                  <div className="font-semibold text-slate-800">Verified Assessments:</div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.assessments.map((a) => (
                      <span key={a.id} className="rounded bg-sky-50 px-2 py-0.5 text-[11px] text-sky-800 font-medium">
                        {a.title}: {a.score ? `${a.score}%` : 'Passed'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 border-t pt-3">
                <button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleShortlist(candidate)}
                  className="flex-1 rounded-xl bg-[var(--accent)] py-2 text-xs font-semibold text-white shadow hover:bg-[var(--accent-strong)] transition"
                >
                  Shortlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 5 Requirement: Privacy-focused Candidate Profile Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-xl shadow">
                  {selectedCandidate.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedCandidate.department} • Readiness Score: {selectedCandidate.readiness}%</p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900 flex items-center gap-2">
                <Lock size={14} className="text-amber-600 shrink-0" />
                <span>
                  <strong>Privacy Notice:</strong> Showing relevant technical skills, assessment scores, and career readiness while preserving personal data privacy.
                </span>
              </div>

              {/* Verified Technical Skills */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Award size={16} className="text-emerald-600" /> Verified Technical Skills Matrix
                </h4>
                <div className="space-y-2">
                  {selectedCandidate.topSkills.map((sk) => (
                    <div key={sk.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{sk.name}</div>
                        <div className="text-xs text-slate-500">Verified via SkillConnect Lab Assessments</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-emerald-800">{sk.proficiency}%</div>
                        <div className="text-[10px] text-emerald-600 font-medium">Proficiency</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Records */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <BookOpen size={16} className="text-sky-600" /> Academic Assessment History
                </h4>
                <div className="space-y-2">
                  {selectedCandidate.assessments.map((a) => (
                    <div key={a.id} className="rounded-xl border border-slate-200 p-3 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{a.title}</span>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-extrabold text-emerald-800">
                        {a.score ? `Score: ${a.score}%` : 'Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center gap-3 pt-3 border-t">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close Profile
                </button>
                <button
                  onClick={() => {
                    handleShortlist(selectedCandidate);
                    setSelectedCandidate(null);
                  }}
                  className="flex-1 rounded-xl bg-[var(--accent)] py-2.5 text-xs font-semibold text-white shadow hover:bg-[var(--accent-strong)]"
                >
                  Shortlist Candidate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutIndustry>
  );
}
