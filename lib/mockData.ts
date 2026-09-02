import type { IndustryDemand, LearningVideo, Opportunity, ProfileData, Skill, Student, TrainingRecommendation } from '../types';

export const skillsMaster: Skill[] = [
  { id: 's1', name: 'Python', proficiency: 82, verified: true },
  { id: 's2', name: 'SQL', proficiency: 76, verified: true },
  { id: 's3', name: 'React', proficiency: 68, verified: false },
  { id: 's4', name: 'AWS', proficiency: 42, verified: false },
  { id: 's5', name: 'Docker', proficiency: 51, verified: false }
];

export const skillGapTrendData = [
  { month: 'Apr', AWS: 58, Python: 35, SQL: 42, React: 30, Docker: 48 },
  { month: 'May', AWS: 55, Python: 34, SQL: 40, React: 31, Docker: 47 },
  { month: 'Jun', AWS: 52, Python: 31, SQL: 39, React: 33, Docker: 45 },
  { month: 'Jul', AWS: 49, Python: 29, SQL: 37, React: 35, Docker: 46 },
  { month: 'Aug', AWS: 46, Python: 27, SQL: 35, React: 37, Docker: 43 },
  { month: 'Sep', AWS: 43, Python: 24, SQL: 33, React: 39, Docker: 41 }
];

export const students: Student[] = [
  {
    id: 'st1',
    name: 'Shahbaz Anjum',
    department: 'Bsc-IT',
    readiness: 94,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 95, verified: true },
      { id: 's2', name: 'SQL', proficiency: 90, verified: true },
      { id: 's4', name: 'AWS', proficiency: 60 }
    ],
    majorGaps: [{ id: 's4', name: 'AWS', proficiency: 60 }],
    assessments: [{ id: 'a1', title: 'DS Algo', completed: true, score: 92 }],
    internshipStatus: 'Applied'
  },
  {
    id: 'st2',
    name: 'Ayesha Kadri',
    department: 'Information Technology',
    readiness: 87,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 88 },
      { id: 's3', name: 'React', proficiency: 80 }
    ],
    majorGaps: [{ id: 's4', name: 'AWS', proficiency: 38 }],
    assessments: [
      { id: 'a1', title: 'Web Dev', completed: true, score: 86 },
      { id: 'a2', title: 'Cloud Basics', completed: false }
    ],
    internshipStatus: 'Shortlisted'
  },
  {
    id: 'st3',
    name: 'Raasikh Kazi',
    department: 'Computer Engineering',
    readiness: 45,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 82 },
      { id: 's2', name: 'SQL', proficiency: 70 }
    ],
    majorGaps: [{ id: 's4', name: 'AWS', proficiency: 30 }],
    assessments: [{ id: 'a1', title: 'DBMS', completed: true, score: 72 }],
    internshipStatus: 'Not applied'
  }
];

export const industryDemand: IndustryDemand[] = [
  { skill: 'AWS', demand: 82, proficiency: 42, affectedStudents: 68, growth: 18, category: 'Cloud', industries: ['Technology', 'Finance', 'Healthcare'], roles: ['Cloud Analyst', 'Software Engineer'] },
  { skill: 'React', demand: 76, proficiency: 68, affectedStudents: 54, growth: 14, category: 'Frontend', industries: ['Technology', 'Product'], roles: ['Software Engineer', 'Product Intern'] },
  { skill: 'Python', demand: 88, proficiency: 82, affectedStudents: 31, growth: 11, category: 'Data', industries: ['Technology', 'Finance', 'Healthcare'], roles: ['Software Engineer', 'Data Analyst'] },
  { skill: 'SQL', demand: 71, proficiency: 76, affectedStudents: 22, growth: 9, category: 'Database', industries: ['Finance', 'Healthcare'], roles: ['Data Analyst'] },
  { skill: 'Docker', demand: 63, proficiency: 51, affectedStudents: 59, growth: 22, category: 'DevOps', industries: ['Technology'], roles: ['Cloud Analyst', 'Software Engineer'] }
];

