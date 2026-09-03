import React, { useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import { Settings, Bell, Shield, Key, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoMatchAlerts, setAutoMatchAlerts] = useState(true);
  const [minMatchThreshold, setMinMatchThreshold] = useState(75);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--charcoal)] flex items-center gap-2">
            <Settings size={24} className="text-slate-700" /> Industry Settings & Preferences
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Configure recruitment notifications, AI matching criteria, and account security
          </p>
        </div>

        {savedSuccess && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* AI Matching Preferences */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Bell size={18} className="text-[var(--accent)]" /> AI Recruitment Preferences
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Automated Match Notifications</div>
                  <div className="text-xs text-slate-500">Receive alerts when a student achieves high match %</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoMatchAlerts}
                  onChange={(e) => setAutoMatchAlerts(e.target.checked)}
                  className="h-5 w-5 accent-[var(--accent)]"
                />
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Email Application Updates</div>
                  <div className="text-xs text-slate-500">Get daily summary of new student applications</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-5 w-5 accent-[var(--accent)]"
                />
              </div>

              <div className="border-t pt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default AI Match Alert Threshold: {minMatchThreshold}%
                </label>
                <input
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={minMatchThreshold}
                  onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Shield size={18} className="text-emerald-600" /> Account & Security Settings
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <div className="font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
                  <div className="text-slate-500">Secured via HR Email OTP</div>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Enabled
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)]"
            >
              <Save size={16} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </LayoutIndustry>
  );
}
