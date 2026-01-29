'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSprint } from '@/store/SprintContext';
import { X, Upload, Video, Image, Trophy, Sparkles, Camera, Film } from 'lucide-react';

export default function VictoryModal() {
  const { getPendingVictoryTask, clearPendingVictory, addVictory, users } = useSprint();
  const [mediaType, setMediaType] = useState<'video' | 'screenshot'>('screenshot');
  const [isUploading, setIsUploading] = useState(false);
  
  const task = getPendingVictoryTask();
  const assignee = task ? users.find(u => u.id === task.assigneeId) : null;

  const handleUpload = async () => {
    if (!task || !assignee) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addVictory({
      taskId: task.id,
      userId: assignee.id,
      userName: assignee.name,
      userAvatar: assignee.avatar,
      taskTitle: task.title,
      points: task.points,
      mediaType,
      mediaUrl: mediaType === 'video' ? '/demo-video.mp4' : '/demo-screenshot.jpg',
    });
    
    setIsUploading(false);
  };

  const handleSkip = () => {
    clearPendingVictory();
  };

  if (!task || !assignee) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleSkip}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header with confetti background */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center relative overflow-hidden">
            {/* Animated sparkles */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 left-8"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-6 right-12"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 right-8"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3"
            >
              <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-1">Victory! 🎉</h2>
            <p className="text-green-100">Time to show off your work</p>
            
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Task Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{assignee.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-800">{assignee.name}</p>
                  <p className="text-sm text-gray-500">Just completed:</p>
                </div>
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">{task.title}</h4>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full"
              >
                <span className="text-lg">+{task.points}</span>
                <span className="text-sm">points earned!</span>
              </motion.div>
            </div>

            {/* Media Type Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Upload proof of your victory:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMediaType('screenshot')}
                  className={`
                    p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${mediaType === 'screenshot'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }
                  `}
                >
                  <Camera className="w-8 h-8" />
                  <span className="font-medium">Screenshot</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMediaType('video')}
                  className={`
                    p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${mediaType === 'video'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }
                  `}
                >
                  <Film className="w-8 h-8" />
                  <span className="font-medium">Video Clip</span>
                </motion.button>
              </div>
            </div>

            {/* Upload Zone */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {mediaType === 'video' ? 'MP4, WebM (max 30s)' : 'PNG, JPG (max 5MB)'}
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 py-3 px-4 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Skip for now
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Share Victory
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
