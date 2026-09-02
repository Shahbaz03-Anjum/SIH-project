import React, { useMemo, useState } from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import { assessmentSummaries, opportunities, reportsOverview, skillGaps, students, trainingRecommendations } from '../../lib/mockData';

const filters = ['All courses', 'Python', 'React', 'AWS', 'SQL'];

export default function ReportsPage() {
  const [selectedCourse, setSelectedCourse] = useState('All courses');
  const averageReadiness = Math.round(students.reduce((sum, student) => sum + student.readiness, 0) / students.length);
  const completedAssessments = students.reduce((sum, student) => sum + student.assessments.filter((assessment) => assessment.completed).length, 0);
  const allAssessments = students.reduce((sum, student) => sum + student.assessments.length, 0);
  const averageScore = Math.round(assessmentSummaries.reduce((sum, item) => sum + item.score, 0) / assessmentSummaries.length);

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
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Students in cohort</p><p className="text-3xl font-bold mt-2">{students.length}</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Student readiness</p><p className="text-3xl font-bold mt-2">{averageReadiness}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Assessment performance</p><p className="text-3xl font-bold mt-2">{averageScore}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Active opportunities</p><p className="text-3xl font-bold mt-2">{opportunities.length}</p></div>
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
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Critical skill gaps</p><p className="text-2xl font-bold mt-2">{skillGaps.filter((gap) => gap.priority === 'Critical').length}</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Assessment completion</p><p className="text-2xl font-bold mt-2">{allAssessments ? Math.round((completedAssessments / allAssessments) * 100) : 0}%</p></div>
          <div className="bg-white p-5 rounded-lg shadow-sm"><p className="text-sm text-slate-500">Training tracks available</p><p className="text-2xl font-bold mt-2">{trainingRecommendations.length}</p></div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
