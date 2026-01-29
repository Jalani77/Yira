'use client';

import { motion } from 'framer-motion';
import { Task, CATEGORY_COLORS, CATEGORY_LABELS } from '@/types';
import { useSprint } from '@/store/SprintContext';
import { User, Clock, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export default function TaskCard({ task, isDragging }: TaskCardProps) {
  const { users } = useSprint();
  const assignee = users.find(u => u.id === task.assigneeId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      className={`
        bg-white rounded-xl shadow-md border-2 border-gray-100 p-4 cursor-grab
        ${isDragging ? 'shadow-2xl ring-2 ring-blue-400 rotate-2' : ''}
        ${task.category === 'urgent' ? 'border-l-4 border-l-orange-500' : ''}
        transition-all duration-200
      `}
    >
      {/* Category Badge & Points */}
      <div className="flex items-center justify-between mb-3">
        <span className={`
          ${CATEGORY_COLORS[task.category]} text-white text-xs font-semibold px-2 py-1 rounded-full
        `}>
          {CATEGORY_LABELS[task.category]}
        </span>
        <motion.span
          className="text-green-600 font-bold text-lg flex items-center gap-1"
          whileHover={{ scale: 1.1 }}
        >
          +{task.points}
          <span className="text-xs font-normal text-green-500">pts</span>
        </motion.span>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        {/* Assignee */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{assignee?.avatar}</span>
          <span className="text-sm text-gray-600 font-medium">
            {assignee?.name?.split(' ')[0]}
          </span>
        </div>

        {/* Status indicator */}
        {task.status === 'done' ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : task.status === 'in-progress' ? (
          <div className="flex items-center gap-1 text-blue-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">In Progress</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
