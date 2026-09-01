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
