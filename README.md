# The Vega Family Survivor Fantasy League Tracker

A responsive web application for tracking a family fantasy league based on the TV show Survivor. Built with React, React Router, and Tailwind CSS.

## Features

### 📊 Leaderboard
- Real-time rankings of all family members by total points
- Visual highlighting of the current leader
- Statistics cards showing total players, highest score, and average score
- Color-coded family member identification

### 📈 Weekly Breakdown
- Week-by-week score analysis
- Dropdown selector to view any completed week
- Visual progress bars showing relative performance
- Detailed contestant-level scoring
- Comprehensive table of all contestants with their weekly points

### ⚙️ Admin Panel
- Manual data entry for weekly scores
- Week selector for editing any week's scores
- Easy-to-use input fields for each contestant
- Load existing scores functionality
- Save confirmation with visual feedback
- Protected interface (auth to be added in production)

### 📖 Rules Page
- Complete explanation of the fantasy league rules
- Detailed scoring system breakdown
- Draft rules and procedures
- Strategy tips for players
- Visual cards for each rule category

## Project Structure

```
/src
  /app
    /components
      Layout.tsx              # Main layout with navigation
    /context
      GameContext.tsx         # State management & data logic
    /data
      mockData.ts            # Mock data (contestants, family, scores)
    /pages
      Leaderboard.tsx        # Main leaderboard page
      WeeklyBreakdown.tsx    # Weekly score breakdown
      Admin.tsx              # Score entry interface
      Rules.tsx              # Rules and instructions
      NotFound.tsx           # 404 page
    App.tsx                  # Root component
    routes.ts                # React Router configuration
```

## Tech Stack

- **React** - UI framework
- **React Router 7** - Client-side routing with data mode
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Lucide React** - Icon library

## Database Integration Guide

The application is structured to make Supabase integration straightforward. Here's where to add database functionality:

### 1. Setup Supabase Client

Create `/src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 2. Database Schema

Create these tables in Supabase:

**contestants**
- id (uuid, primary key)
- name (text)
- tribe (text)
- is_eliminated (boolean)
- created_at (timestamp)

**family_members**
- id (uuid, primary key)
- name (text)
- color (text)
- created_at (timestamp)

**draft_picks**
- id (uuid, primary key)
- family_member_id (uuid, foreign key)
- contestant_id (uuid, foreign key)
- pick_number (int)
- created_at (timestamp)

**weekly_scores**
- id (uuid, primary key)
- week_number (int)
- contestant_id (uuid, foreign key)
- points (int)
- created_at (timestamp)
- updated_at (timestamp)

### 3. Update GameContext

Replace the mock data and state management in `/src/app/context/GameContext.tsx`:

```typescript
// Replace useState with Supabase queries
const [weeklyScores, setWeeklyScores] = useState<WeeklyScore[]>([])

// Fetch data on mount
useEffect(() => {
  async function fetchData() {
    const { data: scores } = await supabase
      .from('weekly_scores')
      .select('*')
    setWeeklyScores(scores || [])
  }
  fetchData()
}, [])

// Update the updateWeeklyScores function
const updateWeeklyScores = async (weekNumber: number, scores: { contestantId: string; points: number }[]) => {
  const { error } = await supabase
    .from('weekly_scores')
    .upsert(
      scores.map(s => ({
        week_number: weekNumber,
        contestant_id: s.contestantId,
        points: s.points,
        updated_at: new Date().toISOString()
      }))
    )
  
  if (error) {
    console.error('Error saving scores:', error)
    return
  }
  
  // Refresh data after save
  const { data } = await supabase.from('weekly_scores').select('*')
  setWeeklyScores(data || [])
}
```

### 4. Add Authentication

For the Admin page, add Supabase Auth:

```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser()

// Protect admin routes
if (!user) {
  return <Navigate to="/login" />
}
```

### 5. Real-time Updates

Add real-time subscriptions for live leaderboard updates:

```typescript
useEffect(() => {
  const channel = supabase
    .channel('weekly_scores_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'weekly_scores' },
      (payload) => {
        // Refresh leaderboard when scores change
        fetchLeaderboard()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

## Key Integration Points

Look for `// TODO:` comments in the code marking where Supabase integration should be added:

- **GameContext.tsx** - All data fetching and mutations
- **Admin.tsx** - Score saving functionality
- Protected route logic for admin access

## Current Mock Data

The app includes comprehensive mock data:
- 10 Survivor contestants (Blue and Red tribes)
- 5 Vega family members
- 3 weeks of scoring data
- Draft pick assignments

## Running the Application

The app is ready to run in the Figma Make environment. Navigate through the pages using the top navigation bar:
- **Leaderboard** - See current rankings
- **Weekly** - View week-by-week breakdowns
- **Admin** - Enter/edit weekly scores
- **Rules** - Read game rules and scoring system

## Future Enhancements

- [ ] Add Supabase integration for data persistence
- [ ] Implement authentication for admin access
- [ ] Add real-time updates via Supabase subscriptions
- [ ] Create automated point calculation based on episode recaps
- [ ] Add contestant profile pages with detailed stats
- [ ] Implement draft functionality for new seasons
- [ ] Add historical season data and archives
- [ ] Create mobile app version
- [ ] Add email notifications for weekly updates
- [ ] Implement trading/waiver wire system

## Design Philosophy

- **Clean & Modern** - SaaS-style interface with bold typography and clear hierarchy
- **Responsive** - Works seamlessly on desktop, tablet, and mobile
- **User-Friendly** - Intuitive navigation and clear visual feedback
- **Performance** - Optimized components and efficient rendering
- **Maintainable** - Well-organized code with clear separation of concerns

---

Built with ❤️ for the Vega Family
