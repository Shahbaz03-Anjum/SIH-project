import React, { useMemo, useState } from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import { opportunities } from '../../lib/mockData';

const skillOptions = ['All', 'React', 'AWS', 'Python', 'SQL'];
const locationOptions = ['All', 'Remote', 'Bengaluru', 'Pune'];
const workTypeOptions = ['All', 'Remote', 'Hybrid', 'On-site'];

export default function OpportunitiesPage() {
  const [query, setQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [saved, setSaved] = useState<string[]>(['o-201']);
  const [selectedId, setSelectedId] = useState(opportunities[0].id);

  const filtered = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesQuery = `${opportunity.title} ${opportunity.company} ${opportunity.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesSkill = selectedSkill === 'All' || opportunity.requiredSkills.includes(selectedSkill);
      const matchesLocation = selectedLocation === 'All' || opportunity.location === selectedLocation;
      const matchesWorkType = selectedWorkType === 'All' || opportunity.workType === selectedWorkType;
      return matchesQuery && matchesSkill && matchesLocation && matchesWorkType;
    });
  }, [query, selectedSkill, selectedLocation, selectedWorkType]);

  const selectedOpportunity = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? opportunities[0];

  const toggleSaved = (id: string) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]);
  };

  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Opportunities</h2>
            <p className="text-sm text-slate-500 mt-1">Industry placements, internships, and job prospects aligned with your students.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities"
              className="rounded border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-3">
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
            {skillOptions.map((skill) => <option key={skill} value={skill}>{skill === 'All' ? 'All skills' : skill}</option>)}
          </select>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
            {locationOptions.map((location) => <option key={location} value={location}>{location === 'All' ? 'All locations' : location}</option>)}
          </select>
          <select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
            {workTypeOptions.map((type) => <option key={type} value={type}>{type === 'All' ? 'All work types' : type}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-sm text-slate-500">No opportunities match the current filters.</div>
            ) : (
              filtered.map((opportunity) => (
                <div key={opportunity.id} className={`bg-white rounded-lg shadow-sm p-5 ${selectedOpportunity.id === opportunity.id ? 'ring-2 ring-sky-200' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                      <p className="text-sm text-slate-500">{opportunity.company} • {opportunity.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Match {opportunity.matchScore}%</span>
                      <button onClick={() => toggleSaved(opportunity.id)} className={`rounded px-2 py-1 text-xs font-medium ${saved.includes(opportunity.id) ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'}`}>
                        {saved.includes(opportunity.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">{opportunity.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {opportunity.requiredSkills.map((skill) => (
                      <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-slate-700">{skill}</span>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-slate-600">
                    <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500 block">Location</span><strong>{opportunity.location}</strong></div>
                    <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500 block">Work type</span><strong>{opportunity.workType}</strong></div>
                    <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500 block">Experience</span><strong>{opportunity.experienceLevel}</strong></div>
                    <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500 block">Deadline</span><strong>{opportunity.deadline}</strong></div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={() => setSelectedId(opportunity.id)} className="rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700">View details</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Opportunity details</h3>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Organization</div>
                <div className="mt-1 font-medium">{selectedOpportunity.company}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Role</div>
                <div className="mt-1 font-medium">{selectedOpportunity.title}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Skills required</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedOpportunity.requiredSkills.map((skill) => <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{skill}</span>)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Description</div>
                <p className="mt-2 text-sm text-slate-600">{selectedOpportunity.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => toggleSaved(selectedOpportunity.id)}>{saved.includes(selectedOpportunity.id) ? 'Saved' : 'Bookmark'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAcademician>
  );
}
