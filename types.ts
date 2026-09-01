export type Skill = {
  id: string;
  name: string;
  proficiency: number; // 0-100
  verified?: boolean;
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
