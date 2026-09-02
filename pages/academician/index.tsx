import React from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import KPICard from '../../components/KPICard';
import SkillAnalytics from '../../components/SkillAnalytics';
import StudentList from '../../components/StudentList';
import { students, aggregatedKPIs, skillsMaster, skillGaps, industryDemand } from '../../lib/mockData';

export default function AcademicianDashboardPage() {
  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <KPICard title="Total students" value={aggregatedKPIs.totalStudents} />
          <KPICard title="Students assessed" value={aggregatedKPIs.studentsAssessed} />
          <KPICard title="Avg Skill Readiness" value={`${aggregatedKPIs.avgSkillReadiness}%`} />
          <KPICard title="Internship/job ready" value={aggregatedKPIs.internshipsReady} />
          <KPICard title="Students w/ gaps" value={aggregatedKPIs.studentsWithSignificantGaps} />
          <KPICard title="Active opportunities" value={aggregatedKPIs.activeIndustryOppportunities} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <SkillAnalytics skills={skillsMaster} />
            <StudentList students={students} />
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-[var(--charcoal)]">Industry Demand Snapshot</h3>
              <p className="text-sm text-[var(--muted)]">Demand connected to learner readiness</p>
              <ul className="mt-3 space-y-2">
                {industryDemand.slice(0, 3).map((row) => <li key={row.skill} className="flex justify-between rounded-xl bg-[#f4e5b8] px-3 py-2 text-sm text-[var(--charcoal)]"><span>{row.skill}</span><span>{row.demand}% demand / {row.proficiency}% ready</span></li>)}
              </ul>
              <a href="/academician/industry-demand" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">Open demand intelligence</a>
            </div>
          </div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
