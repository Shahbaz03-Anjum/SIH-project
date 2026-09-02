import React from 'react';
import { industryDemand, skillGapTrendData, students } from '../lib/mockData';
import type { Skill } from '../types';

const trendSkills = [
  { name: 'AWS', color: '#ef6d52' },
  { name: 'Python', color: '#2f7d72' },
  { name: 'SQL', color: '#c58b32' },
  { name: 'React', color: '#4d78a8' },
  { name: 'Docker', color: '#8b5e83' }
] as const;

const chart = { width: 640, height: 260, left: 42, right: 16, top: 18, bottom: 34 };
const chartWidth = chart.width - chart.left - chart.right;
const chartHeight = chart.height - chart.top - chart.bottom;
const pointX = (index: number) => chart.left + (index * chartWidth) / (skillGapTrendData.length - 1);
const pointY = (value: number) => chart.top + (value / 70) * chartHeight;

function SmallBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-[#e9e3d9]">
      <div className="h-2.5 rounded-full bg-[var(--accent)]" style={{ width: `${Math.max(6, value)}%` }} title={`${value}%`} />
    </div>
  );
}

function SkillGapTrendChart() {
  const criticalThreshold = 40;

  return (
    <div className="mt-3 rounded-2xl bg-[#f0ece6] p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span>Gap score (% of assessed learners below target)</span>
        <span className="font-medium text-[var(--charcoal)]">Lower is better</span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-auto min-w-[520px] w-full" role="img" aria-labelledby="trend-chart-title trend-chart-description">
          <title id="trend-chart-title">Skill-gap scores over the last six months</title>
          <desc id="trend-chart-description">AWS, Python, SQL, and Docker gaps are closing. The React gap is widening and is the only worsening trend.</desc>
          {[0, 20, 40, 60].map((value) => (
            <g key={value}>
              <line x1={chart.left} x2={chart.width - chart.right} y1={pointY(value)} y2={pointY(value)} stroke="#d8d0c5" strokeWidth="1" />
              <text x={chart.left - 8} y={pointY(value) + 4} textAnchor="end" fontSize="11" fill="#60706a">{value}%</text>
            </g>
          ))}
          <line x1={chart.left} x2={chart.width - chart.right} y1={pointY(criticalThreshold)} y2={pointY(criticalThreshold)} stroke="#b85d4d" strokeDasharray="5 4" strokeWidth="1.5" />
          <text x={chart.width - chart.right} y={pointY(criticalThreshold) - 6} textAnchor="end" fontSize="10" fill="#a34e40">Critical threshold</text>
          {skillGapTrendData.map((point, index) => (
            <text key={point.month} x={pointX(index)} y={chart.height - 10} textAnchor="middle" fontSize="11" fill="#60706a">{point.month}</text>
          ))}
          {trendSkills.map((skill) => {
            const points = skillGapTrendData.map((point, index) => `${pointX(index)},${pointY(point[skill.name])}`).join(' ');
            return (
              <g key={skill.name}>
                <polyline points={points} fill="none" stroke={skill.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {skillGapTrendData.map((point, index) => (
                  <circle key={`${skill.name}-${point.month}`} cx={pointX(index)} cy={pointY(point[skill.name])} r="4" fill={skill.color}>
                    <title>{`${skill.name}, ${point.month}: ${point[skill.name]}% gap`}</title>
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#ddd5ca] pt-3">
        {trendSkills.map((skill) => {
          const first = skillGapTrendData[0][skill.name];
          const latest = skillGapTrendData[skillGapTrendData.length - 1][skill.name];
          const improving = latest < first;
          return (
            <div key={skill.name} className="flex items-center gap-1.5 text-xs text-[var(--charcoal)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: skill.color }} />
              <span>{skill.name}</span>
              <span className={improving ? 'text-[#2f7d72]' : 'text-[#b85d4d]'}>{improving ? 'Improving' : 'Worsening'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillAnalytics({ skills }: { skills: Skill[] }) {
  const [selectedSkill, setSelectedSkill] = React.useState(skills[0]?.name ?? '');
  const averageProficiency = Math.round(skills.reduce((sum, skill) => sum + skill.proficiency, 0) / skills.length);
  const assessed = students.reduce((sum, student) => sum + student.assessments.filter((assessment) => assessment.completed).length, 0);
  const assessmentCount = students.reduce((sum, student) => sum + student.assessments.length, 0);
  const verified = skills.filter((skill) => skill.verified).length;
  const selectedDemand = industryDemand.find((row) => row.skill === selectedSkill);
  const readiness = [
    { label: 'High (85+)', value: students.filter((student) => student.readiness >= 85).length, className: 'bg-[var(--sage)]' },
    { label: 'Medium (60-84)', value: students.filter((student) => student.readiness >= 60 && student.readiness < 85).length, className: 'bg-[#f4e5b8]' },
    { label: 'Low (<60)', value: students.filter((student) => student.readiness < 60).length, className: 'bg-[#f4d7d1]' }
  ];
  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[var(--charcoal)]">Skill Analytics</h2>

      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="rounded-2xl bg-[var(--sage)] p-3"><div className="text-xs text-[var(--muted)]">Average proficiency</div><div className="mt-1 text-xl font-bold">{averageProficiency}%</div></div>
        <div className="rounded-2xl bg-[#f4e5b8] p-3"><div className="text-xs text-[var(--muted)]">Assessment completion</div><div className="mt-1 text-xl font-bold">{assessmentCount ? Math.round((assessed / assessmentCount) * 100) : 0}%</div></div>
        <div className="rounded-2xl bg-[#f4d7d1] p-3"><div className="text-xs text-[var(--muted)]">Verified skills</div><div className="mt-1 text-xl font-bold">{verified}/{skills.length}</div></div>
        <div className="rounded-2xl bg-[#e9e3d9] p-3"><div className="text-xs text-[var(--muted)]">Unverified skills</div><div className="mt-1 text-xl font-bold">{skills.length - verified}</div></div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-[var(--muted)]">Skill distribution</h3>
          <div className="space-y-3">
            {skills.map((s) => (
              <button type="button" onClick={() => setSelectedSkill(s.name)} key={s.id} className={`flex w-full items-center gap-3 rounded-lg p-1 text-left ${selectedSkill === s.name ? 'bg-[#f4e5b8]' : ''}`}>
                <div className="w-32 text-sm text-[var(--charcoal)]">{s.name}</div>
                <div className="flex-1">
                  <SmallBar value={s.proficiency} />
                </div>
                <div className="w-12 text-right text-sm text-[var(--charcoal)]">{s.proficiency}%</div>
              </button>
            ))}
            {selectedDemand && <div className="mt-4 rounded-xl border border-[var(--border)] bg-white p-3 text-sm"><div className="font-semibold">{selectedDemand.skill} readiness detail</div><div className="mt-2 grid grid-cols-3 gap-2 text-xs"><span>Demand <b>{selectedDemand.demand}%</b></span><span>Proficiency <b>{selectedDemand.proficiency}%</b></span><span>Gap <b>{selectedDemand.demand - selectedDemand.proficiency} pts</b></span></div></div>}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-[var(--muted)]">Readiness distribution</h3>
            <div className="grid grid-cols-3 gap-2">{readiness.map((item) => <div key={item.label} className={`rounded-2xl p-3 ${item.className}`}><div className="text-xs text-[var(--muted)]">{item.label}</div><div className="mt-2 text-xl font-bold text-[var(--charcoal)]">{item.value}</div></div>)}</div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-[var(--muted)]">Skill-gap trends</h4>
            <p className="mt-1 text-xs text-slate-500">Six monthly assessment snapshots show whether each gap is closing or widening.</p>
            <SkillGapTrendChart />
          </div>
        </div>
      </div>
    </section>
  );
}
