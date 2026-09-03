export type Skill = {
  id: string;
  name: string;
  proficiency: number; // 0-100
  verified?: boolean;
};

export type IndustryDemand = {
  skill: string;
  demand: number;
  proficiency: number;
  affectedStudents: number;
  growth: number;
  category: string;
  industries: string[];
  roles: string[];
};

export type SkillGap = IndustryDemand & {
  id: string;
  name: string;
  gap: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  trainingId?: string;
};

export type Assessment = {
  id: string;
  title: string;
  completed: boolean;
  score?: number; // 0-100
  date?: string;
};

export type Student = {
  id: string;
  name: string;
  department: string;
  readiness: number; // 0-100
  topSkills: Skill[];
  majorGaps: Skill[]; // skills where proficiency low
  assessments: Assessment[];
  internshipStatus?: 'Not applied' | 'Applied' | 'Internship' | 'Placed' | 'Shortlisted';
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  category: 'Internship' | 'Trainee' | 'Full-Time' | 'Part-Time';
  requiredSkills: string[];
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  deadline: string;
  description: string;
  openPositions: number;
  priority: 'High' | 'Medium' | 'Low';
  matchScore: number;
};

export type RecommendationVideo = {
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
};

export type TrainingRecommendation = {
  id: string;
  title: string;
  skill: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  videos: RecommendationVideo[];
};

export type ProfileData = {
  name: string;
  email: string;
  institution: string;
  department: string;
  designation: string;
  expertise: string[];
  courses: string[];
  experience: string;
  phone: string;
  avatar: string;
  photo?: string | null;
};

export type LearningVideo = {
  id: string;
  title: string;
  skill: string;
  category: string;
  description: string;
  url: string;
  channel: string;
  thumbnail?: string;
};

export type SkillImportance = 1 | 2 | 3;

export type SkillRequirement = {
  skill: string;
  importance: SkillImportance;
  type: 'Required' | 'Preferred';
};

export type MatchBreakdown = {
  score: number;
  requiredMetCount: number;
  requiredTotalCount: number;
  positiveNotes: string[];
  gapNotes: string[];
};

export type CompanyProfile = {
  name: string;
  logo?: string | null;
  industry: string;
  description: string;
  location: string;
  website: string;
  size: string;
  contactEmail: string;
  contactPhone: string;
  hrContact: string;
};

export type IndustryOpportunity = {
  id: string;
  title: string;
  company: string;
  category: 'Internship' | 'Trainee' | 'Full-Time' | 'Part-Time';
  description: string;
  skillRequirements: SkillRequirement[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  duration: string;
  stipend: string;
  openPositions: number;
  deadline: string;
  eligibility: string;
  createdAt: string;
  status: 'Active' | 'Closed' | 'Draft';
  applicantCount: number;
};

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export type CandidateApplication = {
  id: string;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  studentAvatar?: string;
  opportunityId: string;
  opportunityTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchScore: number;
  matchBreakdown: MatchBreakdown;
  topSkills: Skill[];
  readiness: number;
  interviewDate?: string;
  notes?: string;
};

export type IndustryFeedback = {
  id: string;
  studentId: string;
  studentName: string;
  opportunityTitle: string;
  technicalSkillsScore: number; // 1-5
  communicationScore: number; // 1-5
  problemSolvingScore: number; // 1-5
  jobReadinessScore: number; // 1-5
  overallPerformanceScore: number; // 1-5
  missingSkills: string[];
  recommendedSkills: string[];
  comments: string;
  date: string;
};

