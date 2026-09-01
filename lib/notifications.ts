export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
};

export const notificationsSeed: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Assessment published',
    message: 'Python Fundamentals Quiz is now live for students.',
    time: '2 minutes ago',
    read: false,
    type: 'success',
  },
  {
    id: 'n2',
    title: 'Skill gap alert',
    message: 'AWS proficiency is below target for 68 students in BSc-IT.',
    time: '18 minutes ago',
    read: false,
    type: 'warning',
  },
  {
    id: 'n3',
    title: 'Opportunity match',
    message: 'Nexa Labs internship matches 3 students in your cohort.',
    time: '1 hour ago',
    read: true,
    type: 'info',
  },
];