export const skillGaps = industryDemand.map((row) => ({
  ...row,
  id: `gap-${row.skill.toLowerCase()}`,
  name: row.skill,
  gap: row.demand - row.proficiency,
  priority: row.demand - row.proficiency >= 35 ? 'Critical' : row.demand - row.proficiency >= 20 ? 'High' : row.demand - row.proficiency >= 10 ? 'Medium' : 'Low'
} as const));

export const aggregatedKPIs = {
  totalStudents: 432,
  studentsAssessed: 380,
  avgSkillReadiness: 72,
  internshipsReady: 89,
  studentsWithSignificantGaps: 164,
  activeIndustryOppportunities: 27
};

export const assessmentSummaries = [
  {
    id: 'a-101',
    title: 'Python Foundations',
    student: 'Faraz Sualeh',
    score: 92,
    date: '2026-08-17',
    status: 'Passed',
    nextAction: 'Shortlist for internship interview'
  },
  {
    id: 'a-102',
    title: 'Cloud Essentials',
    student: 'Burhan Parkar',
    score: 76,
    date: '2026-08-21',
    status: 'Needs review',
    nextAction: 'Schedule AWS upskilling session'
  },
  {
    id: 'a-103',
    title: 'Data Structures',
    student: 'Sahir Patel',
    score: 68,
    date: '2026-08-25',
    status: 'In progress',
    nextAction: 'Assign practice drill for arrays and graphs'
  },
  {
    id: 'a-104',
    title: 'React UI Sprint',
    student: 'Shaddik Chaudhary',
    score: 81,
    date: '2026-08-26',
    status: 'Passed',
    nextAction: 'Move to frontend capstone project'
  }
];

export const opportunities: Opportunity[] = [
  {
    id: 'o-201',
    title: 'Frontend Developer Intern',
    company: 'Nexa Labs',
    category: 'Internship',
    requiredSkills: ['React', 'JavaScript', 'UI Design'],
    location: 'Mumbai',
    workType: 'Hybrid',
    experienceLevel: 'Entry',
    deadline: '2026-09-10',
    description: 'Build responsive interfaces and support product design implementation in a strong product team environment.',
    openPositions: 3,
    priority: 'High',
    matchScore: 88
  },
  {
    id: 'o-202',
    title: 'Cloud Support Analyst',
    company: 'CloudCore',
    category: 'Full-Time',
    requiredSkills: ['AWS', 'SQL', 'Linux'],
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    deadline: '2026-09-15',
    description: 'Monitor cloud workloads, troubleshoot incidents, and collaborate on system reliability and support operations.',
    openPositions: 2,
    priority: 'Medium',
    matchScore: 74
  },
  {
    id: 'o-203',
    title: 'Data Analyst Trainee',
    company: 'InsightIQ',
    category: 'Trainee',
    requiredSkills: ['Python', 'SQL', 'Analytics'],
    location: 'Pune',
    workType: 'On-site',
    experienceLevel: 'Entry',
    deadline: '2026-09-12',
    description: 'Support business intelligence dashboards, reporting, and market insight generation for product teams.',
    openPositions: 5,
    priority: 'High',
    matchScore: 91
  }
];

