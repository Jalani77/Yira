'use client';

import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';
import Leaderboard from '@/components/Leaderboard';
import VictoryFeed from '@/components/VictoryFeed';
import VictoryModal from '@/components/VictoryModal';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="h-full grid grid-cols-12 gap-6">
          {/* Leaderboard - Left Side */}
          <div className="col-span-3 min-h-0">
            <Leaderboard />
          </div>

          {/* Task Board - Center */}
          <div className="col-span-6 min-h-0">
            <TaskBoard />
          </div>

          {/* Victory Feed - Right Side */}
          <div className="col-span-3 min-h-0">
            <VictoryFeed />
          </div>
        </div>
      </main>

      {/* Victory Modal */}
      <VictoryModal />
    </div>
  );
}
