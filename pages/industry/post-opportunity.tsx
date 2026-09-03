import React, { useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import { useRouter } from 'next/router';
import {
  Briefcase,
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import {
  IndustryOpportunity,
  SkillImportance,
  SkillRequirement
} from '../../types';
import { getStoredOpportunities, saveOpportunities } from '../../lib/industryData';

const commonSkillsList = [
  'Python',
  'SQL',
  'React',
  'AWS',
  'Docker',
  'JavaScript',
  'Node.js',
  'Java',
  'C++',
  'Linux',
  'Kubernetes',
  'Data Analytics',
  'UI Design',
  'Machine Learning'
];

export default function PostOpportunityPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Internship' | 'Trainee' | 'Full-Time' | 'Part-Time'>('Internship');
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'Entry' | 'Mid' | 'Senior'>('Entry');
  const [location, setLocation] = useState('Mumbai / Hybrid');
  const [workType, setWorkType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [duration, setDuration] = useState('6 Months');
  const [stipend, setStipend] = useState('₹25,000 / month');
  const [openPositions, setOpenPositions] = useState(3);
  const [deadline, setDeadline] = useState('2026-09-30');
  const [eligibility, setEligibility] = useState('B.E / B.Tech / B.Sc IT 3rd/4th Year students with 70%+ aggregate score.');

  // Required and Preferred Skills state with importance
  const [skillRequirements, setSkillRequirements] = useState<SkillRequirement[]>([
    { skill: 'Python', importance: 3, type: 'Required' },
    { skill: 'SQL', importance: 3, type: 'Required' },
    { skill: 'React', importance: 2, type: 'Preferred' },
    { skill: 'AWS', importance: 1, type: 'Preferred' }
  ]);

  const [customSkill, setCustomSkill] = useState('');

  const addSkillRequirement = (skillName: string, type: 'Required' | 'Preferred', importance: SkillImportance) => {
    if (!skillName.trim()) return;
    if (skillRequirements.some((s) => s.skill.toLowerCase() === skillName.toLowerCase())) return;

    setSkillRequirements((prev) => [
      ...prev,
      { skill: skillName.trim(), importance, type }
    ]);
  };

  const removeSkillRequirement = (skillName: string) => {
    setSkillRequirements((prev) => prev.filter((s) => s.skill !== skillName));
  };

  const updateSkillImportance = (skillName: string, importance: SkillImportance) => {
    setSkillRequirements((prev) =>
      prev.map((s) => (s.skill === skillName ? { ...s, importance } : s))
    );
  };

  const updateSkillType = (skillName: string, type: 'Required' | 'Preferred') => {
    setSkillRequirements((prev) =>
      prev.map((s) => (s.skill === skillName ? { ...s, type } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOpp: IndustryOpportunity = {
      id: `opp-${Date.now()}`,
      title,
      company: 'TechCorp Innovations',
      category,
      description,
      skillRequirements,
      experienceLevel,
      location,
      workType,
      duration,
      stipend,
      openPositions,
      deadline,
      eligibility,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active',
      applicantCount: 0
    };

    const currentOpps = getStoredOpportunities();
    saveOpportunities([newOpp, ...currentOpps]);
    router.push('/industry/opportunities');
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
            <Briefcase className="text-[var(--accent)]" size={24} /> Post Internship / Job Opportunity
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Define requirements and assign skill importance for AI matching
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">1. Role & General Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Engineer Intern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opportunity Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="Internship">Internship</option>
                  <option value="Trainee">Trainee</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="Entry">Entry Level (Students / Freshers)</option>
                  <option value="Mid">Mid Level (1-3 yrs experience)</option>
                  <option value="Senior">Senior Level</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Format</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6 Months / Full Time"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stipend / Compensation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹25,000 / month"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Openings</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={openPositions}
                  onChange={(e) => setOpenPositions(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.E/B.Tech 3rd/4th Year students"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Role Description *</label>
              <textarea
                required
                rows={4}
                placeholder="Explain the job responsibilities, project scope, and key deliverables..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* 3. Skill Requirements & Importance Assignment (Major Feature Requirement) */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-[var(--accent)]" /> Required & Preferred Skills Selection
                </h3>
                <p className="text-xs text-slate-600">
                  Assign skill importance (⭐ to ⭐⭐⭐) to configure our AI Candidate Matching Engine.
                </p>
              </div>
            </div>

            {/* Quick Skill Selector Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Quick Add Common Skills:</label>
              <div className="flex flex-wrap gap-2">
                {commonSkillsList.map((sk) => {
                  const isSelected = skillRequirements.some((s) => s.skill.toLowerCase() === sk.toLowerCase());
                  return (
                    <button
                      key={sk}
                      type="button"
                      disabled={isSelected}
                      onClick={() => addSkillRequirement(sk, 'Required', 3)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border border-slate-300 text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                      }`}
                    >
                      + {sk}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type custom skill name..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (customSkill) {
                    addSkillRequirement(customSkill, 'Preferred', 2);
                    setCustomSkill('');
                  }
                }}
                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-900"
              >
                Add Skill
              </button>
            </div>

            {/* Configured Skill Requirements List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Configured Requirements:</h4>
              {skillRequirements.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
                  No skills selected yet. Add skills above to evaluate AI candidate match score.
                </div>
              ) : (
                <div className="space-y-2">
                  {skillRequirements.map((sr) => (
                    <div
                      key={sr.skill}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 gap-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-sm">{sr.skill}</span>
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateSkillType(sr.skill, 'Required')}
                            className={`rounded px-2 py-0.5 text-xs font-bold ${
                              sr.type === 'Required'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Required
                          </button>
                          <button
                            type="button"
                            onClick={() => updateSkillType(sr.skill, 'Preferred')}
                            className={`rounded px-2 py-0.5 text-xs font-bold ${
                              sr.type === 'Preferred'
                                ? 'bg-sky-600 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Preferred
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        {/* Importance Star Selection */}
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-500 font-medium mr-1">Importance:</span>
                          {[1, 2, 3].map((starVal) => (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => updateSkillImportance(sr.skill, starVal as SkillImportance)}
                              className={`p-1 transition ${
                                starVal <= sr.importance ? 'text-amber-500 scale-110' : 'text-slate-300'
                              }`}
                              title={`${starVal} star rating`}
                            >
                              ★
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSkillRequirement(sr.skill)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          aria-label="Remove skill"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => router.push('/industry/opportunities')}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)]"
            >
              <Briefcase size={16} /> Publish Opportunity & Run AI Matcher
            </button>
          </div>
        </form>
      </div>
    </LayoutIndustry>
  );
}