export const trainingRecommendations: TrainingRecommendation[] = [
  {
    id: 'tr-1',
    title: 'Python for Data Analysis',
    skill: 'Python',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    description: 'Build practical Python workflows for analysis, visualization, and decision support.',
    videos: [
      {
        title: 'Python for Data Analysis Full Course',
        channel: 'freeCodeCamp.org',
        thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/0.jpg',
        url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
      },
      {
        title: 'Python Tutorial for Beginners',
        channel: 'Programming with Mosh',
        thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/0.jpg',
        url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8'
      }
    ]
  },
  {
    id: 'tr-2',
    title: 'AWS Cloud Practitioner Fundamentals',
    skill: 'AWS',
    category: 'Cloud',
    difficulty: 'Beginner',
    duration: '3 weeks',
    description: 'Prepare students for cloud concepts, security basics, and core AWS service awareness.',
    videos: [
      {
        title: 'AWS for Beginners - Full Course',
        channel: 'freeCodeCamp.org',
        thumbnail: 'https://img.youtube.com/vi/SOTamWNgDKc/0.jpg',
        url: 'https://www.youtube.com/watch?v=SOTamWNgDKc'
      },
      {
        title: 'AWS Cloud Practitioner Essentials',
        channel: 'AWS Skill Builder',
        thumbnail: 'https://img.youtube.com/vi/-18Jm5M0iHk/0.jpg',
        url: 'https://www.youtube.com/watch?v=-18Jm5M0iHk'
      }
    ]
  },
  {
    id: 'tr-3',
    title: 'React Developer Bootcamp',
    skill: 'React',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '5 weeks',
    description: 'Strengthen component design, state management, hooks, and application architecture.',
    videos: [
      {
        title: 'React JS Full Course for Beginners',
        channel: 'JavaScript Mastery',
        thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/0.jpg',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
      },
      {
        title: 'React Hooks Tutorial',
        channel: 'Academind',
        thumbnail: 'https://img.youtube.com/vi/TNhaISOUy6Q/0.jpg',
        url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q'
      }
    ]
  },
  {
    id: 'tr-4',
    title: 'SQL Essentials for Queries',
    skill: 'SQL',
    category: 'Database',
    difficulty: 'Beginner',
    duration: '2 weeks',
    description: 'Teach students to write efficient queries, joins, subqueries, and reporting logic.',
    videos: [
      {
        title: 'SQL Tutorial for Beginners',
        channel: 'Programming with Mosh',
        thumbnail: 'https://img.youtube.com/vi/27axs9dO7AE/0.jpg',
        url: 'https://www.youtube.com/watch?v=27axs9dO7AE'
      },
      {
        title: 'SQL Crash Course',
        channel: 'Traversy Media',
        thumbnail: 'https://img.youtube.com/vi/5hzZtqCNQKk/0.jpg',
        url: 'https://www.youtube.com/watch?v=5hzZtqCNQKk'
      }
    ]
  },
  {
    id: 'tr-5',
    title: 'Docker and Container Foundations',
    skill: 'Docker',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '3 weeks',
    description: 'Build confidence with container images, networking, volumes, and local development workflows.',
    videos: [
      {
        title: 'Docker Tutorial for Beginners',
        channel: 'TechWorld with Nana',
        thumbnail: 'https://img.youtube.com/vi/3c-iBn73dDE/0.jpg',
        url: 'https://www.youtube.com/watch?v=3c-iBn73dDE'
      },
      {
        title: 'Docker Crash Course',
        channel: 'Traversy Media',
        thumbnail: 'https://img.youtube.com/vi/_YbP1B0hNqY/0.jpg',
        url: 'https://www.youtube.com/watch?v=_YbP1B0hNqY'
      }
    ]
  }
];

export const trainingVideos: Record<string, string[]> = {
  Python: [
    'https://www.youtube.com/watch?v=rfscVS0vtbw',
    'https://www.youtube.com/watch?v=kqtD5dpn9C8'
  ],
  AWS: [
    'https://www.youtube.com/watch?v=SOTamWNgDKc',
    'https://www.youtube.com/watch?v=-18Jm5M0iHk'
  ],
  React: [
    'https://www.youtube.com/watch?v=bMknfKXIFA8',
    'https://www.youtube.com/watch?v=TNhaISOUy6Q'
  ],
  SQL: [
    'https://www.youtube.com/watch?v=27axs9dO7AE',
    'https://www.youtube.com/watch?v=5hzZtqCNQKk'
  ],
  Docker: [
    'https://www.youtube.com/watch?v=3c-iBn73dDE',
    'https://www.youtube.com/watch?v=_YbP1B0hNqY'
  ]
};

