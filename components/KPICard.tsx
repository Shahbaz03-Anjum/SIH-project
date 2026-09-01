import React from 'react';

export default function KPICard({ title, value, subtitle, color = 'bg-white' }: { title: string; value: string | number; subtitle?: string; color?: string; }) {
  return (
    <div className={`p-4 rounded-lg shadow-sm ${color}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}
