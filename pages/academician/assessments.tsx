import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutAcademician from '../../components/LayoutAcademician';
import { ASSESSMENTS_STORAGE_KEY, getStoredValue, saveStoredValue } from '../../lib/mockData';
import { importQuestionsFromFile } from '../../lib/questionImport';

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  marks: number;
};

type Assessment = {
  id: string;
  title: string;
  description: string;
  skill: string;
  duration: number;
  status: 'Draft' | 'Published' | 'Completed';
  questions: Question[];
  submissions: Array<{ student: string; score: number; total: number; submittedAt: string }>;
};

const initialAssessments: Assessment[] = [
  {
    id: 'a1',
    title: 'Python Fundamentals Quiz',
    description: 'Covers syntax, control flow, functions, and data structures.',
    skill: 'Python',
    duration: 30,
    status: 'Published',
    questions: [
      {
        id: 'q1',
        prompt: 'Which keyword is used to define a function in Python?',
        options: ['func', 'def', 'function', 'lambda'],
        answer: 'def',
        marks: 5
      },
      {
        id: 'q2',
        prompt: 'Which of the following is a Python list method to add an item at the end?',
        options: ['append()', 'insert()', 'extend()', 'add()'],
        answer: 'append()',
        marks: 5
      }
    ],
    submissions: [
      { student: 'Shahbaz Anjum', score: 8, total: 10, submittedAt: '2026-08-22' },
      { student: 'Ayesha Kadri', score: 10, total: 10, submittedAt: '2026-08-24' }
    ]
  },
  {
    id: 'a2',
    title: 'AWS Cloud Basics',
    description: 'Testing awareness of core cloud services and deployment concepts.',
    skill: 'AWS',
    duration: 45,
    status: 'Draft',
    questions: [
      {
        id: 'q3',
        prompt: 'Which AWS service is mainly used for computing capacity?',
        options: ['S3', 'EC2', 'Route53', 'CloudFront'],
        answer: 'EC2',
        marks: 5
      }
    ],
    submissions: []
  }
];

const skillOptions = ['Python', 'AWS', 'React', 'SQL', 'Docker'];