export const initialProfileData: ProfileData = {
  name: 'Dr. Shahbaz Anjum',
  email: 'anjum8888@college.edu',
  institution: 'Institute of Applied Learning',
  department: 'Computer Science & Engineering',
  designation: 'Associate Professor / Skill Mentor',
  expertise: ['AI & Data Science', 'Career Readiness', 'Assessment Design'],
  courses: ['Python Programming', 'Cloud Fundamentals', 'Career Skills Lab'],
  experience: '10+ years in teaching, assessment design, and student skills mentoring',
  phone: '+91 98765 43210',
  avatar: 'AA',
  photo: null
};

export const profileData = initialProfileData;

export const defaultLearningVideos: LearningVideo[] = [
  {
    id: 'video-1',
    title: 'Python Basics for Beginners',
    skill: 'Python',
    category: 'Programming',
    description: 'Learn Python fundamentals, variables, loops, and logic with beginner-friendly examples.',
    url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
    channel: 'Programming with Mosh',
    thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/0.jpg'
  },
  {
    id: 'video-2',
    title: 'AWS Fundamentals',
    skill: 'AWS',
    category: 'Cloud',
    description: 'Understand AWS core services, cloud architecture, and practical deployment concepts.',
    url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
    channel: 'freeCodeCamp.org',
    thumbnail: 'https://img.youtube.com/vi/SOTamWNgDKc/0.jpg'
  },
  {
    id: 'video-3',
    title: 'React in 30 Minutes',
    skill: 'React',
    category: 'Frontend',
    description: 'A quick practical guide to core React concepts, props, state, and rendering.',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    channel: 'JavaScript Mastery',
    thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/0.jpg'
  },
  {
    id: 'video-4',
    title: 'Docker Tutorial for Beginners',
    skill: 'Docker',
    category: 'DevOps',
    description: 'Learn images, containers, volumes, and practical Docker workflows for modern applications.',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    channel: 'TechWorld with Nana',
    thumbnail: 'https://img.youtube.com/vi/3c-iBn73dDE/0.jpg'
  }
];

export const learningVideos: LearningVideo[] = [...defaultLearningVideos];

export const PROFILE_STORAGE_KEY = 'skillconnect.userProfile';
export const LEARNING_VIDEOS_STORAGE_KEY = 'skillconnect.learningVideos';
export const ASSESSMENTS_STORAGE_KEY = 'skillconnect.assessments';

const readStoredJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    return fallback;
  }
};

export const getStoredProfile = (): ProfileData => {
  const stored = readStoredJson<ProfileData | null>(PROFILE_STORAGE_KEY, null);
  if (!stored) {
    return { ...initialProfileData, photo: initialProfileData.photo ?? null };
  }

  return {
    ...initialProfileData,
    ...stored,
    expertise: stored.expertise ?? initialProfileData.expertise,
    courses: stored.courses ?? initialProfileData.courses,
    photo: stored.photo ?? null
  };
};

export const saveProfile = (profile: ProfileData) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

export const getStoredLearningVideos = (): LearningVideo[] => {
  const stored = readStoredJson<LearningVideo[] | null>(LEARNING_VIDEOS_STORAGE_KEY, null);
  return stored && stored.length > 0 ? stored : [...defaultLearningVideos];
};

export const saveLearningVideos = (videos: LearningVideo[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LEARNING_VIDEOS_STORAGE_KEY, JSON.stringify(videos));
};

export const getStoredValue = <T,>(key: string, fallback: T): T => readStoredJson(key, fallback);

export const saveStoredValue = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const reportsOverview = {
  totalStudents: 432,
  completionRate: 78,
  assessmentPerformance: 84,
  skillGapRate: 27,
  placementRate: 34,
  trainingParticipation: 61,
  monthlyTrend: [72, 74, 76, 79, 81, 84],
  scoreDistribution: [
    { label: '90-100', value: 22 },
    { label: '80-89', value: 31 },
    { label: '70-79', value: 26 },
    { label: '60-69', value: 14 },
    { label: '<60', value: 7 }
  ]
};
