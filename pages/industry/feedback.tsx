import React, { useState, useEffect } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import {
  MessageSquarePlus,
  Star,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { IndustryFeedback } from '../../types';
import { getStoredFeedback, saveFeedback } from '../../lib/industryData';

export default function IndustryFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<IndustryFeedback[]>([]);

  // Form states
  const [studentName, setStudentName] = useState('Shahbaz Anjum');
  const [opportunityTitle, setOpportunityTitle] = useState('Full Stack Engineer Intern');
  const [technicalSkillsScore, setTechnicalSkillsScore] = useState(5);
  const [communicationScore, setCommunicationScore] = useState(4);
  const [problemSolvingScore, setProblemSolvingScore] = useState(5);
  const [jobReadinessScore, setJobReadinessScore] = useState(4);
  const [overallPerformanceScore, setOverallPerformanceScore] = useState(5);
  const [missingSkillsInput, setMissingSkillsInput] = useState('AWS Cloud Architecture, CI/CD Pipeline');
  const [recommendedSkillsInput, setRecommendedSkillsInput] = useState('AWS Certified Cloud Practitioner, Docker Containerization');
  const [comments, setComments] = useState('Shahbaz demonstrated outstanding technical competence and initiative during the internship.');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    setFeedbackList(getStoredFeedback());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFb: IndustryFeedback = {
      id: `fb-${Date.now()}`,
      studentId: `st-${Date.now()}`,
      studentName,
      opportunityTitle,
      technicalSkillsScore,
      communicationScore,
      problemSolvingScore,
      jobReadinessScore,
      overallPerformanceScore,
      missingSkills: missingSkillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      recommendedSkills: recommendedSkillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      comments,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newFb, ...feedbackList];
    setFeedbackList(updated);
    saveFeedback(updated);

    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const renderStars = (score: number, onChange?: (val: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((val) => (
        <button
          key={val}
          type="button"
          disabled={!onChange}
          onClick={() => onChange && onChange(val)}
          className={`p-1 text-base transition ${
            val <= score ? 'text-amber-500 scale-110' : 'text-slate-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <LayoutIndustry>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
            <MessageSquarePlus className="text-emerald-700" size={24} /> Industry Feedback & Skill Gap Intelligence
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Provide structured candidate evaluations to update college curriculum skill-gap analytics
          </p>
        </div>

        {/* Section 8 & Connection Explanation Banner */}
        <div className="rounded-3xl border border-emerald-300 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 text-white shadow-md space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles size={15} /> Platform Ecosystem Feedback Loop
          </div>
          <h3 className="text-xl font-bold">How Recruiter Feedback Shapes Student Training</h3>
          <p className="text-xs text-slate-200 leading-relaxed max-w-2xl">
            The missing skills and recommendations you enter below directly feed into the Academician Dashboard's <strong>Skill Gap Intelligence Engine</strong>. Mentors receive instant alerts to deploy updated learning videos and assessment drills to fix real-world industry deficiencies!
          </p>
        </div>

        {submittedSuccess && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            Structured feedback submitted successfully! Academician skill-gap intelligence updated.
          </div>
        )}

        {/* Feedback Entry Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Submit Candidate Internship Evaluation</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Intern / Candidate Name *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Completed Role / Opportunity *</label>
              <input
                type="text"
                required
                value={opportunityTitle}
                onChange={(e) => setOpportunityTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Section 8 Ratings: Technical, Communication, Problem Solving, Job Readiness, Overall */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Structured Evaluation Ratings (1 - 5 Stars)</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span>Technical Skills:</span>
                {renderStars(technicalSkillsScore, setTechnicalSkillsScore)}
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span>Communication Skills:</span>
                {renderStars(communicationScore, setCommunicationScore)}
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span>Problem Solving:</span>
                {renderStars(problemSolvingScore, setProblemSolvingScore)}
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span>Job Readiness:</span>
                {renderStars(jobReadinessScore, setJobReadinessScore)}
              </div>

              <div className="sm:col-span-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950">
                <span className="font-bold">Overall Performance Rating:</span>
                {renderStars(overallPerformanceScore, setOverallPerformanceScore)}
              </div>
            </div>
          </div>

          {/* Skills missing & recommended */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Skills That Were Missing (comma separated)
              </label>
              <input
                type="text"
                value={missingSkillsInput}
                onChange={(e) => setMissingSkillsInput(e.target.value)}
                placeholder="e.g. AWS Cloud Architecture, CI/CD Pipelines"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Helps mentors identify curriculum gaps for upcoming student batches.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recommended Skills for Future Candidates / Curriculum
              </label>
              <input
                type="text"
                value={recommendedSkillsInput}
                onChange={(e) => setRecommendedSkillsInput(e.target.value)}
                placeholder="e.g. Docker, System Design, GraphQL"
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Qualitative Feedback / Remarks</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Detailed notes on performance..."
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-800 transition"
            >
              <Send size={16} /> Submit Feedback & Update Intelligence
            </button>
          </div>
        </form>

        {/* Past Feedback Log */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Submitted Feedback Log</h3>

          <div className="space-y-3">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{fb.studentName}</div>
                    <div className="text-xs text-slate-500">{fb.opportunityTitle} • Submitted: {fb.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-semibold">Overall:</span>
                    {renderStars(fb.overallPerformanceScore)}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">{fb.comments}</p>

                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {fb.missingSkills.map((sk) => (
                    <span key={sk} className="rounded-md bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 font-medium">
                      Missing: {sk}
                    </span>
                  ))}
                  {fb.recommendedSkills.map((sk) => (
                    <span key={sk} className="rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 font-medium">
                      Recommended: {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutIndustry>
  );
}
