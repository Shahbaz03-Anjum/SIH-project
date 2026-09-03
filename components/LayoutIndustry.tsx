import React, { ReactNode, useMemo, useState } from 'react';
import { Bell, CheckCheck, X, Building2, Briefcase, Users, Award, Star, BarChart3, Settings, UserCheck, MessageSquarePlus, Sparkles, ArrowRightLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { IndustryProfileProvider, useIndustryProfile } from './IndustryProfileProvider';

const industryNav = [
  { label: 'Dashboard', href: '/industry', icon: Building2 },
  { label: 'Company Profile', href: '/industry/profile', icon: Building2 },
  { label: 'Post Opportunity', href: '/industry/post-opportunity', icon: Briefcase },
  { label: 'Opportunities', href: '/industry/opportunities', icon: Briefcase },
  { label: 'Talent Matches', href: '/industry/talent-matches', icon: Sparkles },
  { label: 'Applications', href: '/industry/applications', icon: Users },
  { label: 'Shortlisted', href: '/industry/shortlisted', icon: UserCheck },
  { label: 'Feedback', href: '/industry/feedback', icon: MessageSquarePlus },
  { label: 'Analytics', href: '/industry/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/industry/settings', icon: Settings }
];

const industryNotificationsSeed = [
  { id: 'in-1', title: 'New Top Skill Match', message: 'Aarav Sharma matched 94% for Full Stack Engineer Intern.', time: '10m ago', read: false },
  { id: 'in-2', title: 'Application Submitted', message: 'Sara Khan applied for Full Stack Engineer Intern position.', time: '1h ago', read: false },
  { id: 'in-3', title: 'Interview Confirmed', message: 'Technical interview with Aarav Sharma set for Sep 5.', time: '3h ago', read: true }
];

export default function LayoutIndustry({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { profile, getCompanyInitials } = useIndustryProfile();
  const [notifications, setNotifications] = useState(industryNotificationsSeed);
  const [open, setOpen] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAsRead = (id: string) => {
    setNotifications((curr) => curr.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((curr) => curr.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[var(--border)] bg-[#101c1a] px-5 py-6 text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ef6d52] to-[#d95b42] text-base font-bold text-white shadow-md">
                S
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">SkillConnect</div>
                <div className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Building2 size={12} /> Recruiter Portal
                </div>
              </div>
            </div>
          </div>

          {/* Switch to Academician Portal Button */}
          <a
            href="/academician"
            className="mb-6 flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/20 hover:text-white transition"
          >
            <span className="flex items-center gap-1.5">
              <ArrowRightLeft size={13} /> Switch to Mentor Portal
            </span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px]">Academic</span>
          </a>

          {/* Company Mini Card */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-bold text-white shadow-inner">
                {profile.logo ? (
                  <img src={profile.logo} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  getCompanyInitials(profile.name)
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{profile.name}</div>
                <div className="truncate text-[11px] text-slate-300">{profile.industry}</div>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {industryNav.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#ef6d52] text-white shadow-md font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
          <div className="font-semibold text-slate-300">SkillConnect AI Engine</div>
          <div className="mt-0.5 text-[11px]">Demand-to-Curriculum Loop Active</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl">
        <header className="mb-6 flex items-center justify-between rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] px-6 py-4 shadow-sm backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[var(--charcoal)]">{profile.name}</h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">Verified Partner</span>
            </div>
            <p className="text-sm text-[var(--muted)]">{profile.industry} • {profile.location}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Post opportunity quick CTA button */}
            <a
              href="/industry/post-opportunity"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)] transition"
            >
              <Briefcase size={15} /> Post Opportunity
            </a>

            {/* Notifications button */}
            <div className="relative">
              <button
                onClick={() => setOpen((val) => !val)}
                className="relative rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-100 shadow-sm"
                aria-label="Recruiter notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl z-30">
                  <div className="mb-3 flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Bell size={14} className="text-[var(--accent)]" /> Notifications
                    </h3>
                    <button onClick={markAllAsRead} className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium">
                      <CheckCheck size={13} /> Mark read
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">
                      No new notifications.
                    </div>
                  ) : (
                    <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`rounded-xl border p-3 transition ${
                            n.read ? 'border-slate-200 bg-slate-50' : 'border-amber-200 bg-amber-50/70'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{n.title}</div>
                              <div className="mt-1 text-xs text-slate-600 leading-snug">{n.message}</div>
                            </div>
                            {!n.read && (
                              <button onClick={() => markAsRead(n.id)} className="text-slate-400 hover:text-slate-600" aria-label="Mark read">
                                <X size={13} />
                              </button>
                            )}
                          </div>
                          <div className="mt-2 text-[10px] font-medium text-slate-400">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <a
              href="/industry/profile"
              className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-1 hover:ring-2 hover:ring-[var(--accent)] transition"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-xs font-bold text-white">
                {profile.logo ? (
                  <img src={profile.logo} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  getCompanyInitials(profile.name)
                )}
              </div>
            </a>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
