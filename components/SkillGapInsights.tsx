import React from 'react';
import type { Skill } from '../types';

export default function SkillGapInsights({ gaps }: { gaps: Skill[] }) {
  return (
    <section className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Skill Gap Insights</h2>
      <div className="space-y-3">
        {gaps.map((g) => (
          <div key={g.id} className="flex items-center justify-between border-b pb-3">
            <div>
              <div className="font-medium">{g.name}</div>
              <div className="text-xs text-slate-500">Student proficiency: {g.proficiency}% • Industry demand: High</div>
            </div>

            <div className="text-right">
              <div className="text-sm text-slate-700">Students affected: {Math.round((100 - g.proficiency) * 2)}</div>
              <button className="mt-2 px-3 py-1 rounded bg-sky-600 text-white text-sm">Recommend Training</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
