import type {
  CandidateApplication,
  CompanyProfile,
  IndustryFeedback,
  IndustryOpportunity,
  MatchBreakdown,
  SkillRequirement,
  Student
} from '../types';
import { students as baseStudents } from './mockData';

export const initialCompanyProfile: CompanyProfile = {
  name: 'TechCorp Innovations',
  logo: null,
  industry: 'Software & Cloud Solutions',
  description:
    'TechCorp Innovations is a leading product engineering company providing scalable enterprise solutions, cloud automation, and data analytics across global tech domains.',
  location: 'Mumbai, India (Hybrid)',
  website: 'https://techcorp.example.com',
  size: '250-500 employees',
  contactEmail: 'careers@techcorp.example.com',
  contactPhone: '+91 98200 12345',
  hrContact: 'Priya Verma (Head of Talent Acquisition)'
};

export const initialIndustryOpportunities: IndustryOpportunity[] = [
  {
    id: 'opp-101',
    title: 'Full Stack Engineer Intern',
    company: 'TechCorp Innovations',
    category: 'Internship',
    description:
      'We are looking for proactive engineering students to develop frontend and backend components using Python, SQL, React, and AWS cloud services.',
    skillRequirements: [
      { skill: 'Python', importance: 3, type: 'Required' },
      { skill: 'SQL', importance: 3, type: 'Required' },
      { skill: 'React', importance: 2, type: 'Preferred' },
      { skill: 'AWS', importance: 1, type: 'Preferred' }
    ],
    experienceLevel: 'Entry',
    location: 'Mumbai / Remote',
    workType: 'Hybrid',
    duration: '6 Months',
    stipend: '₹25,000 / month',
    openPositions: 4,
    deadline: '2026-09-25',
    eligibility: 'B.E / B.Tech / B.Sc IT 3rd/4th Year students with minimum 75% aggregate score.',
    createdAt: '2026-08-20',
    status: 'Active',
    applicantCount: 126
  },
  {
    id: 'opp-102',
    title: 'Data & Cloud Trainee',
    company: 'TechCorp Innovations',
    category: 'Trainee',
    description:
      'Support cloud data pipelines, SQL analytics, and Docker deployment automation for enterprise business intelligence.',
    skillRequirements: [
      { skill: 'Python', importance: 3, type: 'Required' },
      { skill: 'SQL', importance: 3, type: 'Required' },
      { skill: 'Docker', importance: 2, type: 'Preferred' },
      { skill: 'AWS', importance: 2, type: 'Required' }
    ],
    experienceLevel: 'Entry',
    location: 'Remote',
    workType: 'Remote',
    duration: '3 Months',
    stipend: '₹30,000 / month',
    openPositions: 3,
    deadline: '2026-09-30',
    eligibility: 'Computer Science, Information Technology, or Data Science majors.',
    createdAt: '2026-08-25',
    status: 'Active',
    applicantCount: 84
  },
  {
    id: 'opp-103',
    title: 'Frontend React Developer',
    company: 'TechCorp Innovations',
    category: 'Full-Time',
    description:
      'Build responsive UI interfaces, integrate RESTful APIs, and contribute to frontend design systems.',
    skillRequirements: [
      { skill: 'React', importance: 3, type: 'Required' },
      { skill: 'JavaScript', importance: 3, type: 'Required' },
      { skill: 'UI Design', importance: 2, type: 'Preferred' }
    ],
    experienceLevel: 'Mid',
    location: 'Mumbai',
    workType: 'On-site',
    duration: 'Full Time',
    stipend: '₹8,50,000 / annum',
    openPositions: 2,
    deadline: '2026-10-15',
    createdAt: '2026-08-28',
    status: 'Active',
    applicantCount: 42,
    eligibility: 'Graduating students or alumni with strong frontend portfolio.'
  }
];

