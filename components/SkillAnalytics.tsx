import React from 'react';
import type { Skill } from '../types';

function SmallBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-[#e9e3d9]">
      <div className="h-2.5 rounded-full bg-[var(--accent)]" style={{ width: `${Math.max(6, value)}%` }} title={`${value}%`} />
    </div>
  );
}

export default function SkillAnalytics({ skills }: { skills: Skill[] }) {
  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[var(--charcoal)]">Skill Analytics</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-[var(--muted)]">Skill distribution</h3>
          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-32 text-sm text-[var(--charcoal)]">{s.name}</div>
                <div className="flex-1">
                  <SmallBar value={s.proficiency} />
                </div>
                <div className="w-12 text-right text-sm text-[var(--charcoal)]">{s.proficiency}%</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-[var(--muted)]">Readiness distribution</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-[var(--sage)] p-3">
              <div className="text-xs text-[var(--muted)]">High (85+)</div>
              <div className="mt-2 text-xl font-bold text-[var(--charcoal)]">120</div>
            </div>
            <div className="rounded-2xl bg-[#f4e5b8] p-3">
              <div className="text-xs text-[var(--muted)]">Medium (60-84)</div>
              <div className="mt-2 text-xl font-bold text-[var(--charcoal)]">210</div>
            </div>
            <div className="rounded-2xl bg-[#f4d7d1] p-3">
              <div className="text-xs text-[var(--muted)]">Low (&lt;60)</div>
              <div className="mt-2 text-xl font-bold text-[var(--charcoal)]">102</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-[var(--muted)]">Skill-gap trends</h4>
            <p className="mt-1 text-xs text-slate-500">Trend visualizations should be populated from time-series assessment data. (mocked for demo)</p>
            <div className="mt-3 flex h-24 items-center justify-center rounded-2xl bg-[#f0ece6] text-slate-500">Trend sparkline placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
