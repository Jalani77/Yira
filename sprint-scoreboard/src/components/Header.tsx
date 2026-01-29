'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Target } from 'lucide-react';
import { useSprint } from '@/store/SprintContext';

export default function Header() {
  const { weeklyGoal, currentWeekPoints, users } = useSprint();
  const progress = Math.min((currentWeekPoints / weeklyGoal) * 100, 100);
  const totalTasks = users.reduce((sum, user) => sum + user.tasksCompleted, 0);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sprint Scoreboard</h1>
              <p className="text-blue-200 text-sm">Week 4 • Jan 2026</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {/* Tasks Completed */}
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">{totalTasks}</p>
                <p className="text-blue-200 text-xs">Tasks Done</p>
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              <div className="w-64">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">Weekly Goal</span>
                  <motion.span
                    key={currentWeekPoints}
                    initial={{ scale: 1.3, color: '#4ade80' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="font-bold"
                  >
                    {currentWeekPoints.toLocaleString()} / {weeklyGoal.toLocaleString()} pts
                  </motion.span>
                </div>
                <div className="h-3 bg-blue-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-blue-200 text-xs mt-1 text-right">
                  {Math.round(progress)}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