export const ExtendedCandidatePool: (Student & { avatarBg?: string })[] = [
  {
    id: 'cand-1',
    name: 'Aarav Sharma',
    department: 'Computer Engineering',
    readiness: 95,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 94, verified: true },
      { id: 's2', name: 'SQL', proficiency: 92, verified: true },
      { id: 's3', name: 'React', proficiency: 88, verified: true },
      { id: 's4', name: 'AWS', proficiency: 75, verified: true }
    ],
    majorGaps: [],
    assessments: [
      { id: 'a1', title: 'Python Expert', completed: true, score: 96 },
      { id: 'a2', title: 'SQL & Relational DB', completed: true, score: 92 },
      { id: 'a3', title: 'React Sprint', completed: true, score: 90 }
    ],
    internshipStatus: 'Shortlisted',
    avatarBg: 'bg-emerald-500'
  },
  {
    id: 'cand-2',
    name: 'Sara Khan',
    department: 'Information Technology',
    readiness: 88,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 90, verified: true },
      { id: 's2', name: 'SQL', proficiency: 86, verified: true },
      { id: 's3', name: 'React', proficiency: 82, verified: true },
      { id: 's4', name: 'AWS', proficiency: 45, verified: false }
    ],
    majorGaps: [{ id: 's4', name: 'AWS', proficiency: 45 }],
    assessments: [
      { id: 'a1', title: 'Python Fundamentals', completed: true, score: 92 },
      { id: 'a2', title: 'Web Frontend', completed: true, score: 85 }
    ],
    internshipStatus: 'Applied',
    avatarBg: 'bg-sky-500'
  },
  {
    id: 'cand-3',
    name: 'Rahul Patil',
    department: 'Computer Science',
    readiness: 80,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 85, verified: true },
      { id: 's2', name: 'SQL', proficiency: 80, verified: true },
      { id: 's3', name: 'React', proficiency: 50, verified: false }
    ],
    majorGaps: [
      { id: 's3', name: 'React', proficiency: 50 },
      { id: 's4', name: 'AWS', proficiency: 30 }
    ],
    assessments: [{ id: 'a1', title: 'Database Admin', completed: true, score: 82 }],
    internshipStatus: 'Applied',
    avatarBg: 'bg-indigo-500'
  },
  ...baseStudents.map((st, idx) => ({
    ...st,
    avatarBg: idx % 2 === 0 ? 'bg-amber-500' : 'bg-teal-500'
  }))
];

export function calculateCandidateMatch(
  candidate: Student,
  skillRequirements: SkillRequirement[]
): MatchBreakdown {
  if (!skillRequirements || skillRequirements.length === 0) {
    return {
      score: 80,
      requiredMetCount: 0,
      requiredTotalCount: 0,
      positiveNotes: ['Matches baseline candidate criteria'],
      gapNotes: []
    };
  }

  const requiredReqs = skillRequirements.filter((r) => r.type === 'Required');
  const preferredReqs = skillRequirements.filter((r) => r.type === 'Preferred');

  let requiredScoreSum = 0;
  let requiredMaxSum = 0;
  let requiredMetCount = 0;
  const positiveNotes: string[] = [];
  const gapNotes: string[] = [];

  requiredReqs.forEach((req) => {
    const weight = req.importance * 10;
    requiredMaxSum += weight;

    const candidateSkill = candidate.topSkills.find(
      (s) => s.name.toLowerCase() === req.skill.toLowerCase()
    );

    if (candidateSkill && candidateSkill.proficiency >= 60) {
      const proficiencyFactor = Math.min(candidateSkill.proficiency / 100, 1);
      requiredScoreSum += weight * proficiencyFactor;
      requiredMetCount += 1;

      if (candidateSkill.proficiency >= 85) {
        positiveNotes.push(`Strong ${candidateSkill.name} proficiency (${candidateSkill.proficiency}%)`);
      } else {
        positiveNotes.push(`${candidateSkill.name} skills verified (${candidateSkill.proficiency}%)`);
      }
    } else if (candidateSkill) {
      requiredScoreSum += weight * (candidateSkill.proficiency / 100);
      gapNotes.push(`${req.skill} level is basic (${candidateSkill.proficiency}%) - needs improvement`);
    } else {
      gapNotes.push(`Missing ${req.skill} required skill`);
    }
  });

  let preferredScoreSum = 0;
  let preferredMaxSum = 0;

  preferredReqs.forEach((req) => {
    const weight = req.importance * 5;
    preferredMaxSum += weight;

    const candidateSkill = candidate.topSkills.find(
      (s) => s.name.toLowerCase() === req.skill.toLowerCase()
    );

    if (candidateSkill && candidateSkill.proficiency >= 50) {
      preferredScoreSum += weight * (candidateSkill.proficiency / 100);
      positiveNotes.push(`Has preferred skill: ${req.skill} (${candidateSkill.proficiency}%)`);
    } else if (!candidateSkill || candidateSkill.proficiency < 40) {
      gapNotes.push(`${req.skill} (preferred) needs upskilling`);
    }
  });

  const reqRatio = requiredMaxSum > 0 ? requiredScoreSum / requiredMaxSum : 1;
  const prefRatio = preferredMaxSum > 0 ? preferredScoreSum / preferredMaxSum : 1;

  let finalScore = Math.round(reqRatio * 75 + prefRatio * 25);
  finalScore = Math.min(Math.max(finalScore, 40), 99);

  const reqSummaryNote = `✓ ${requiredMetCount}/${requiredReqs.length} required skills met`;
  positiveNotes.unshift(reqSummaryNote);

  return {
    score: finalScore,
    requiredMetCount,
    requiredTotalCount: requiredReqs.length,
    positiveNotes,
    gapNotes
  };
}

