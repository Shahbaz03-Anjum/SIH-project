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
    <section className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student" className="border px-2 py-1 rounded" />
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="border px-2 py-1 rounded">
            <option value="All">All departments</option>
            {depts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Department</th>
              <th className="py-2">Readiness</th>
              <th className="py-2">Top skills</th>
              <th className="py-2">Major gaps</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-3">{s.name}</td>
                <td className="py-3">{s.department}</td>
                <td className="py-3 text-center">{s.readiness}%</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    {s.topSkills.map((sk) => (
                      <span key={sk.id} className="text-xs bg-slate-100 px-2 py-1 rounded">{sk.name} {sk.proficiency}%</span>
                    ))}
                  </div>
                </td>
                <td className="py-3">
                  {s.majorGaps.map((g) => (
                    <span key={g.id} className="text-xs bg-rose-100 px-2 py-1 rounded mr-1">{g.name} {g.proficiency}%</span>
                  ))}
                </td>
                <td className="py-3">{s.internshipStatus || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
