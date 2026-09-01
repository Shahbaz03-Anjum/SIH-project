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
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPICard title="Total students" value={aggregatedKPIs.totalStudents} />
          <KPICard title="Students assessed" value={aggregatedKPIs.studentsAssessed} />
          <KPICard title="Avg Skill Readiness" value={`${aggregatedKPIs.avgSkillReadiness}%`} />
          <KPICard title="Internship/job ready" value={aggregatedKPIs.internshipsReady} />
          <KPICard title="Students w/ gaps" value={aggregatedKPIs.studentsWithSignificantGaps} />
          <KPICard title="Active opportunities" value={aggregatedKPIs.activeIndustryOppportunities} />
        </div>

        {/* Main grid: Skill Analytics + Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <SkillAnalytics skills={skillsMaster} />
            <StudentList students={students} />
          </div>

          <div className="space-y-4">
            <SkillGapInsights gaps={skillsMaster.filter((s) => s.proficiency < 65)} />
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Industry Demand Snapshot</h3>
              <p className="text-sm text-slate-500">Top demanded skills (mock)</p>
              <ul className="mt-3 space-y-2">
                <li className="flex justify-between">
                  <div>Python</div>
                  <div className="text-slate-600">Very High</div>
                </li>
                <li className="flex justify-between">
                  <div>AWS</div>
                  <div className="text-slate-600">High</div>
                </li>
                <li className="flex justify-between">
                  <div>React</div>
                  <div className="text-slate-600">Medium</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
