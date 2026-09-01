import React from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import KPICard from '../../components/KPICard';
import SkillAnalytics from '../../components/SkillAnalytics';
import SkillGapInsights from '../../components/SkillGapInsights';
import StudentList from '../../components/StudentList';
import { students, aggregatedKPIs, skillsMaster } from '../../lib/mockData';

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
            <SkillGapInsights gaps={skillsMaster.filter((s) => s.proficiency < 65)} />
            <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-[var(--charcoal)]">Industry Demand Snapshot</h3>
              <p className="text-sm text-[var(--muted)]">Top demanded skills (mock)</p>
              <ul className="mt-3 space-y-2">
                <li className="flex justify-between rounded-xl bg-[#f4e5b8] px-3 py-2 text-sm text-[var(--charcoal)]">
                  <span>Python</span>
                  <span>Very High</span>
                </li>
                <li className="flex justify-between rounded-xl bg-[var(--sage)] px-3 py-2 text-sm text-[var(--charcoal)]">
                  <span>AWS</span>
                  <span>High</span>
                </li>
                <li className="flex justify-between rounded-xl bg-[#f4d7d1] px-3 py-2 text-sm text-[var(--charcoal)]">
                  <span>React</span>
                  <span>Medium</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