const emptyQuestion = (): Question => ({
  id: `q-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
  prompt: '',
  options: ['', '', '', ''],
  answer: '',
  marks: 5
});

export default function AssessmentsPage() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Assessment['status']>('All');
  const [selectedId, setSelectedId] = useState(initialAssessments[0].id);
  const [importMode, setImportMode] = useState<'add' | 'replace'>('add');
  const [importSummary, setImportSummary] = useState<{ imported: number; errors: Array<{ row: number; message: string }> } | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    skill: 'Python',
    duration: 30,
    status: 'Draft' as Assessment['status'],
    questions: [emptyQuestion()]
  });

  useEffect(() => {
    const stored = getStoredValue<Assessment[]>(ASSESSMENTS_STORAGE_KEY, initialAssessments);
    setAssessments(stored);
    setSelectedId(stored[0]?.id ?? '');
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveStoredValue(ASSESSMENTS_STORAGE_KEY, assessments);
  }, [assessments, hydrated]);

  useEffect(() => {
    const skill = typeof router.query.skill === 'string' ? router.query.skill : '';
    if (skill && skillOptions.includes(skill)) setForm((current) => ({ ...current, skill, title: `${skill} Skills Assessment` }));
  }, [router.query.skill]);

  const filteredAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      const matchesText = `${assessment.title} ${assessment.skill}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || assessment.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [assessments, search, statusFilter]);

  const selectedAssessment = assessments.find((item) => item.id === selectedId) ?? filteredAssessments[0] ?? assessments[0];

  const updateQuestion = (questionId: string, field: keyof Question, value: string | number | string[]) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((item) => 
        item.id === questionId ? { ...item, [field]: value } : item
      )
    }));
  };

  const addQuestion = () => {
    setForm((prev) => ({ ...prev, questions: [...prev.questions, emptyQuestion()] }));
  };

  const removeQuestion = (id: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.length > 1 ? prev.questions.filter((question) => question.id !== id) : prev.questions
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question;
        const options = [...question.options];
        options[optionIndex] = value;
        return { ...question, options };
      })
    }));
  };

  const createAssessment = () => {
    if (!form.title.trim() || form.questions.some((q) => !q.prompt.trim() || q.options.some((opt) => !opt.trim()))) {
      return;
    }

    const newAssessment: Assessment = {
      id: `a-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim() || 'New assessment created from this module.',
      skill: form.skill,
      duration: form.duration,
      status: form.status,
      questions: form.questions.map((question) => ({
        ...question,
        options: question.options.filter((option) => option.trim() !== ''),
        answer: question.answer || question.options[0] || ''
      })),
      submissions: []
    };

    setAssessments((prev) => [newAssessment, ...prev]);
    setSelectedId(newAssessment.id);
    setForm({
      title: '',
      description: '',
      skill: 'Python',
      duration: 30,
      status: 'Draft',
      questions: [emptyQuestion()]
    });
  };

  const togglePublish = (id: string) => {
    setAssessments((prev) => prev.map((assessment) => {
      if (assessment.id !== id) return assessment;
      return { ...assessment, status: assessment.status === 'Published' ? 'Draft' : 'Published' };
    }));
  };

  const deleteAssessment = (id: string) => {
    setAssessments((prev) => prev.filter((assessment) => assessment.id !== id));
    if (selectedId === id) {
      const next = assessments.find((item) => item.id !== id);
      setSelectedId(next ? next.id : '');
    }
  };

  const handleExcelImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importQuestionsFromFile(file);
    const importedQuestions = result.questions.map((question) => ({
      id: `q-import-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      prompt: question.prompt,
      options: [...question.options, '', '', '', ''].slice(0, 4),
      answer: question.answer,
      marks: question.marks
    }));

    setImportSummary({ imported: result.importedCount, errors: result.errors });

    if (importedQuestions.length === 0) {
      event.target.value = '';
      return;
    }

    setForm((prev) => ({
      ...prev,
      questions: importMode === 'replace' ? importedQuestions : [...prev.questions, ...importedQuestions]
    }));

    event.target.value = '';
  };

  return (
    <LayoutAcademician>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Assessments</h2>
            <p className="text-sm text-slate-500 mt-1">Create, publish, and monitor student assessment performance.</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assessments"
              className="rounded border border-slate-200 px-3 py-2 text-sm"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'All' | Assessment['status'])}
              className="rounded border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="All">All status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Assessment Builder</h3>
              <button onClick={createAssessment} className="rounded bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">Create assessment</button>
            </div>

            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-800">Import Questions / Upload Excel</div>
                  <div className="text-xs text-slate-500">Supports .xlsx, .xls, and .csv</div>
                </div>
                <div className="flex items-center gap-2">
                  <select value={importMode} onChange={(e) => setImportMode(e.target.value as 'add' | 'replace')} className="rounded border border-slate-200 px-2 py-1 text-xs">
                    <option value="add">Add to existing</option>
                    <option value="replace">Replace existing</option>
                  </select>
                  <label className="cursor-pointer rounded bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700">
                    Upload file
                    <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleExcelImport} />
                  </label>
                </div>
              </div>

              {importSummary && (
                <div className="mt-3 space-y-2 text-xs">
                  <div className="rounded bg-emerald-50 px-3 py-2 text-emerald-700">
                    Imported {importSummary.imported} question{importSummary.imported === 1 ? '' : 's'} successfully.
                  </div>
                  {importSummary.errors.length > 0 && (
                    <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                      {importSummary.errors.map((error) => (
                        <div key={`${error.row}-${error.message}`}>Row {error.row}: {error.message}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Assessment title"
                className="rounded border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={form.skill}
                onChange={(e) => setForm({ ...form, skill: e.target.value })}
                className="rounded border border-slate-200 px-3 py-2 text-sm"
              >
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Assessment description"
              className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) || 30 })}
                className="rounded border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Assessment['status'] })}
                className="rounded border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="space-y-4">
              {form.questions.map((question, index) => (
                <div key={question.id} className="rounded border border-slate-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <button onClick={() => removeQuestion(question.id)} className="text-xs text-rose-600">Delete</button>
                  </div>

                  <textarea
                    value={question.prompt}
                    onChange={(e) => updateQuestion(question.id, 'prompt', e.target.value)}
                    placeholder="Question prompt"
                    className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
                    rows={2}
                  />

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={`${question.id}-option-${optionIndex}`}
                        value={option}
                        onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="rounded border border-slate-200 px-3 py-2 text-sm"
                      />
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={question.answer}
                      onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                      className="rounded border border-slate-200 px-3 py-2 text-sm"
                    >
                      <option value="">Correct answer</option>
                      {question.options.map((option) => (
                        <option key={option + Math.random()} value={option}>{option || 'Blank option'}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={question.marks}
                      onChange={(e) => updateQuestion(question.id, 'marks', Number(e.target.value) || 5)}
                      className="rounded border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addQuestion} className="rounded border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-700">+ Add question</button>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Assessment Library</h3>
            <div className="space-y-3">
              {filteredAssessments.length === 0 ? (
                <div className="rounded border border-dashed border-slate-200 p-6 text-sm text-slate-500">No assessments match your filters.</div>
              ) : (
                filteredAssessments.map((assessment) => (
                  <div key={assessment.id} className={`rounded border p-4 ${selectedAssessment?.id === assessment.id ? 'border-sky-200 bg-sky-50' : 'border-slate-200'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-medium">{assessment.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{assessment.skill} • {assessment.duration} mins</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">{assessment.status}</span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">{assessment.description}</p>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setSelectedId(assessment.id)} className="rounded bg-slate-100 px-3 py-1.5 text-xs text-slate-700">View details</button>
                      <button onClick={() => togglePublish(assessment.id)} className="rounded bg-emerald-100 px-3 py-1.5 text-xs text-emerald-700">{assessment.status === 'Published' ? 'Unpublish' : 'Publish'}</button>
                      <button onClick={() => deleteAssessment(assessment.id)} className="rounded bg-rose-100 px-3 py-1.5 text-xs text-rose-700">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {selectedAssessment && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{selectedAssessment.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedAssessment.description}</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">{selectedAssessment.skill}</span>
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{selectedAssessment.status}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500">Questions</span><div className="text-xl font-semibold mt-1">{selectedAssessment.questions.length}</div></div>
              <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500">Duration</span><div className="text-xl font-semibold mt-1">{selectedAssessment.duration} min</div></div>
              <div className="bg-slate-50 p-3 rounded"><span className="text-slate-500">Submissions</span><div className="text-xl font-semibold mt-1">{selectedAssessment.submissions.length}</div></div>
            </div>

            {selectedAssessment.submissions.length > 0 && (
              <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <div className="font-semibold">Performance signal</div>
                <div className="mt-1">Average score: {Math.round(selectedAssessment.submissions.reduce((sum, item) => sum + (item.score / item.total) * 100, 0) / selectedAssessment.submissions.length)}%. Results feed the {selectedAssessment.skill} proficiency review.</div>
                {selectedAssessment.skill === 'AWS' && <div className="mt-1 font-medium">AWS pathway: 42% baseline proficiency to 61% post-assessment target.</div>}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Question preview</h4>
                <div className="space-y-3">
                  {selectedAssessment.questions.map((question, idx) => (
                    <div key={question.id} className="rounded border border-slate-200 p-3">
                      <p className="text-sm font-medium">{idx + 1}. {question.prompt}</p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-600">
                        {question.options.map((option) => (
                          <li key={option}>• {option}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Student submissions</h4>
                <div className="space-y-3">
                  {selectedAssessment.submissions.length === 0 ? (
                    <div className="rounded border border-dashed border-slate-200 p-4 text-sm text-slate-500">No submissions yet for this assessment.</div>
                  ) : (
                    selectedAssessment.submissions.map((submission, idx) => (
                      <div key={`${submission.student}-${idx}`} className="rounded border border-slate-200 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{submission.student}</span>
                          <span className="text-slate-500">{submission.submittedAt}</span>
                        </div>
                        <div className="mt-2 text-sm text-slate-600">Score: {submission.score}/{submission.total}</div>
                        <div className="mt-2 h-2 rounded bg-slate-100">
                          <div className="h-2 rounded bg-emerald-500" style={{ width: `${(submission.score / submission.total) * 100}%` }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAcademician>
  );
}
