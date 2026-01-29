# Sprint Scoreboard 🏆

A high-energy, gamified project management MVP that replaces traditional Jira tickets with a point-based leaderboard and video verification feed.

## Features

### Team Leaderboard
- Real-time point tracking for all team members
- Progress bar toward weekly team goal
- Visual "Point Imbalance" detection - highlights users who need support (significantly below team average)
- Rank badges (🥇🥈🥉) for top performers

### Task Board
- Three-column Kanban board: To-Do, In Progress, Done
- Drag-and-drop task management
- Color-coded task categories: Feature (Blue), Bug (Purple), Design (Pink), Urgent (Orange)
- Point values displayed prominently on each card
- Smooth animations powered by Framer Motion

### Victory Feed
- Social feed showcasing completed work
- Video/screenshot proof of completion
- "High-Five" upvote system (+10 bonus pts per upvote)
- Real-time updates when team members complete tasks

### Point & Accountability Logic
- Points are added to user profiles only when tasks move to "Done"
- Automatic leaderboard updates
- Team goal progress tracking
- Yellow highlighting for users significantly below team average

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
sprint-scoreboard/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Main dashboard page
│   ├── components/
│   │   ├── Header.tsx       # App header with team stats
│   │   ├── Leaderboard.tsx  # Team leaderboard component
│   │   ├── TaskBoard.tsx    # Kanban task board
│   │   ├── TaskCard.tsx     # Individual task card
│   │   ├── VictoryFeed.tsx  # Social feed sidebar
│   │   └── VictoryModal.tsx # Victory upload modal
│   ├── store/
│   │   └── SprintContext.tsx # Global state management
│   └── types/
│       └── index.ts         # TypeScript type definitions
└── public/                  # Static assets
```

## Usage

1. **View the Leaderboard**: See all team members ranked by points
2. **Manage Tasks**: Drag tasks between columns (To-Do → In Progress → Done)
3. **Earn Points**: Move tasks to "Done" to earn points
4. **Upload Victories**: When completing a task, optionally upload proof
5. **High-Five Teammates**: Upvote victories in the feed to give +10 bonus points

## Design Philosophy

- **Live Score Dashboard**: The interface feels like a real-time sports scoreboard
- **Clean & Light**: Light-themed aesthetic with bold typography
- **Vibrant Accents**: Blue header, Green for points, Orange for urgent tasks
- **Celebratory**: Animations and visual feedback make completing tasks feel rewarding

## License

MIT
