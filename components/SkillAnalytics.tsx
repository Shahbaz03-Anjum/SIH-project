import React from 'react';
import type { Skill } from '../types';

function SmallBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full bg-slate-100 rounded">
      <div className="h-2 bg-sky-500 rounded" style={{ width: `${Math.max(6, value)}%` }} title={`${value}%`} />
    </div>
  );
}

export default function SkillAnalytics({ skills }: { skills: Skill[] }) {
  return (
    <section className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Skill Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm text-slate-500 mb-2">Skill distribution</h3>
          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-32 text-sm">{s.name}</div>
                <div className="flex-1">
                  <SmallBar value={s.proficiency} />
                </div>
                <div className="w-12 text-right text-sm">{s.proficiency}%</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-slate-500 mb-2">Readiness distribution</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-xs text-slate-400">High (85+)</div>
              <div className="text-xl font-semibold mt-2">120</div>
            </div>
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-xs text-slate-400">Medium (60-84)</div>
              <div className="text-xl font-semibold mt-2">210</div>
            </div>
            <div className":"p-3 bg-slate-50 rounded">
              <div className="text-xs text-slate-400">Low (<60)</div>
              <div className="text-xl font-semibold mt-2">102</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm text-slate-500">Skill-gap trends</h4>
            <p className="text-xs text-slate-400 mt-1">Trend visualizations should be populated from time-series assessment data. (mocked for demo)</p>
            <div className="mt-3 h-24 bg-slate-100 rounded flex items-center justify-center text-slate-400">Trend sparkline placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
