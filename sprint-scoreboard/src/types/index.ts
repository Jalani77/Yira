export type TaskCategory = 'feature' | 'bug' | 'design' | 'urgent';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  category: TaskCategory;
  status: TaskStatus;
  assigneeId: string;
  completedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  tasksCompleted: number;
}

export interface VictoryItem {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  taskTitle: string;
  points: number;
  mediaType: 'video' | 'screenshot';
  mediaUrl: string;
  timestamp: Date;
  upvotes: number;
  upvotedBy: string[];
}

export interface SprintState {
  tasks: Task[];
  users: User[];
  victories: VictoryItem[];
  weeklyGoal: number;
  currentWeekPoints: number;
}

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  feature: 'bg-blue-500',
  bug: 'bg-purple-500',
  design: 'bg-pink-500',
  urgent: 'bg-orange-500',
};

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  feature: 'Feature',
  bug: 'Bug Fix',
  design: 'Design',
  urgent: 'Urgent',
};
