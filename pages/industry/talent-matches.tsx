import React, { useState, useEffect } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import { useRouter } from 'next/router';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Calendar,
  Eye,
  Filter,
  Search,
  Award
} from 'lucide-react';
import {
  ExtendedCandidatePool,
  calculateCandidateMatch,
  getStoredOpportunities,
  getStoredApplications,
  saveApplications
} from '../../lib/industryData';

export default function TalentMatchesPage() {
  const router = useRouter();
  const { oppId } = router.query;

  const [opportunities, setOpportunities] = useState(getStoredOpportunities());
  const [selectedOppId, setSelectedOppId] = useState<string>('');
  const [minMatchFilter, setMinMatchFilter] = useState<number>(60);
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState(getStoredApplications());
  const [shortlistedSuccess, setShortlistedSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadedOpps = getStoredOpportunities();
    setOpportunities(loadedOpps);
    if (oppId && typeof oppId === 'string') {
      setSelectedOppId(oppId);
    } else if (loadedOpps.length > 0) {
      setSelectedOppId(loadedOpps[0].id);
    }
  }, [oppId]);

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0];

  // Calculate AI match scores for candidate pool
  const candidateMatches = ExtendedCandidatePool.map((candidate) => {
    const breakdown = calculateCandidateMatch(
      candidate,
      selectedOpp ? selectedOpp.skillRequirements : []
    );
    return { candidate, breakdown };
  })
    .filter(({ candidate, breakdown }) => {
      if (breakdown.score < minMatchFilter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          candidate.name.toLowerCase().includes(term) ||
          candidate.department.toLowerCase().includes(term) ||
          candidate.topSkills.some((s) => s.name.toLowerCase().includes(term))
        );
      }
      return true;
    })
    .sort((a, b) => b.breakdown.score - a.breakdown.score);

  const shortlistCandidate = (candidateName: string, studentId: string) => {
    // Check if app already exists or add to applications as Shortlisted
    const existing = applications.find((a) => a.studentId === studentId);
    let updatedApps = [...applications];
    if (existing) {
      updatedApps = updatedApps.map((a) =>
        a.studentId === studentId ? { ...a, status: 'Shortlisted' as const } : a
      );
    } else {
      updatedApps.push({
        id: `app-${Date.now()}`,
        studentId,
        studentName: candidateName,
        studentDepartment: 'Engineering',
        opportunityId: selectedOpp.id,
        opportunityTitle: selectedOpp.title,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Shortlisted',
        matchScore: candidateMatches.find((m) => m.candidate.id === studentId)?.breakdown.score || 85,
        matchBreakdown: candidateMatches.find((m) => m.candidate.id === studentId)?.breakdown || {
          score: 85,
          requiredMetCount: 2,
          requiredTotalCount: 2,
          positiveNotes: ['Matches opportunity criteria'],
          gapNotes: []
        },
        topSkills: ExtendedCandidatePool.find((c) => c.id === studentId)?.topSkills || [],
        readiness: 85
      });
    }

    setApplications(updatedApps);
    saveApplications(updatedApps);
    setShortlistedSuccess(`${candidateName} has been added to Shortlisted candidates!`);
    setTimeout(() => setShortlistedSuccess(null), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
              <Sparkles className="text-[var(--accent)]" size={24} /> AI Skill Matching Engine
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Candidates dynamically ranked by Skill Match % and detailed requirement verification
            </p>
          </div>
        </div>

        {shortlistedSuccess && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {shortlistedSuccess}
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Opportunity Requirements</label>
              <select
                value={selectedOppId}
                onChange={(e) => setSelectedOppId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-semibold text-slate-800 focus:border-[var(--accent)] focus:outline-none"
              >
                {opportunities.map((opp) => (
                  <option key={opp.id} value={opp.id}>
                    {opp.title} ({opp.skillRequirements.map((s) => s.skill).join(', ')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Minimum Match Threshold</label>
              <select
                value={minMatchFilter}
                onChange={(e) => setMinMatchFilter(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-semibold text-slate-800 focus:border-[var(--accent)] focus:outline-none"
              >
                <option value={50}>50%+ Match</option>
                <option value={60}>60%+ Match</option>
                <option value={75}>75%+ Match (Recommended)</option>
                <option value={85}>85%+ High Match Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Search Candidate / Skill</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search candidate name or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Display Target Opportunity Requirements */}
          {selectedOpp && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-950 flex flex-wrap items-center gap-2">
              <span className="font-bold flex items-center gap-1">
                <Sparkles size={13} className="text-amber-600" /> Evaluating Requirements:
              </span>
              {selectedOpp.skillRequirements.map((sr) => (
                <span
                  key={sr.skill}
                  className="rounded-lg bg-white px-2.5 py-1 font-semibold border border-amber-200 text-slate-800"
                >
                  {sr.skill} {sr.type === 'Required' ? '⭐'.repeat(sr.importance) : ''} ({sr.type})
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ranked Candidate Matches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 px-1">
            <span>Ranked Candidates ({candidateMatches.length} Found)</span>
            <span className="text-xs text-[var(--muted)]">AI Skill Alignment Powered</span>
          </div>

          {candidateMatches.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No candidates found matching the selected threshold filter. Try lowering the minimum match percentage.
            </div>
          ) : (
            candidateMatches.map(({ candidate, breakdown }) => (
              <div
                key={candidate.id}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4 transition hover:border-[var(--accent)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-lg shadow-md shrink-0">
                      {candidate.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                          {candidate.department}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Readiness Score: <strong className="text-emerald-700">{candidate.readiness}%</strong> • Assessments Completed: {candidate.assessments.length}
                      </div>
                    </div>
                  </div>

                  {/* Score Badge & Quick Action */}
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <div className="text-right">
                      <div className="inline-block rounded-2xl bg-emerald-100 border border-emerald-300 px-4 py-1.5 text-xl font-black text-emerald-900 shadow-sm">
                        {breakdown.score}% Match
                      </div>
                    </div>

                    <button
                      onClick={() => shortlistCandidate(candidate.name, candidate.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-[var(--accent-strong)] transition"
                    >
                      <UserCheck size={14} /> Shortlist Candidate
                    </button>
                  </div>
                </div>

                {/* Candidate Skill Badges */}
                <div className="flex flex-wrap gap-2 pt-1 border-t">
                  {candidate.topSkills.map((sk) => (
                    <span
                      key={sk.name}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {sk.name} <span className="text-emerald-700">({sk.proficiency}%)</span>
                    </span>
                  ))}
                </div>

                {/* Section 4 Highlight: Match Reasons Breakdown (Why they matched) */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles size={15} className="text-amber-500" /> Match Evaluation Breakdown:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="font-semibold text-emerald-800 mb-1">Strengths & Verification:</div>
                      {breakdown.positiveNotes.map((note, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-emerald-900 font-medium">
                          <span>✓ {note}</span>
                        </div>
                      ))}
                    </div>

                    {breakdown.gapNotes.length > 0 && (
                      <div className="space-y-1">
                        <div className="font-semibold text-amber-800 mb-1">Areas for Improvement:</div>
                        {breakdown.gapNotes.map((note, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-amber-900 font-medium">
                            <AlertTriangle size={13} className="text-amber-600 shrink-0" />
                            <span>⚠️ {note}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutIndustry>
  );
}
