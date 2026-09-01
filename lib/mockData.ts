import type { Student, Skill } from '../types';

export const skillsMaster: Skill[] = [
  { id: 's1', name: 'Python', proficiency: 82, verified: true },
  { id: 's2', name: 'SQL', proficiency: 76, verified: true },
  { id: 's3', name: 'React', proficiency: 68, verified: false },
  { id: 's4', name: 'AWS', proficiency: 42, verified: false },
  { id: 's5', name: 'Docker', proficiency: 51, verified: false }
];

export const students: Student[] = [
  {
    id: 'st1',
    name: 'Aarav Sharma',
    department: 'Computer Science',
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
    name: 'Sara Khan',
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
    name: 'Rahul Patil',
    department: 'Computer Engineering',
    readiness: 79,
    topSkills: [
      { id: 's1', name: 'Python', proficiency: 82 },
      { id: 's2', name: 'SQL', proficiency: 70 }
    ],
    majorGaps: [{ id: 's4', name: 'AWS', proficiency: 30 }],
    assessments: [{ id: 'a1', title: 'DBMS', completed: true, score: 72 }],
    internshipStatus: 'Not applied'
  }
];

export const aggregatedKPIs = {
  totalStudents: 432,
  studentsAssessed: 380,
  avgSkillReadiness: 72,
  internshipsReady: 89,
  studentsWithSignificantGaps: 164,
  activeIndustryOppportunities: 27
};
