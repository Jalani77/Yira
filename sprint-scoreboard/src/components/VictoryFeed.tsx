'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSprint } from '@/store/SprintContext';
import { Play, Image as ImageIcon, ThumbsUp, Clock, Sparkles, Trophy } from 'lucide-react';

export default function VictoryFeed() {
  const { victories, upvoteVictory } = useSprint();
  
  // Assume current user is user-1 for demo purposes
  const currentUserId = 'user-1';

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold">Victory Feed</h2>
        </div>
        <p className="text-emerald-100 text-sm">
          Celebrate completed work! 🎉
        </p>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="popLayout">
          {victories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Sparkles className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-center">
                Complete tasks to share<br />your victories here!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {victories.map((victory, index) => {
                const hasUpvoted = victory.upvotedBy.includes(currentUserId);
                const isOwn = victory.userId === currentUserId;

                return (
                  <motion.div
                    key={victory.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                  >
                    {/* Media Preview */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                      {victory.mediaType === 'video' ? (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                            >
                              <Play className="w-8 h-8 text-gray-700 ml-1" />
                            </motion.div>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Play className="w-3 h-3" /> Demo Video
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" aria-hidden="true" />
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" aria-hidden="true" /> Screenshot
                          </div>
                        </>
                      )}
                      
                      {/* Points Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-green-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg"
                      >
                        +{victory.points} pts
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      {/* Task Title */}
                      <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {victory.taskTitle}
                      </h4>

                      {/* User & Time */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{victory.userAvatar}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {victory.userName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(victory.timestamp)}
                        </div>
                      </div>

                      {/* Upvote Button */}
                      <motion.button
                        onClick={() => !isOwn && !hasUpvoted && upvoteVictory(victory.id, currentUserId)}
                        disabled={isOwn || hasUpvoted}
                        whileHover={!isOwn && !hasUpvoted ? { scale: 1.02 } : {}}
                        whileTap={!isOwn && !hasUpvoted ? { scale: 0.98 } : {}}
                        className={`
                          w-full py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all
                          ${hasUpvoted || isOwn
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-md'
                          }
                        `}
                      >
                        <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-current' : ''}`} />
                        <span>
                          {hasUpvoted ? 'High-Fived!' : isOwn ? 'Your Victory' : 'High-Five! +10 pts'}
                        </span>
                        {victory.upvotes > 0 && (
                          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                            {victory.upvotes}
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          High-fives give <span className="text-green-600 font-semibold">+10 bonus pts</span> to creators!
        </p>
      </div>
    </div>
  );
}