export const initialApplications: CandidateApplication[] = [
  {
    id: 'app-1',
    studentId: 'cand-1',
    studentName: 'Aarav Sharma',
    studentDepartment: 'Computer Engineering',
    studentAvatar: 'AS',
    opportunityId: 'opp-101',
    opportunityTitle: 'Full Stack Engineer Intern',
    appliedDate: '2026-08-22',
    status: 'Interview',
    matchScore: 94,
    matchBreakdown: {
      score: 94,
      requiredMetCount: 2,
      requiredTotalCount: 2,
      positiveNotes: ['✓ 2/2 required skills met', 'Strong Python proficiency (94%)', 'Strong SQL proficiency (92%)', 'Has preferred skill: React (88%)'],
      gapNotes: ['AWS needs improvement']
    },
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 94, verified: true },
      { id: 's2', name: 'SQL', proficiency: 92, verified: true },
      { id: 's3', name: 'React', proficiency: 88, verified: true },
      { id: 's4', name: 'AWS', proficiency: 75, verified: true }
    ],
    readiness: 95,
    interviewDate: '2026-09-05 11:00 AM',
    notes: 'Exceptional problem-solving scores. Scheduled technical interview with lead developer.'
  },
  {
    id: 'app-2',
    studentId: 'cand-2',
    studentName: 'Sara Khan',
    studentDepartment: 'Information Technology',
    studentAvatar: 'SK',
    opportunityId: 'opp-101',
    opportunityTitle: 'Full Stack Engineer Intern',
    appliedDate: '2026-08-23',
    status: 'Shortlisted',
    matchScore: 87,
    matchBreakdown: {
      score: 87,
      requiredMetCount: 2,
      requiredTotalCount: 2,
      positiveNotes: ['✓ 2/2 required skills met', 'Strong Python proficiency (90%)', 'SQL skills verified (86%)', 'Has preferred skill: React (82%)'],
      gapNotes: ['AWS (preferred) needs upskilling']
    },
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 90, verified: true },
      { id: 's2', name: 'SQL', proficiency: 86, verified: true },
      { id: 's3', name: 'React', proficiency: 82, verified: true }
    ],
    readiness: 88,
    notes: 'Good academic record and verified React project experience.'
  },
  {
    id: 'app-3',
    studentId: 'cand-3',
    studentName: 'Rahul Patil',
    studentDepartment: 'Computer Science',
    studentAvatar: 'RP',
    opportunityId: 'opp-101',
    opportunityTitle: 'Full Stack Engineer Intern',
    appliedDate: '2026-08-24',
    status: 'Under Review',
    matchScore: 79,
    matchBreakdown: {
      score: 79,
      requiredMetCount: 2,
      requiredTotalCount: 2,
      positiveNotes: ['✓ 2/2 required skills met', 'Python skills verified (85%)', 'SQL skills verified (80%)'],
      gapNotes: ['React level is basic (50%) - needs improvement', 'AWS (preferred) needs upskilling']
    },
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 85, verified: true },
      { id: 's2', name: 'SQL', proficiency: 80, verified: true }
    ],
    readiness: 80,
    notes: 'Strong backend foundation; evaluation in progress for junior assignment.'
  },
  {
    id: 'app-4',
    studentId: 'st1',
    studentName: 'Shahbaz Anjum',
    studentDepartment: 'Bsc-IT',
    studentAvatar: 'SA',
    opportunityId: 'opp-101',
    opportunityTitle: 'Full Stack Engineer Intern',
    appliedDate: '2026-08-21',
    status: 'Selected',
    matchScore: 92,
    matchBreakdown: {
      score: 92,
      requiredMetCount: 2,
      requiredTotalCount: 2,
      positiveNotes: ['✓ 2/2 required skills met', 'Strong Python proficiency (95%)', 'Strong SQL proficiency (90%)'],
      gapNotes: ['AWS cloud certification pending']
    },
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 95, verified: true },
      { id: 's2', name: 'SQL', proficiency: 90, verified: true }
    ],
    readiness: 94,
    notes: 'Offer letter dispatched on Aug 29. Starting Sep 15.'
  },
  {
    id: 'app-5',
    studentId: 'st2',
    studentName: 'Ayesha Kadri',
    studentDepartment: 'Information Technology',
    studentAvatar: 'AK',
    opportunityId: 'opp-102',
    opportunityTitle: 'Data & Cloud Trainee',
    appliedDate: '2026-08-26',
    status: 'Applied',
    matchScore: 84,
    matchBreakdown: {
      score: 84,
      requiredMetCount: 1,
      requiredTotalCount: 2,
      positiveNotes: ['✓ 1/2 required skills met', 'Python proficiency (88%)'],
      gapNotes: ['AWS knowledge in training']
    },
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 88, verified: true },
      { id: 's3', name: 'React', proficiency: 80, verified: false }
    ],
    readiness: 87
  }
];

