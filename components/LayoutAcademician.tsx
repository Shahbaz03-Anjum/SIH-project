import React, { ReactNode, useMemo, useState } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { notificationsSeed } from '../lib/notifications';
import { useProfile } from './ProfileProvider';

const nav = [
  { label: 'Dashboard', href: '/academician' },
  { label: 'Students', href: '/academician/students' },
  { label: 'Skill Analytics', href: '/academician/analytics' },
  { label: 'Skill Gaps', href: '/academician/skill-gaps' },
  { label: 'Industry Demand', href: '/academician/industry-demand' },
  { label: 'Assessments', href: '/academician/assessments' },
  { label: 'Opportunities', href: '/academician/opportunities' },
  { label: 'Reports', href: '/academician/reports' },
  { label: 'Profile', href: '/academician/profile' }
];

export default function LayoutAcademician({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationsSeed);
  const [open, setOpen] = useState(false);
  const { profile, getInitials } = useProfile();
  const isDashboardPage = router.pathname === '/academician';

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  const markAsRead = (id: string) => {
    setNotifications((current) => current.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 border-r border-[var(--border)] bg-[var(--charcoal)] px-5 py-6 text-white">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-base font-bold text-white">S</div>
            <div>
              <div className="text-lg font-semibold">SkillConnect</div>
              <div className="text-xs text-slate-300">Mentor Portal</div>
            </div>
          </div>
        </div>

        <a
          href="/industry"
          className="mb-6 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20 hover:text-white transition"
        >
          <span className="flex items-center gap-1.5">
            🏢 Switch to Industry Portal
          </span>
          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px]">Recruiter</span>
        </a>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[var(--sage)] text-sm font-bold text-[var(--charcoal)]">
              {profile.photo ? <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" /> : getInitials(profile.name)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{profile.name}</div>
              <div className="truncate text-[11px] text-slate-300">{profile.designation}</div>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {isDashboardPage && (
          <header className="mb-6 flex items-center justify-between rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] px-5 py-4 shadow-sm backdrop-blur-sm">
            <div>
              <h1 className="text-2xl font-bold text-[var(--charcoal)]">Hello, {profile.name}</h1>
              <p className="text-sm text-[var(--muted)]">Department / Institution overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setOpen((value) => !value)}
                  className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {open && (
                  <div className="absolute right-0 top-12 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-20">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">Notifications</h3>
                      <button onClick={markAllAsRead} className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700">
                        <CheckCheck size={12} /> Mark all read
                      </button>
                    </div>

                    {notifications.length === 0 ? (
                      <div className="rounded border border-dashed border-slate-200 p-4 text-sm text-slate-500">No notifications yet.</div>
                    ) : (
                      <div className="max-h-80 space-y-2 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className={`rounded-lg border p-3 ${notification.read ? 'border-slate-200 bg-slate-50' : 'border-sky-200 bg-sky-50'}`}>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-sm font-medium text-slate-800">{notification.title}</div>
                                <div className="mt-1 text-xs text-slate-600">{notification.message}</div>
                              </div>
                              {!notification.read && (
                                <button onClick={() => markAsRead(notification.id)} className="text-sky-600 hover:text-sky-700" aria-label="Mark as read">
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                            <div className="mt-2 text-[11px] text-slate-500">{notification.time}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => router.push('/academician/profile')}
                className="flex items-center justify-center rounded-full border border-[var(--border)] bg-white p-1.5 transition hover:bg-slate-100"
                aria-label="Open profile"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--sage)] text-xs font-bold text-[var(--charcoal)]">
                  {profile.photo ? <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" /> : getInitials(profile.name)}
                </div>
              </button>
            </div>
          </header>
        )}

        {children}
      </main>
    </div>
  );
}
