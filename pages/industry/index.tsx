import React, { useEffect, useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import KPICard from '../../components/KPICard';
import {
  Briefcase,
  Users,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Search,
  MessageSquarePlus,
  Zap,
  Calendar
} from 'lucide-react';
import {
  ExtendedCandidatePool,
  calculateCandidateMatch,
  getStoredApplications,
  getStoredOpportunities,
  getStoredFeedback
} from '../../lib/industryData';

export default function IndustryDashboardPage() {
  const [opportunities, setOpportunities] = useState(getStoredOpportunities());
  const [applications, setApplications] = useState(getStoredApplications());
  const [feedback, setFeedback] = useState(getStoredFeedback());

  useEffect(() => {
    setOpportunities(getStoredOpportunities());
    setApplications(getStoredApplications());
    setFeedback(getStoredFeedback());
  }, []);

  const activeOppsCount = opportunities.filter((o) => o.status === 'Active').length;
  const totalApplicants = applications.length * 25 + 100; // Simulated active metric
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length * 6 + 18;
  const interviewsCount = applications.filter((a) => a.status === 'Interview').length * 4 + 8;
  const selectedCount = applications.filter((a) => a.status === 'Selected').length * 2 + 6;
  const availableMatchesCount = ExtendedCandidatePool.length * 12 + 9;

  // Compute top AI matches for primary opportunity (Full Stack Engineer Intern)
  const primaryOpp = opportunities[0];
  const topMatchedCandidates = ExtendedCandidatePool.map((candidate) => {
    const breakdown = calculateCandidateMatch(candidate, primaryOpp ? primaryOpp.skillRequirements : []);
    return {
      candidate,
      breakdown
    };
  })
    .sort((a, b) => b.breakdown.score - a.breakdown.score)
    .slice(0, 3);

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Main Goal Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#101c1a] via-[#1a2927] to-[#243a36] p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ef6d52]/20 to-amber-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Zap size={14} /> Core Recruitment Lifecycle
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              SkillConnect Recruitment Engine
            </h2>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold text-slate-200">
              <span className="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                1. Define Requirements
              </span>
              <span className="text-amber-400">➔</span>
              <span className="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                2. Find Matching Students
              </span>
              <span className="text-amber-400">➔</span>
              <span className="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10">
                3. Recruit & Interview
              </span>
              <span className="text-amber-400">➔</span>
              <span className="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10 text-amber-300">
                4. Give Feedback
              </span>
            </div>
          </div>
        </div>

        {/* 1. Dashboard Overview KPIs */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--charcoal)]">Recruitment Metrics Overview</h2>
            <span className="text-xs text-[var(--muted)]">Real-time status</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Active Opportunities</div>
              <div className="mt-2 text-2xl font-extrabold text-[var(--charcoal)]">{activeOppsCount}</div>
              <div className="mt-1 text-[11px] text-emerald-600 font-medium">4 Total Postings</div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Total Applicants</div>
              <div className="mt-2 text-2xl font-extrabold text-[var(--charcoal)]">{totalApplicants}</div>
              <div className="mt-1 text-[11px] text-sky-600 font-medium">+18 this week</div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Shortlisted</div>
              <div className="mt-2 text-2xl font-extrabold text-[var(--charcoal)]">{shortlistedCount}</div>
              <div className="mt-1 text-[11px] text-amber-600 font-medium">Ready for interview</div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Interviews</div>
              <div className="mt-2 text-2xl font-extrabold text-[var(--charcoal)]">{interviewsCount}</div>
              <div className="mt-1 text-[11px] text-indigo-600 font-medium">Scheduled</div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Selected Candidates</div>
              <div className="mt-2 text-2xl font-extrabold text-emerald-700">{selectedCount}</div>
              <div className="mt-1 text-[11px] text-emerald-600 font-medium">Offers released</div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-[var(--muted)]">Talent Matches</div>
              <div className="mt-2 text-2xl font-extrabold text-[var(--accent)]">{availableMatchesCount}</div>
              <div className="mt-1 text-[11px] text-[var(--accent)] font-medium">&gt; 75% Match</div>
            </div>
          </div>
        </div>

        {/* Middle Section: Top AI Skill Matches & Applications Funnel */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top AI Skill Matches */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--charcoal)] flex items-center gap-2">
                    <Sparkles className="text-[var(--accent)]" size={18} /> Top AI Skill Matches
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Matched against: <span className="font-semibold text-slate-800">{primaryOpp?.title || 'Full Stack Intern'}</span>
                  </p>
                </div>
                <a
                  href="/industry/talent-matches"
                  className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  View All Matches <ArrowRight size={13} />
                </a>
              </div>

              <div className="space-y-3">
                {topMatchedCandidates.map(({ candidate, breakdown }) => (
                  <div
                    key={candidate.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-[var(--accent)] hover:bg-amber-50/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-base shadow">
                          {candidate.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{candidate.name}</div>
                          <div className="text-xs text-slate-500">{candidate.department} • Readiness {candidate.readiness}%</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-extrabold text-emerald-800">
                          {breakdown.score}% Match
                        </span>
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {candidate.topSkills.map((sk) => (
                        <span
                          key={sk.name}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          <CheckCircle2 size={12} className="text-emerald-600" /> {sk.name} ({sk.proficiency}%)
                        </span>
                      ))}
                    </div>

                    {/* Why Matched Reason Breakdown */}
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700 space-y-1">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-500" /> Why this match:
                      </div>
                      {breakdown.positiveNotes.slice(0, 3).map((note, i) => (
                        <div key={i} className="text-emerald-700 flex items-center gap-1.5">
                          <span>{note}</span>
                        </div>
                      ))}
                      {breakdown.gapNotes.slice(0, 1).map((note, i) => (
                        <div key={i} className="text-amber-700 flex items-center gap-1.5">
                          <span>⚠️ {note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities List Quick View */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--charcoal)] flex items-center gap-2">
                  <Briefcase size={18} className="text-sky-600" /> Active Job / Internship Postings
                </h3>
                <a href="/industry/post-opportunity" className="text-xs font-semibold text-[var(--accent)] hover:underline">
                  + Create New Posting
                </a>
              </div>

              <div className="space-y-3">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 p-4 gap-3 bg-slate-50/50">
                    <div>
                      <div className="font-bold text-slate-900">{opp.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {opp.category} • {opp.workType} • {opp.stipend} • Deadline: {opp.deadline}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {opp.skillRequirements.map((sr) => (
                          <span
                            key={sr.skill}
                            className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                              sr.type === 'Required'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {sr.skill} {sr.type === 'Required' ? '⭐'.repeat(sr.importance) : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">{opp.applicantCount}</div>
                        <div className="text-[11px] text-slate-500">Applicants</div>
                      </div>
                      <a
                        href="/industry/applications"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Manage
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Funnel & Ecosystem Linkage */}
          <div className="space-y-6">
            {/* Recruitment Funnel Card */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[var(--charcoal)] flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" /> Recruitment Funnel
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Applied</span>
                    <span>126 Candidates</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Under Review</span>
                    <span>54 Candidates</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Shortlisted</span>
                    <span>24 Candidates</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '19%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Interview</span>
                    <span>12 Candidates</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Selected</span>
                    <span>8 Candidates</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '6%' }}></div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <a
                  href="/industry/analytics"
                  className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center justify-between"
                >
                  <span>View Full Analytics</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Ecosystem Feedback Linkage Card */}
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <MessageSquarePlus size={16} /> SkillConnect Ecosystem Loop
              </div>
              <h4 className="font-bold text-slate-900 text-base">Your Feedback Shapes College Curriculum</h4>
              <p className="text-xs text-slate-650 leading-relaxed">
                When you evaluate candidates or complete internships, your structured feedback updates the mentor's <strong>Skill Gap Intelligence</strong> dashboard, ensuring next-semester students learn exact required skills like AWS, Docker, or React.
              </p>
              <a
                href="/industry/feedback"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-800 transition"
              >
                Submit Internship Feedback <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutIndustry>
  );
}
