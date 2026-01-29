'use client';

import { motion } from 'framer-motion';
import { useSprint } from '@/store/SprintContext';
import { Trophy, TrendingUp, AlertTriangle, Award, Star } from 'lucide-react';

export default function Leaderboard() {
  const { users, weeklyGoal, currentWeekPoints, isUserBelowAverage, getTeamAveragePoints } = useSprint();
  
  // Sort users by points descending
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const teamAverage = getTeamAveragePoints();
  const progressToGoal = (currentWeekPoints / weeklyGoal) * 100;

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <span className="text-2xl">🥇</span>;
      case 1:
        return <span className="text-2xl">🥈</span>;
      case 2:
        return <span className="text-2xl">🥉</span>;
      default:
        return <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold">Team Leaderboard</h2>
        </div>
        
        {/* Team Progress */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Team Progress</span>
            <span className="font-bold">{Math.round(progressToGoal)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressToGoal, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-white/70">
            <span>Avg: {Math.round(teamAverage)} pts/member</span>
            <span>Goal: {weeklyGoal.toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {sortedUsers.map((user, index) => {
            const isBelowAverage = isUserBelowAverage(user.id);
            const isTopPerformer = index === 0;
            const userProgressPercent = (user.points / (weeklyGoal / users.length)) * 100;

            return (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative rounded-xl p-4 border-2 transition-all
                  ${isBelowAverage 
                    ? 'bg-yellow-50 border-yellow-300 ring-2 ring-yellow-200' 
                    : isTopPerformer 
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-400' 
                      : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                  }
                `}
              >
                {/* Warning for below average */}
                {isBelowAverage && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                )}

                {/* Top performer badge */}
                {isTopPerformer && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                  </motion.div>
                )}

                <div className="flex items-center gap-3">
                  {/* Rank */}
                  {getRankBadge(index)}

                  {/* Avatar */}
                  <div className="text-3xl">{user.avatar}</div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-800 truncate">
                        {user.name}
                      </h4>
                      {isBelowAverage && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                          Needs support
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {user.tasksCompleted} tasks
                      </span>
                      <span className="text-gray-300">•</span>
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                    
                    {/* Individual Progress Bar */}
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            isBelowAverage 
                              ? 'bg-yellow-400' 
                              : 'bg-gradient-to-r from-green-400 to-emerald-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(userProgressPercent, 100)}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <motion.div
                    key={user.points}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <p className="text-2xl font-bold text-green-600">
                      {user.points.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">points</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-4 h-4" />
            <span>Total Team Points</span>
          </div>
          <motion.span
            key={currentWeekPoints}
            initial={{ scale: 1.1, color: '#22c55e' }}
            animate={{ scale: 1, color: '#374151' }}
            className="font-bold text-lg"
          >
            {currentWeekPoints.toLocaleString()}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
