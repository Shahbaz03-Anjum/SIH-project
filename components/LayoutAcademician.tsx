import React, { ReactNode } from 'react';

const nav = [
  { label: 'Dashboard', href: '/academician' },
  { label: 'Students', href: '/academician/students' },
  { label: 'Skill Analytics', href: '/academician/analytics' },
  { label: 'Skill Gaps', href: '/academician/skill-gaps' },
  { label: 'Industry Demand', href: '/academician/industry-demand' },
  { label: 'Assessments', href: '/academician/assessments' },
  { label: 'Opportunities', href: '/academician/opportunities' },
  { label: 'Reports', href: '/academician/reports' },
  { label: 'Profile', href: '/academician/profile' }
];

export default function LayoutAcademician({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r px-4 py-6">
        <div className="text-xl font-semibold mb-6">SkillConnect</div>
        <nav className="space-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="block px-3 py-2 rounded hover:bg-slate-100 text-slate-700">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Academician Dashboard</h1>
            <p className="text-sm text-slate-500">Department / Institution overview</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-3 py-2 rounded bg-white border">Notifications</button>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-slate-200 h-9 w-9" />
              <div className="text-sm">Dr. Anjum</div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
