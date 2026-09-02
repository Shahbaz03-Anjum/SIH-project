import React, { useMemo, useState } from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import { industryDemand, trainingRecommendations } from '../../lib/mockData';

const timeOptions = ['Last 30 days', 'Last 90 days', 'This year'];
const industryOptions = ['All sectors', 'Technology', 'Finance', 'Healthcare', 'Public Sector'];
const roleOptions = ['All roles', 'Software Engineer', 'Data Analyst', 'Cloud Analyst', 'Product Intern'];
const categoryOptions = ['All categories', 'Cloud', 'Data', 'Frontend', 'Database', 'DevOps'];

export default function IndustryDemandPage() {
  const [timeRange, setTimeRange] = useState('Last 90 days');
  const [industry, setIndustry] = useState('All sectors');
  const [jobRole, setJobRole] = useState('All roles');
  const [category, setCategory] = useState('All categories');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    return industryDemand.filter((row) => {
      const categoryMatch = category === 'All categories' || row.category === category;
      const industryMatch = industry === 'All sectors' || row.industries.includes(industry);
      const roleMatch = jobRole === 'All roles' || row.roles.includes(jobRole);
      return categoryMatch && industryMatch && roleMatch;
    });
  }, [category, industry, jobRole]);

  const mostDemandedSkill = filteredRows.reduce((top, current) => current.demand > top.demand ? current : top, filteredRows[0]);
  const emergingSkill = [...filteredRows].sort((a, b) => b.growth - a.growth)[0];
  const avgDemand = filteredRows.length ? Math.round(filteredRows.reduce((sum, row) => sum + row.demand, 0) / filteredRows.length) : 0;
  const criticalGap = filteredRows.reduce((top, current) => current.demand - current.proficiency > top.demand - top.proficiency ? current : top, filteredRows[0]);

  const recommendedTraining = selectedSkill
    ? trainingRecommendations.filter((item) => item.skill === selectedSkill)
    : [];

  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Industry Demand Intelligence</h2>
            <p className="text-sm text-slate-500 mt-1">Marketplace trends, critical skill gaps, and job-fit intelligence aligned to your learners.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
              {timeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
              {industryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
              {roleOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
              {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500">Most Demanded Skill</div>
            <div className="mt-2 text-2xl font-bold">{mostDemandedSkill.skill}</div>
            <div className="mt-1 text-xs text-emerald-600">{mostDemandedSkill?.demand ?? 0}% demand intensity</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500">Emerging Skill</div>
            <div className="mt-2 text-2xl font-bold">{emergingSkill?.skill ?? 'No match'}</div>
            <div className="mt-1 text-xs text-emerald-600">+{emergingSkill?.growth ?? 0}% growth</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500">Average Demand</div>
            <div className="mt-2 text-2xl font-bold">{avgDemand}%</div>
            <div className="mt-1 text-xs text-slate-500">Across tracked skill areas</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-sm text-slate-500">Critical Skill Gaps</div>
            <div className="mt-2 text-2xl font-bold">{criticalGap?.skill ?? 'No match'}</div>
            <div className="mt-1 text-xs text-rose-600">{criticalGap ? criticalGap.demand - criticalGap.proficiency : 0} point mismatch</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Industry Demand vs Student Proficiency</h3>
            <div className="mt-4 space-y-4">
              {filteredRows.map((row) => (
                <div key={row.skill}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{row.skill}</span>
                    <span className="text-slate-500">Demand {row.demand}% / Proficiency {row.proficiency}%</span>
                  </div>
                  <div className="h-2.5 rounded bg-slate-100">
                    <div className="h-2.5 rounded bg-sky-500" style={{ width: `${row.demand}%` }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                    <span>Students affected: {row.affectedStudents}</span>
                    <span>Growth: +{row.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Emerging skills</h3>
            <div className="mt-4 space-y-3">
              {filteredRows
                .slice()
                .sort((a, b) => b.growth - a.growth)
                .map((row) => (
                  <div key={row.skill} className="flex items-center justify-between rounded border border-slate-200 p-3">
                    <div>
                      <div className="font-medium text-slate-800">{row.skill}</div>
                      <div className="text-xs text-slate-500">{row.demand}% demand</div>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">+{row.growth}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Industry/company demand by skill</h3>
            <div className="mt-4 space-y-3">
              {filteredRows.map((row) => (
                <div key={row.skill} className="rounded border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{row.skill}</div>
                    <div className="text-sm text-slate-500">{row.demand}% demand</div>
                  </div>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="rounded bg-slate-100 px-2 py-1">Technology</span>
                    <span className="rounded bg-slate-100 px-2 py-1">Cloud</span>
                    <span className="rounded bg-slate-100 px-2 py-1">Product</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Critical skill gaps</h3>
            <div className="mt-4 space-y-3">
              {filteredRows.map((row) => (
                <div key={row.skill} className="rounded border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{row.skill}</div>
                      <div className="text-xs text-slate-500">Industry Demand: {row.demand}% | Student Proficiency: {row.proficiency}%</div>
                    </div>
                    <div className="text-sm text-rose-600">{row.affectedStudents} students affected</div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a href={`/academician/students?skill=${encodeURIComponent(row.skill)}`} className="rounded bg-sky-600 px-3 py-1.5 text-xs text-white hover:bg-sky-700">View Students</a>
                    <button onClick={() => setSelectedSkill(row.skill)} className="rounded bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200">Recommend Training</button>
                    <a href={`/academician/assessments?skill=${encodeURIComponent(row.skill)}`} className="rounded bg-emerald-100 px-3 py-1.5 text-xs text-emerald-700 hover:bg-emerald-200">Create Assessment</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {recommendedTraining.length > 0 && (
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Training recommendations for {selectedSkill}</h3>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendedTraining.map((item) => (
                <div key={item.id} className="rounded border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.skill} • {item.category} • {item.difficulty}</div>
                    </div>
                    <span className="rounded bg-sky-100 px-2 py-1 text-[10px] text-sky-700">{item.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <div className="mt-3 space-y-2">
                    {item.videos.map((video, index) => (
                      <a key={`${item.id}-${index}`} href={video.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded border border-slate-200 p-2 hover:bg-slate-50">
                        <img src={video.thumbnail} alt={video.title} className="h-12 w-20 object-cover rounded" />
                        <div className="flex-1 text-sm text-slate-700">{video.title}</div>
                        <span className="rounded bg-sky-600 px-2 py-1 text-[10px] text-white">Watch</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Job-role skill requirements</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Priority Skills</th>
                  <th className="pb-2">Match gap</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="py-3">Software Engineer</td>
                  <td className="py-3">Python, React, AWS</td>
                  <td className="py-3">High</td>
                  <td className="py-3"><button className="text-sky-600 underline">View talent</button></td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="py-3">Data Analyst</td>
                  <td className="py-3">SQL, Python, Analytics</td>
                  <td className="py-3">Medium</td>
                  <td className="py-3"><button className="text-sky-600 underline">View talent</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
