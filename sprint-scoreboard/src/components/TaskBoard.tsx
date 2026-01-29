'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useSprint } from '@/store/SprintContext';
import { TaskStatus } from '@/types';
import TaskCard from './TaskCard';
import { ListTodo, PlayCircle, CheckCircle, Sparkles } from 'lucide-react';

const columns: { id: TaskStatus; title: string; icon: React.ReactNode; color: string }[] = [
  { id: 'todo', title: 'To-Do', icon: <ListTodo className="w-5 h-5" />, color: 'text-gray-600' },
  { id: 'in-progress', title: 'In Progress', icon: <PlayCircle className="w-5 h-5" />, color: 'text-blue-600' },
  { id: 'done', title: 'Done', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-600' },
];

export default function TaskBoard() {
  const { tasks, moveTask } = useSprint();

  const handleDragEnd = (result: DropResult) => {
    
    if (!result.destination) return;
    
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as TaskStatus;
    
    moveTask(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 h-full">
        {columns.map((column) => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          const totalPoints = columnTasks.reduce((sum, t) => sum + t.points, 0);

          return (
            <div
              key={column.id}
              className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-4 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={column.color}>{column.icon}</span>
                    <h3 className={`font-bold text-lg ${column.color}`}>
                      {column.title}
                    </h3>
                    <span className="bg-gray-200 text-gray-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  {column.id !== 'done' && (
                    <span className="text-gray-400 text-sm">
                      {totalPoints} pts
                    </span>
                  )}
                  {column.id === 'done' && (
                    <motion.span
                      key={totalPoints}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-green-500 font-semibold text-sm flex items-center gap-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      {totalPoints} pts earned!
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      flex-1 p-3 overflow-y-auto space-y-3 min-h-[200px] transition-colors
                      ${snapshot.isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-200 ring-inset' : ''}
                    `}
                  >
                    <AnimatePresence mode="popLayout">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                    
                    {/* Empty State */}
                    {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                      <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                        <span className="text-4xl mb-2">
                          {column.id === 'todo' ? '📋' : column.id === 'in-progress' ? '⚡' : '🎉'}
                        </span>
                        <p className="text-sm">
                          {column.id === 'done' ? 'Complete tasks to earn points!' : 'Drag tasks here'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
