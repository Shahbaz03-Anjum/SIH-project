import React, { useEffect, useState } from 'react';
import { defaultLearningVideos, getStoredLearningVideos, saveLearningVideos, trainingRecommendations } from '../lib/mockData';
import type { LearningVideo, Skill } from '../types';

const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[^\s]+$/i;

const emptyVideo = (skillName: string): LearningVideo => ({
  id: '',
  title: '',
  skill: skillName,
  category: 'Programming',
  description: '',
  url: '',
  channel: ''
});

export default function SkillGapInsights({ gaps }: { gaps: Skill[] }) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [videos, setVideos] = useState<LearningVideo[]>(defaultLearningVideos);
  const [form, setForm] = useState<LearningVideo>(emptyVideo(''));
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setVideos(getStoredLearningVideos());
  }, []);

  useEffect(() => {
    saveLearningVideos(videos);
  }, [videos]);

  const activeSkillName = gaps.find((g) => g.id === selectedSkill)?.name ?? '';
  const skillVideos = videos.filter((video) => video.skill.toLowerCase() === activeSkillName.toLowerCase());

  const handleShowAdd = (skillName: string) => {
    setSelectedSkill(gaps.find((g) => g.name === skillName)?.id ?? selectedSkill);
    setForm(emptyVideo(skillName));
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

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

    const nextVideo = { ...form, url: trimmedUrl, thumbnail };

    if (editingId) {
      setVideos((current) => current.map((video) => video.id === editingId ? { ...video, ...nextVideo } : video));
    } else {
      setVideos((current) => [{ ...nextVideo, id: `video-${Date.now()}` }, ...current]);
    }

    setForm(emptyVideo(activeSkillName));
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
      setForm(emptyVideo(activeSkillName));
      setShowForm(false);
    }
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Skill Gap Insights</h2>
      <div className="space-y-3">
        {gaps.map((g) => {
          const recommendation = trainingRecommendations.find((item) => item.skill === g.name) ?? {
            id: g.id,
            title: `${g.name} Upskilling Track`,
            skill: g.name,
            category: 'Career Skills',
            difficulty: 'Beginner',
            duration: '2-4 weeks',
            description: `Focused practice and guided learning for ${g.name} to improve mastery and job readiness.`,
            videos: []
          };
          const isOpen = selectedSkill === g.id;

          return (
            <div key={g.id} className="border-b pb-3 last:border-b-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-slate-500">Student proficiency: {g.proficiency}% • Industry demand: High</div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-slate-700">Students affected: {Math.round((100 - g.proficiency) * 2)}</div>
                  <button
                    onClick={() => setSelectedSkill(isOpen ? null : g.id)}
                    className="mt-2 px-3 py-1 rounded bg-sky-600 text-white text-sm hover:bg-sky-700"
                  >
                    {isOpen ? 'Hide training' : 'Recommend Training'}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-3 rounded-md border border-sky-100 bg-sky-50 p-3">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-sky-800">{recommendation.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{recommendation.category} • {recommendation.difficulty} • {recommendation.duration}</p>
                    <p className="text-xs text-slate-600 mt-1">{recommendation.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-sm font-semibold text-sky-800">Learning Videos</h3>
                    <button onClick={() => handleShowAdd(g.name)} className="rounded bg-sky-600 px-2.5 py-1 text-xs text-white hover:bg-sky-700">+ Add Video</button>
                  </div>

                  {showForm && activeSkillName === g.name && (
                    <div className="mb-4 rounded border border-sky-200 bg-white p-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-600">Video Title</label>
                          <input value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-600">Skill / Category</label>
                          <input value={form.skill} onChange={(e) => setForm((current) => ({ ...current, skill: e.target.value }))} className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="mb-1 block text-xs font-medium text-slate-600">Description</label>
                          <textarea value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} rows={3} className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-600">YouTube URL</label>
                          <input value={form.url} onChange={(e) => setForm((current) => ({ ...current, url: e.target.value }))} className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-600">Channel Name</label>
                          <input value={form.channel} onChange={(e) => setForm((current) => ({ ...current, channel: e.target.value }))} className="w-full rounded border border-slate-200 px-2 py-1.5 text-sm" />
                        </div>
                      </div>

                      {error && <div className="mt-3 rounded border border-rose-200 bg-rose-50 px-2 py-1.5 text-xs text-rose-700">{error}</div>}

                      <div className="mt-3 flex justify-end gap-2">
                        <button onClick={handleSave} className="rounded bg-sky-600 px-3 py-1.5 text-xs text-white hover:bg-sky-700">{editingId ? 'Save Video' : 'Save Video'}</button>
                        <button onClick={() => { setShowForm(false); setEditingId(null); setError(''); setForm(emptyVideo(g.name)); }} className="rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-700">Cancel</button>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {skillVideos.length > 0 ? skillVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-3 rounded border border-sky-100 bg-white p-2">
                        <img src={video.thumbnail || 'https://img.youtube.com/vi/default/0.jpg'} alt={video.title} className="h-16 w-28 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-800 line-clamp-2">{video.title}</div>
                          <div className="text-xs text-slate-500">{video.channel}</div>
                        </div>
                        <div className="flex gap-2">
                          <a href={video.url} target="_blank" rel="noreferrer" className="rounded bg-sky-600 px-2 py-1 text-[10px] font-medium text-white">Watch</a>
                          <button onClick={() => handleEdit(video)} className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">Edit</button>
                          <button onClick={() => handleDelete(video.id)} className="rounded bg-rose-100 px-2 py-1 text-[10px] font-medium text-rose-700">Delete</button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-xs text-slate-600">No video recommendations available yet for this skill.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
