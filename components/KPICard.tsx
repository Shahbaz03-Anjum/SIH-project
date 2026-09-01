import React from 'react';

export default function KPICard({ title, value, subtitle, color = 'bg-[rgba(255,250,245,0.9)]' }: { title: string; value: string | number; subtitle?: string; color?: string; }) {
  return (
    <div className={`rounded-[22px] border border-[var(--border)] p-4 shadow-sm ${color}`}>
      <div className="text-sm font-medium text-[var(--muted)]">{title}</div>
      <div className="mt-2 text-3xl font-bold text-[var(--charcoal)]">{value}</div>
      {subtitle && <div className="mt-1 text-xs text-slate-500">{subtitle}</div>}
    </div>
  );
}
