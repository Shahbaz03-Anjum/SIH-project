import React, { ChangeEvent, useRef, useState } from 'react';
import LayoutAcademician from '../../components/LayoutAcademician';
import { useProfile } from '../../components/ProfileProvider';

export default function ProfilePage() {
  const { profile, setProfile, updateProfile, saveProfileState, getInitials } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      updateProfile({ photo: result, avatar: getInitials(profile.name) });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const nextProfile = {
      ...profile,
      avatar: getInitials(profile.name)
    };
    saveProfileState(nextProfile);
    setIsEditing(false);
    setSaveMessage('Profile updated successfully');
  };

  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)]">Profile</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Academic and mentor profile summary</p>
          </div>
          <button onClick={() => setIsEditing((value) => !value)} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--accent-strong)]">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center justify-center gap-3 md:w-40">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[var(--sage)] text-3xl font-bold text-[var(--charcoal)] shadow-md">
                {profile.photo ? <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" /> : getInitials(profile.name)}
              </div>

              {isEditing && (
                <div className="flex flex-col items-center gap-2">
                  <button onClick={() => fileInputRef.current?.click()} className="rounded-full bg-[var(--charcoal)] px-3 py-1.5 text-xs font-medium text-white">Upload photo</button>
                  <div className="flex gap-2">
                    {profile.photo && (
                      <button onClick={() => updateProfile({ photo: null })} className="text-xs text-rose-600 hover:underline">Remove photo</button>
                    )}
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-slate-600 hover:underline">Change photo</button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
              )}
            </div>

            <div className="flex-1 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <label className="mb-1 block text-[var(--muted)]">Full Name</label>
                <input readOnly={!isEditing} value={profile.name} onChange={(e) => setProfile((current) => ({ ...current, name: e.target.value, avatar: getInitials(e.target.value) }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1 block text-[var(--muted)]">Email</label>
                <input readOnly={!isEditing} value={profile.email} onChange={(e) => setProfile((current) => ({ ...current, email: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1 block text-[var(--muted)]">Institution</label>
                <input readOnly={!isEditing} value={profile.institution} onChange={(e) => setProfile((current) => ({ ...current, institution: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1 block text-[var(--muted)]">Department</label>
                <input readOnly={!isEditing} value={profile.department} onChange={(e) => setProfile((current) => ({ ...current, department: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1 block text-[var(--muted)]">Designation</label>
                <input readOnly={!isEditing} value={profile.designation} onChange={(e) => setProfile((current) => ({ ...current, designation: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1 block text-[var(--muted)]">Phone</label>
                <input readOnly={!isEditing} value={profile.phone} onChange={(e) => setProfile((current) => ({ ...current, phone: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-[var(--muted)]">Skills / Expertise</label>
                <input readOnly={!isEditing} value={profile.expertise.join(', ')} onChange={(e) => setProfile((current) => ({ ...current, expertise: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-[var(--muted)]">Courses handled</label>
                <input readOnly={!isEditing} value={profile.courses.join(', ')} onChange={(e) => setProfile((current) => ({ ...current, courses: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-[var(--muted)]">Experience</label>
                <textarea readOnly={!isEditing} value={profile.experience} onChange={(e) => setProfile((current) => ({ ...current, experience: e.target.value }))} className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-[var(--charcoal)] outline-none ring-0 transition focus:border-[var(--accent)]" rows={3} />
              </div>
            </div>
          </div>

          {saveMessage && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{saveMessage}</div>
          )}

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} className="rounded-full bg-[var(--charcoal)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--charcoal-soft)]">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </LayoutAcademician>
  );
}
