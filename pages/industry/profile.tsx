import React, { useState } from 'react';
import LayoutIndustry from '../../components/LayoutIndustry';
import { useIndustryProfile } from '../../components/IndustryProfileProvider';
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  User,
  Edit3,
  Save,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export default function CompanyProfilePage() {
  const { profile, updateProfile, getCompanyInitials } = useIndustryProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <LayoutIndustry>
      <div className="space-y-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--charcoal)]">Company Profile</h2>
            <p className="text-sm text-[var(--muted)]">Manage recruiters, branding, and contact info</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)] transition"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
          )}
        </div>

        {savedSuccess && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            Company profile updated successfully!
          </div>
        )}

        {!isEditing ? (
          /* View Mode */
          <div className="space-y-6">
            {/* Header Banner Card */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-2xl font-bold text-white shadow-md">
                  {profile.logo ? (
                    <img src={profile.logo} alt={profile.name} className="h-full w-full object-cover rounded-2xl" />
                  ) : (
                    getCompanyInitials(profile.name)
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900">{profile.name}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                      Verified Recruiting Partner
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-600 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1"><Building2 size={14} className="text-slate-400" /> {profile.industry}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {profile.location}</span>
                    <span className="flex items-center gap-1"><Users size={14} className="text-slate-400" /> {profile.size}</span>
                  </div>
                  <div className="pt-1">
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                    >
                      <Globe size={13} /> {profile.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-lg">About Company</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{profile.description}</p>
            </div>

            {/* Contact Information */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-lg">Contact Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <User size={14} className="text-amber-500" /> HR Manager
                  </div>
                  <div className="font-bold text-slate-900">{profile.hrContact}</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Mail size={14} className="text-sky-500" /> Email Address
                  </div>
                  <div className="font-bold text-slate-900 truncate">{profile.contactEmail}</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Phone size={14} className="text-emerald-500" /> Phone Number
                  </div>
                  <div className="font-bold text-slate-900">{profile.contactPhone}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b pb-3">Edit Profile Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Industry / Sector</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Work Format</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="1-50 employees">1-50 employees</option>
                  <option value="50-250 employees">50-250 employees</option>
                  <option value="250-500 employees">250-500 employees</option>
                  <option value="500-1000 employees">500-1000 employees</option>
                  <option value="1000+ employees">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">HR Contact Lead</label>
                <input
                  type="text"
                  name="hrContact"
                  value={formData.hrContact}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:border-[var(--accent)] focus:outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[var(--accent-strong)]"
              >
                <Save size={16} /> Save Profile Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutIndustry>
  );
}
