import React, { useMemo, useState } from 'react';
import type { Student } from '../types';

export default function StudentList({ students }: { students: Student[] }) {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');

  const depts = useMemo(() => Array.from(new Set(students.map((s) => s.department))), [students]);

  const filtered = students.filter((s) => {
    const matchesQ = s.name.toLowerCase().includes(q.toLowerCase());
    const matchesDept = dept === 'All' || s.department === dept;
    return matchesQ && matchesDept;
  });

  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[var(--charcoal)]">Students</h2>
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student" className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--charcoal)] outline-none focus:border-[var(--accent)]" />
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--charcoal)] outline-none focus:border-[var(--accent)]">
            <option value="All">All departments</option>
            {depts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[var(--muted)]">
            <tr>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Department</th>
              <th className="py-2 text-center">Readiness</th>
              <th className="py-2 text-left">Top skills</th>
              <th className="py-2 text-left">Major gaps</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-[var(--border)]">
                <td className="py-3 font-medium text-[var(--charcoal)]">{s.name}</td>
                <td className="py-3 text-[var(--muted)]">{s.department}</td>
                <td className="py-3 text-center font-medium text-[var(--charcoal)]">{s.readiness}%</td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-2">
                    {s.topSkills.map((sk) => (
                      <span key={sk.id} className="rounded-full bg-[var(--sage)] px-2 py-1 text-[10px] font-medium text-[var(--charcoal)]">{sk.name} {sk.proficiency}%</span>
                    ))}
                  </div>
                </td>
                <td className="py-3">
                  {s.majorGaps.map((g) => (
                    <span key={g.id} className="mr-1 rounded-full bg-[#f4d7d1] px-2 py-1 text-[10px] font-medium text-[var(--charcoal)]">{g.name} {g.proficiency}%</span>
                  ))}
                </td>
                <td className="py-3 text-[var(--muted)]">{s.internshipStatus || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
