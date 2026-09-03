import React from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  Briefcase,
  Users,
  PieChart,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  const applicantSkills = [
    { skill: 'Python', percentage: 92, count: 116 },
    { skill: 'SQL', percentage: 86, count: 108 },
    { skill: 'React', percentage: 71, count: 89 },
    { skill: 'JavaScript', percentage: 65, count: 82 },
    { skill: 'AWS', percentage: 38, count: 48 },
    { skill: 'Docker', percentage: 42, count: 53 }
  ];

  const identifiedGaps = [
    { skill: 'AWS Cloud Architecture', gapSeverity: 'High', missingRate: '62% of applicants deficient' },
    { skill: 'Docker Containerization', gapSeverity: 'Medium', missingRate: '58% of applicants deficient' },
    { skill: 'CI/CD Automated Pipelines', gapSeverity: 'High', missingRate: '74% of applicants deficient' },
    { skill: 'System Design', gapSeverity: 'Medium', missingRate: '45% of applicants deficient' }
  ];

  const opportunityPerformance = [
    { title: 'Full Stack Engineer Intern', views: 420, applicants: 126, shortlistRate: '19%', hired: 4 },
    { title: 'Data & Cloud Trainee', views: 290, applicants: 84, shortlistRate: '22%', hired: 3 },
    { title: 'Frontend React Developer', views: 180, applicants: 42, shortlistRate: '28%', hired: 1 }
  ];

  return (
    <LayoutIndustry>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
            <BarChart3 className="text-sky-600" size={24} /> Industry Recruitment & Talent Analytics
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Meaningful visual insights on recruitment funnels, skill distributions, and applicant gaps
          </p>
        </div>

        {/* 1. Funnel Visualization Card */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" /> Applicant-to-Selection Conversion Funnel
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-center">
              <div className="text-xs font-semibold text-sky-700">Total Applicants</div>
              <div className="mt-2 text-2xl font-black text-sky-950">126</div>
              <div className="mt-1 text-[10px] text-sky-600">100% Top of Funnel</div>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-center">
              <div className="text-xs font-semibold text-indigo-700">Under Review</div>
              <div className="mt-2 text-2xl font-black text-indigo-950">54</div>
              <div className="mt-1 text-[10px] text-indigo-600">42.8% Conversion</div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
              <div className="text-xs font-semibold text-amber-700">Shortlisted</div>
              <div className="mt-2 text-2xl font-black text-amber-950">24</div>
              <div className="mt-1 text-[10px] text-amber-600">19.0% Conversion</div>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-center">
              <div className="text-xs font-semibold text-purple-700">Interviews</div>
              <div className="mt-2 text-2xl font-black text-purple-950">12</div>
              <div className="mt-1 text-[10px] text-purple-600">9.5% Conversion</div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-100 p-4 text-center">
              <div className="text-xs font-semibold text-emerald-800">Hired / Selected</div>
              <div className="mt-2 text-2xl font-black text-emerald-950">8</div>
              <div className="mt-1 text-[10px] text-emerald-700 font-bold">6.3% Final Conversion</div>
            </div>
          </div>
        </div>

        {/* 2. Most Common Applicant Skills & Skill Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Common Skills */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> Most Common Applicant Skills
            </h3>

            <div className="space-y-3">
              {applicantSkills.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>{item.skill}</span>
                    <span>{item.count} Applicants ({item.percentage}%)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage >= 80 ? 'bg-emerald-500' : item.percentage >= 50 ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps Among Applicants */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-500" /> Applicant Skill Gaps & Shortfalls
            </h3>

            <div className="space-y-3">
              {identifiedGaps.map((gap) => (
                <div key={gap.skill} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{gap.skill}</div>
                    <div className="text-xs text-rose-700 font-medium">{gap.missingRate}</div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      gap.gapSeverity === 'High'
                        ? 'bg-rose-200 text-rose-900'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {gap.gapSeverity} Gap
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Opportunity Performance Metrics Table */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase size={18} className="text-sky-600" /> Opportunity Performance Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b">
                <tr>
                  <th className="p-3">Posting Title</th>
                  <th className="p-3">Posting Views</th>
                  <th className="p-3">Total Applicants</th>
                  <th className="p-3">Shortlist Rate</th>
                  <th className="p-3">Candidates Hired</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {opportunityPerformance.map((row) => (
                  <tr key={row.title} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.title}</td>
                    <td className="p-3">{row.views}</td>
                    <td className="p-3 font-bold text-sky-700">{row.applicants}</td>
                    <td className="p-3 font-bold text-amber-700">{row.shortlistRate}</td>
                    <td className="p-3 font-bold text-emerald-700">{row.hired} Hired</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutIndustry>
  );
}
