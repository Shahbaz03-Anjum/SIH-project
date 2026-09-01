import React, { useEffect, useMemo, useState } from 'react';
import { defaultLearningVideos, getStoredLearningVideos, saveLearningVideos } from '../lib/mockData';
import type { LearningVideo } from '../types';

const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[^\s]+$/i;

const emptyVideo = (): LearningVideo => ({
  id: '',
  title: '',
  skill: 'Python',
  category: 'Programming',
  description: '',
  url: '',
  channel: ''
});

export default function LearningVideos() {
  const [videos, setVideos] = useState<LearningVideo[]>(defaultLearningVideos);
  const [form, setForm] = useState<LearningVideo>(emptyVideo());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setVideos(getStoredLearningVideos());
  }, []);

  useEffect(() => {
    saveLearningVideos(videos);
  }, [videos]);

  const currentVideo = useMemo(() => videos[0] ?? null, [videos]);

  const handleSave = () => {
    const trimmedUrl = form.url.trim();
    if (!form.title.trim() || !form.skill.trim() || !form.description.trim() || !form.channel.trim() || !trimmedUrl) {
      setError('Please complete all fields before saving.');
      return;
    }

    if (!youtubePattern.test(trimmedUrl)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    const videoId = trimmedUrl.includes('youtu.be/')
      ? trimmedUrl.split('youtu.be/')[1]?.split(/[?&]/)[0]
      : trimmedUrl.match(/[?&]v=([^&]+)/)?.[1] || trimmedUrl.split('/').pop();
    const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';

    if (editingId) {
      setVideos((current) => current.map((video) => video.id === editingId ? { ...video, ...form, thumbnail, url: trimmedUrl } : video));
    } else {
      setVideos((current) => [{
        ...form,
        id: `video-${Date.now()}`,
        url: trimmedUrl,
        thumbnail,
      }, ...current]);
    }

    setForm(emptyVideo());
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (video: LearningVideo) => {
    setEditingId(video.id);
    setForm(video);
    setShowForm(true);
    setError('');
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Remove this learning video?');
    if (!confirmed) return;

    setVideos((current) => current.filter((video) => video.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyVideo());
      setShowForm(false);
    }
  };

  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,250,245,0.9)] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--charcoal)]">Learning Videos</h2>
          <p className="text-sm text-[var(--muted)]">Skill-building resources for students and mentors.</p>
        </div>
        <button onClick={() => { setShowForm((value) => !value); setError(''); if (!showForm) { setEditingId(null); setForm(emptyVideo()); } }} className="rounded-full bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-strong)]">
          {showForm ? 'Cancel' : '+ Add Learning Video'}
        </button>
      </div>

      {showForm && (
        <div className="mb-5 rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Video Title</label>
              <input value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Skill / Category</label>
              <input value={form.skill} onChange={(e) => setForm((current) => ({ ...current, skill: e.target.value }))} className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-[var(--muted)]">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm" rows={3} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">YouTube URL</label>
              <input value={form.url} onChange={(e) => setForm((current) => ({ ...current, url: e.target.value }))} className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--muted)]">Channel Name</label>
              <input value={form.channel} onChange={(e) => setForm((current) => ({ ...current, channel: e.target.value }))} className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm" />
            </div>
          </div>

          {error && <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div>}

          <div className="mt-4 flex justify-end">
            <button onClick={handleSave} className="rounded-full bg-[var(--charcoal)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--charcoal-soft)]">
              {editingId ? 'Save Video' : 'Add Video'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-6 text-sm text-[var(--muted)]">No learning videos yet. Add one to get started.</div>
        ) : videos.map((video) => (
          <div key={video.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-3 md:flex-row md:items-center">
            <img src={video.thumbnail || 'https://img.youtube.com/vi/default/0.jpg'} alt={video.title} className="h-20 w-28 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="text-base font-semibold text-[var(--charcoal)]">{video.title}</div>
              <div className="text-xs text-[var(--muted)]">{video.skill} • {video.category}</div>
              <p className="mt-1 text-sm text-slate-600">{video.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a href={video.url} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--charcoal)] px-3 py-1.5 text-xs font-medium text-white">Watch</a>
              <button onClick={() => handleEdit(video)} className="rounded-full bg-[var(--sage)] px-3 py-1.5 text-xs font-medium text-[var(--charcoal)]">Edit</button>
              <button onClick={() => handleDelete(video.id)} className="rounded-full bg-[#f4d7d1] px-3 py-1.5 text-xs font-medium text-[var(--charcoal)]">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {currentVideo && (
        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[#f5f3ef] p-3 text-xs text-[var(--muted)]">
          Latest video: <span className="font-semibold text-[var(--charcoal)]">{currentVideo.title}</span> • {currentVideo.channel}
        </div>
      )}
    </section>
  );
}
