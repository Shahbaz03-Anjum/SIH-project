import React from 'react';
import { GraduationCap, Building2, ArrowRight, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5efe8] text-[#1a2927] flex flex-col justify-between p-6 md:p-12">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ef6d52] to-[#d95b42] text-xl font-bold text-white shadow-lg">
            S
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">SkillConnect</h1>
            <p className="text-xs text-[var(--muted)]">AI-Powered Skill Gap & Recruitment Platform</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Sparkles size={13} /> Integrated Ecosystem Active
        </div>
      </div>

      {/* Main Hero & Portal Selection */}
      <div className="max-w-5xl mx-auto w-full py-10 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-4 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
            Dual Portal System
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--charcoal)]">
            Bridge the Gap Between <span className="text-[var(--accent)]">Industry Demand</span> & <span className="text-emerald-700">Academic Skills</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-[var(--muted)] leading-relaxed">
            SkillConnect connects recruiters with top job-ready students while giving academic mentors real-time industry intelligence to eliminate skill gaps.
          </p>
        </div>

        {/* Ecosystem Flow Diagram Card */}
        <div className="rounded-3xl border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center mb-4">
            Unified SkillConnect Ecosystem Pipeline
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-semibold">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 flex flex-col items-center justify-center space-y-1">
              <span className="text-base font-bold text-amber-900">1. INDUSTRY</span>
              <span className="text-[11px] text-amber-700 font-medium">Defines Skill Requirements (Python, SQL, AWS)</span>
            </div>
            <div className="hidden md:flex items-center justify-center text-slate-400">➔</div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 flex flex-col items-center justify-center space-y-1">
              <span className="text-base font-bold text-emerald-900">2. ACADEMICIAN</span>
              <span className="text-[11px] text-emerald-700 font-medium">Identifies Gaps & Conducts Upskilling</span>
            </div>
            <div className="hidden md:flex items-center justify-center text-slate-400">➔</div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 flex flex-col items-center justify-center space-y-1">
              <span className="text-base font-bold text-sky-900">3. AI MATCHING</span>
              <span className="text-[11px] text-sky-700 font-medium">Recruits Candidates & Receives Feedback</span>
            </div>
          </div>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Industry Dashboard Card */}
          <div
            onClick={() => router.push('/industry')}
            className="group cursor-pointer rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Building2 size={28} />
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  Recruiters & Companies
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                  Industry Dashboard
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Post internships & jobs, specify skill importance, discover AI-matched candidates, manage applications, and send structured feedback to colleges.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-medium text-slate-700 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> AI Skill Matching & Reason Breakdown</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Candidate Discovery & Application Pipeline</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Post-Internship Feedback Loop</li>
              </ul>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-amber-700 group-hover:text-[var(--accent)]">
              <span>Enter Industry Portal</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Academician Dashboard Card */}
          <div
            onClick={() => router.push('/academician')}
            className="group cursor-pointer rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <GraduationCap size={28} />
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Mentors & Educators
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--charcoal)] group-hover:text-emerald-800 transition-colors">
                  Academician Dashboard
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Monitor student skill readiness, analyze industry skill demand, identify critical curriculum gaps, assign assessments, and track job readiness.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-medium text-slate-700 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Student Skill Matrix & Assessments</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Real-time Industry Demand & Gaps</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Learning Video Recommendations</li>
              </ul>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-emerald-800 group-hover:text-emerald-900">
              <span>Enter Academician Portal</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-[var(--muted)]">
        SkillConnect © 2026 • AI-Driven Talent & Curriculum Alignment Platform
      </div>
    </div>
  );
}
