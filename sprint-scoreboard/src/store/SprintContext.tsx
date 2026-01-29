'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task, User, VictoryItem, SprintState, TaskStatus } from '@/types';

// Initial demo data
const initialUsers: User[] = [
  { id: 'user-1', name: 'Alex Chen', avatar: '👨‍💻', points: 850, tasksCompleted: 5 },
  { id: 'user-2', name: 'Sarah Miller', avatar: '👩‍🎨', points: 1200, tasksCompleted: 7 },
  { id: 'user-3', name: 'Mike Johnson', avatar: '🧑‍🔧', points: 650, tasksCompleted: 4 },
  { id: 'user-4', name: 'Emma Davis', avatar: '👩‍💼', points: 980, tasksCompleted: 6 },
];

const initialTasks: Task[] = [
  { id: 'task-1', title: 'Implement user auth', description: 'Add OAuth login flow', points: 300, category: 'feature', status: 'todo', assigneeId: 'user-1' },
  { id: 'task-2', title: 'Fix navigation bug', description: 'Menu not closing on mobile', points: 150, category: 'bug', status: 'todo', assigneeId: 'user-2' },
  { id: 'task-3', title: 'Design dashboard', description: 'Create mockups for analytics', points: 250, category: 'design', status: 'in-progress', assigneeId: 'user-2' },
  { id: 'task-4', title: 'Critical security patch', description: 'Update dependencies ASAP', points: 400, category: 'urgent', status: 'in-progress', assigneeId: 'user-3' },
  { id: 'task-5', title: 'API optimization', description: 'Reduce response times', points: 200, category: 'feature', status: 'todo', assigneeId: 'user-4' },
  { id: 'task-6', title: 'Unit test coverage', description: 'Add tests for core modules', points: 180, category: 'feature', status: 'todo', assigneeId: 'user-1' },
  { id: 'task-7', title: 'Mobile responsiveness', description: 'Fix tablet breakpoints', points: 120, category: 'bug', status: 'in-progress', assigneeId: 'user-4' },
  { id: 'task-8', title: 'Onboarding flow', description: 'Design new user experience', points: 350, category: 'design', status: 'todo', assigneeId: 'user-3' },
];

const initialVictories: VictoryItem[] = [
  {
    id: 'victory-1',
    taskId: 'task-0',
    userId: 'user-2',
    userName: 'Sarah Miller',
    userAvatar: '👩‍🎨',
    taskTitle: 'Landing page redesign',
    points: 300,
    mediaType: 'screenshot',
    mediaUrl: '/demo-screenshot.jpg',
    timestamp: new Date(Date.now() - 3600000),
    upvotes: 5,
    upvotedBy: ['user-1', 'user-3', 'user-4'],
  },
  {
    id: 'victory-2',
    taskId: 'task-0b',
    userId: 'user-1',
    userName: 'Alex Chen',
    userAvatar: '👨‍💻',
    taskTitle: 'Database migration',
    points: 400,
    mediaType: 'video',
    mediaUrl: '/demo-video.mp4',
    timestamp: new Date(Date.now() - 7200000),
    upvotes: 8,
    upvotedBy: ['user-2', 'user-3', 'user-4'],
  },
];

interface SprintContextType extends SprintState {
  moveTask: (taskId: string, newStatus: TaskStatus) => Task | null;
  addVictory: (victory: Omit<VictoryItem, 'id' | 'timestamp' | 'upvotes' | 'upvotedBy'>) => void;
  upvoteVictory: (victoryId: string, userId: string) => void;
  getTeamAveragePoints: () => number;
  isUserBelowAverage: (userId: string) => boolean;
  getPendingVictoryTask: () => Task | null;
  clearPendingVictory: () => void;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export function SprintProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [victories, setVictories] = useState<VictoryItem[]>(initialVictories);
  const [pendingVictoryTaskId, setPendingVictoryTaskId] = useState<string | null>(null);
  
  const weeklyGoal = 5000;
  const currentWeekPoints = users.reduce((sum, user) => sum + user.points, 0);

  const getTeamAveragePoints = useCallback(() => {
    if (users.length === 0) return 0;
    return currentWeekPoints / users.length;
  }, [users, currentWeekPoints]);

  const isUserBelowAverage = useCallback((userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return false;
    const average = getTeamAveragePoints();
    // Consider "significantly below" as 30% less than average
    return user.points < average * 0.7;
  }, [users, getTeamAveragePoints]);

  const moveTask = useCallback((taskId: string, newStatus: TaskStatus): Task | null => {
    let movedTask: Task | null = null;
    
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const wasNotDone = task.status !== 'done';
        const isNowDone = newStatus === 'done';
        
        movedTask = { ...task, status: newStatus };
        
        // If task is being moved to done for the first time
        if (wasNotDone && isNowDone) {
          movedTask.completedAt = new Date();
          setPendingVictoryTaskId(taskId);
          
          // Update user points
          setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === task.assigneeId) {
              return {
                ...user,
                points: user.points + task.points,
                tasksCompleted: user.tasksCompleted + 1,
              };
            }
            return user;
          }));
        }
        
        return movedTask;
      }
      return task;
    }));
    
    return movedTask;
  }, []);

  const getPendingVictoryTask = useCallback(() => {
    if (!pendingVictoryTaskId) return null;
    return tasks.find(t => t.id === pendingVictoryTaskId) || null;
  }, [pendingVictoryTaskId, tasks]);

  const clearPendingVictory = useCallback(() => {
    setPendingVictoryTaskId(null);
  }, []);

  const addVictory = useCallback((victory: Omit<VictoryItem, 'id' | 'timestamp' | 'upvotes' | 'upvotedBy'>) => {
    const newVictory: VictoryItem = {
      ...victory,
      id: `victory-${Date.now()}`,
      timestamp: new Date(),
      upvotes: 0,
      upvotedBy: [],
    };
    setVictories(prev => [newVictory, ...prev]);
    clearPendingVictory();
  }, [clearPendingVictory]);

  const upvoteVictory = useCallback((victoryId: string, odOfUpvoter: string) => {
    setVictories(prev => prev.map(victory => {
      if (victory.id === victoryId && !victory.upvotedBy.includes(odOfUpvoter)) {
        // Add bonus points to the victory creator
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === victory.userId) {
            return { ...user, points: user.points + 10 };
          }
          return user;
        }));
        
        return {
          ...victory,
          upvotes: victory.upvotes + 1,
          upvotedBy: [...victory.upvotedBy, odOfUpvoter],
        };
      }
      return victory;
    }));
  }, []);

  return (
    <SprintContext.Provider
      value={{
        tasks,
        users,
        victories,
        weeklyGoal,
        currentWeekPoints,
        moveTask,
        addVictory,
        upvoteVictory,
        getTeamAveragePoints,
        isUserBelowAverage,
        getPendingVictoryTask,
        clearPendingVictory,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
}

export function useSprint() {
  const context = useContext(SprintContext);
  if (context === undefined) {
    throw new Error('useSprint must be used within a SprintProvider');
  }
  return context;
}