export const initialFeedback: IndustryFeedback[] = [
  {
    id: 'fb-1',
    studentId: 'st1',
    studentName: 'Shahbaz Anjum',
    opportunityTitle: 'Full Stack Engineer Intern',
    technicalSkillsScore: 5,
    communicationScore: 4,
    problemSolvingScore: 5,
    jobReadinessScore: 4,
    overallPerformanceScore: 5,
    missingSkills: ['AWS Cloud Architecture', 'CI/CD Pipeline'],
    recommendedSkills: ['AWS Certified Cloud Practitioner', 'Docker Containerization'],
    comments: 'Shahbaz demonstrated outstanding code quality and quick learning curve in Python and SQL microservices. We recommend reinforcing AWS cloud automation in college curriculum.',
    date: '2026-08-28'
  }
];

export const COMPANY_PROFILE_STORAGE_KEY = 'skillconnect.companyProfile';
export const OPPORTUNITIES_STORAGE_KEY = 'skillconnect.industryOpportunities';
export const APPLICATIONS_STORAGE_KEY = 'skillconnect.candidateApplications';
export const FEEDBACK_STORAGE_KEY = 'skillconnect.industryFeedback';

export const getStoredCompanyProfile = (): CompanyProfile => {
  if (typeof window === 'undefined') return initialCompanyProfile;
  try {
    const raw = localStorage.getItem(COMPANY_PROFILE_STORAGE_KEY);
    return raw ? { ...initialCompanyProfile, ...JSON.parse(raw) } : initialCompanyProfile;
  } catch (e) {
    return initialCompanyProfile;
  }
};

export const saveCompanyProfile = (profile: CompanyProfile) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COMPANY_PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

export const getStoredOpportunities = (): IndustryOpportunity[] => {
  if (typeof window === 'undefined') return initialIndustryOpportunities;
  try {
    const raw = localStorage.getItem(OPPORTUNITIES_STORAGE_KEY);
    return raw && JSON.parse(raw).length > 0 ? JSON.parse(raw) : initialIndustryOpportunities;
  } catch (e) {
    return initialIndustryOpportunities;
  }
};

export const saveOpportunities = (opps: IndustryOpportunity[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(OPPORTUNITIES_STORAGE_KEY, JSON.stringify(opps));
};

export const getStoredApplications = (): CandidateApplication[] => {
  if (typeof window === 'undefined') return initialApplications;
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    return raw && JSON.parse(raw).length > 0 ? JSON.parse(raw) : initialApplications;
  } catch (e) {
    return initialApplications;
  }
};

export const saveApplications = (apps: CandidateApplication[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
};

export const getStoredFeedback = (): IndustryFeedback[] => {
  if (typeof window === 'undefined') return initialFeedback;
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return raw && JSON.parse(raw).length > 0 ? JSON.parse(raw) : initialFeedback;
  } catch (e) {
    return initialFeedback;
  }
};

export const saveFeedback = (fb: IndustryFeedback[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(fb));
};
