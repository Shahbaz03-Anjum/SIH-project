import React, { useEffect, useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import { Briefcase, Plus, Users, Calendar, MapPin, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { IndustryOpportunity } from '../../types';
import { getStoredOpportunities, saveOpportunities } from '../../lib/industryData';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<IndustryOpportunity[]>([]);

  useEffect(() => {
    setOpportunities(getStoredOpportunities());
  }, []);

  const toggleStatus = (id: string) => {
    const updated = opportunities.map((o) =>
      o.id === id ? { ...o, status: o.status === 'Active' ? ('Closed' as const) : ('Active' as const) } : o
    );
    setOpportunities(updated);
    saveOpportunities(updated);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
              <Briefcase size={24} className="text-sky-600" /> Opportunities Management
            </h2>
            <p className="text-sm text-[var(--muted)]">Manage active internships, full-time postings, and requirements</p>
          </div>
          <a
            href="/industry/post-opportunity"
            className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)] transition self-start"
          >
            <Plus size={16} /> Post New Opportunity
          </a>
        </div>

        {/* Opportunity Cards */}
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4 transition hover:border-[var(--accent)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{opp.title}</h3>
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                        opp.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opp.status}
                    </span>
                    <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-semibold text-sky-800">
                      {opp.category}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <span>{opp.company}</span>
                    <span>• {opp.workType} ({opp.location})</span>
                    <span>• Stipend: {opp.stipend}</span>
                    <span>• Duration: {opp.duration}</span>
                    <span>• Positions: {opp.openPositions}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(opp.id)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Set to {opp.status === 'Active' ? 'Closed' : 'Active'}
                  </button>
                  <a
                    href={`/industry/talent-matches?oppId=${opp.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100"
                  >
                    <Sparkles size={13} className="text-amber-600" /> AI Matches
                  </a>
                  <a
                    href="/industry/applications"
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    <Users size={13} /> {opp.applicantCount} Applicants
                  </a>
                </div>
              </div>

              {/* Skill Requirements breakdown */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-500" /> Configured Requirements & Importance Ratings:
                </div>
                <div className="flex flex-wrap gap-2">
                  {opp.skillRequirements.map((sr) => (
                    <span
                      key={sr.skill}
                      className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold ${
                        sr.type === 'Required'
                          ? 'bg-amber-100 border border-amber-300 text-amber-950'
                          : 'bg-sky-50 border border-sky-200 text-sky-900'
                      }`}
                    >
                      <span>{sr.skill}</span>
                      <span className="text-amber-600">{sr.type === 'Required' ? '⭐'.repeat(sr.importance) : ''}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({sr.type})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed border-t pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong className="text-slate-900">Eligibility:</strong> {opp.eligibility}
                </div>
                <div className="text-[11px] text-slate-400 font-medium shrink-0">
                  Posted on {opp.createdAt} • Deadline {opp.deadline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutIndustry>
  );
}
