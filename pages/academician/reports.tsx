import React, { useMemo, useState } from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import { reportsOverview } from '../../lib/mockData';

const filters = ['All courses', 'Python', 'React', 'AWS', 'SQL'];

export default function ReportsPage() {
  const [selectedCourse, setSelectedCourse] = useState('All courses');

  const filteredTrend = useMemo(() => {
    if (selectedCourse === 'All courses') return reportsOverview.monthlyTrend;
    return reportsOverview.monthlyTrend.map((value) => Math.max(52, value - 4));
  }, [selectedCourse]);

  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Reports</h2>
            <p className="text-sm text-slate-500 mt-1">Department-level analytics for learning outcomes and performance.</p>
          </div>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
            {filters.map((filter) => <option key={filter} value={filter}>{filter}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Total students</p><p className="text-3xl font-bold mt-2">{reportsOverview.totalStudents}</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Course completion</p><p className="text-3xl font-bold mt-2">{reportsOverview.completionRate}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Assessment performance</p><p className="text-3xl font-bold mt-2">{reportsOverview.assessmentPerformance}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Placement rate</p><p className="text-3xl font-bold mt-2">{reportsOverview.placementRate}%</p></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Performance trend</h3>
            <div className="mt-4 flex h-44 items-end gap-3">
              {filteredTrend.map((value, index) => (
                <div key={`${value}-${index}`} className="flex-1">
                  <div className="flex h-32 items-end justify-center">
                    <div className="w-full rounded-t bg-sky-500/80" style={{ height: `${value}%` }} />
                  </div>
                  <div className="mt-2 text-center text-xs text-slate-500">M{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Score distribution</h3>
            <div className="mt-4 space-y-3">
              {reportsOverview.scoreDistribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm text-slate-600">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 rounded bg-slate-100">
                    <div className="h-2 rounded bg-emerald-500" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Skill gap rate</p><p className="text-2xl font-bold mt-2">{reportsOverview.skillGapRate}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Training participation</p><p className="text-2xl font-bold mt-2">{reportsOverview.trainingParticipation}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Recommended interventions</p><p className="text-2xl font-bold mt-2">18</p></div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
