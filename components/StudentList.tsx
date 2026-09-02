import React, { useMemo, useState } from 'react';
import type { Student } from '../types';

export default function StudentList({ students }: { students: Student[] }) {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const depts = useMemo(() => Array.from(new Set(students.map((s) => s.department))), [students]);

  const filtered = students.filter((s) => {
    const matchesQ = s.name.toLowerCase().includes(q.toLowerCase());
    const matchesDept = dept === 'All' || s.department === dept;
    return matchesQ && matchesDept;
  });
  const selectedStudent = students.find((student) => student.id === selectedId);

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
                <td className="py-3 font-medium text-[var(--charcoal)]"><button type="button" onClick={() => setSelectedId(s.id)} className="text-left hover:text-[var(--accent)]">{s.name}</button></td>
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

      {selectedStudent && (
        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div><h3 className="text-lg font-semibold text-[var(--charcoal)]">{selectedStudent.name}</h3><p className="text-sm text-[var(--muted)]">{selectedStudent.department} • {selectedStudent.internshipStatus}</p></div>
            <button type="button" onClick={() => setSelectedId(null)} className="text-xs text-[var(--muted)] hover:text-[var(--charcoal)]">Close details</button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div><div className="text-xs text-[var(--muted)]">Skill proficiency</div><div className="mt-2 space-y-2">{selectedStudent.topSkills.map((skill) => <div key={skill.id} className="flex justify-between text-sm"><span>{skill.name}{skill.verified ? ' (verified)' : ''}</span><b>{skill.proficiency}%</b></div>)}</div></div>
            <div><div className="text-xs text-[var(--muted)]">Assessment results</div><div className="mt-2 space-y-2">{selectedStudent.assessments.map((assessment) => <div key={assessment.id} className="flex justify-between text-sm"><span>{assessment.title}</span><b>{assessment.completed ? `${assessment.score}%` : 'Pending'}</b></div>)}</div></div>
            <div><div className="text-xs text-[var(--muted)]">Recommended training</div><div className="mt-2 text-sm">{selectedStudent.majorGaps.length ? selectedStudent.majorGaps.map((gap) => <a key={gap.id} href={`/academician/skill-gaps?skill=${encodeURIComponent(gap.name)}`} className="mb-2 block font-medium text-[var(--accent)]">{gap.name} upskilling track</a>) : 'No major gaps identified.'}</div></div>
          </div>
        </div>
      )}
    </section>
  );
}
