# Focus Arena 🍅

A modern, feature-rich task management and productivity application designed to help you stay focused and organized. Focus Arena combines task management with a built-in Pomodoro timer to boost your productivity.

## Features

### ✅ Task Management
- **Create, Edit & Delete Tasks** - Easily manage your tasks with an intuitive modal interface
- **Task Priorities** - Assign tasks as Critical, Normal, or Minor priority levels
- **Task Status Tracking** - Track tasks as Pending, In Progress, or Completed
- **Due Dates** - Set deadlines for all tasks to stay on track
- **Persistent Storage** - All tasks are automatically saved to browser localStorage, so your data persists even after refreshing the page

### 📅 Smart Date Handling
- **Future Dates Only** - Can only select today or future dates when creating/editing tasks (prevents setting past dates)
- **Missed Deadline Detection** - Tasks with due dates that have passed automatically move to the "Missed" section
- **Visual Indicators** - Missed tasks are highlighted with a red border and red text for easy visibility

### 🍅 Pomodoro Timer
- **Customizable Duration** - Set any time interval (default: 25 minutes)
- **Preset Options** - Quick shortcuts for 25, 10, 5, and 50 minute sessions
- **Play/Pause/Reset** - Full control over timer playback
- **Visual Progress Bar** - See your progress at a glance
- **Timer Persistence** - Timer state is saved for seamless continuation
- **Editable Time** - Click the timer display to edit minutes and seconds manually

### 📊 Real-Time Analytics Dashboard
- **Completion Rate** - Visual progress bar showing completion percentage
- **Total Tasks** - Track your total task count
- **Completed/Pending Breakdown** - See how many tasks are completed vs. pending
- **Priority Mix Donut Chart** - Visual representation of critical, normal, and minor tasks
- **Weekly Activity Grid** - See your completion patterns across the week (Monday-Sunday)

### 🎯 Task Organization
- **On Hold Section** - View all pending and in-progress tasks
- **Missed Section** - Automatically populated with overdue tasks
- **Completed Section** - Archive of all finished tasks
- **Task Details** - Each task displays title, status badge, priority level, and due date

### 🌍 User Experience
- **Time-Based Greetings** - Dynamic greeting based on time of day (Good Morning/Afternoon/Evening)
- **Live Task Counter** - Quick glance at how many tasks you need to complete today
- **Responsive Design** - Clean, modern UI with smooth animations and transitions
- **Dark/Light Optimized** - Beautiful design that works on any screen

## Technical Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox and CSS animations
- **Vanilla JavaScript** - No dependencies, lightweight and fast
- **LocalStorage API** - Client-side persistent data storage
- **Font Awesome Icons** - Beautiful icon library

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. You'll see 4 sample tasks to get started

### Adding a Task
1. Click the **"Add New"** button
2. Fill in the task title, select status and priority
3. **Choose a due date** (can only select today or future dates)
4. Click **"Save Task"**

### Editing a Task
1. Click the **pencil icon** on any task
2. Modify the details and save

### Marking Tasks Complete
1. Click the **checkbox** next to a task to toggle completion status

### Deleting a Task
1. Click the **trash icon** on any task
2. Confirm the deletion

### Using the Pomodoro Timer
1. Click on the timer display to edit the time, or use the preset buttons
2. Click **"Start"** to begin
3. Click **"Pause"** to pause, or **"Resume"** to continue
4. Click **"Reset"** to reset to the initial time

## Data Persistence

All your tasks and timer settings are automatically saved to your browser's localStorage. This means:
- ✅ Data persists across page refreshes
- ✅ Data persists across browser sessions (until cache is cleared)
- ✅ No account or login required
- ✅ All data stays on your device (no server sync)

## Key Characteristics

### Smart Deadline Management
- Tasks with past due dates automatically appear in the "Missed" section
- Missed tasks are visually distinguished with red styling
- Only future dates can be selected to prevent scheduling errors

### Task Statistics
- Real-time completion rate calculation
- Priority distribution visualization
- Weekly completion tracking to identify patterns

### Intuitive Interface
- Smooth modal dialogs for task creation and confirmation
- Clear visual hierarchy with badges and colors
- Icon-based quick actions for common operations

## Reference
- https://codynn.com/labs/create/todolist-0001
- I used this link to build the basic to do list as i'm still learning
- I also Added features from my own idea like the Missed feature, Timer, Priority Mix, and Week completion

## Browser Compatibility

- Modern browsers with ES6+ support
- LocalStorage support required
- Tested on Chrome, Firefox, Safari, and Edge

## File Structure

```
FocusArena/
├── index.html      # Main HTML structure
├── style.css       # All styling and responsive design
├── script.js       # Core functionality and logic
└── README.md       # This file
```

## Tips for Best Usage

💡 **Productivity Tips:**
- Use the Pomodoro timer for focused work sessions (25 min on, 5 min off)
- Set realistic due dates for your tasks
- Review your weekly completion grid to identify peak productivity times
- Prioritize critical tasks early in the day

## Future Enhancement Ideas

- Task categories/tags
- Recurring tasks
- Task notes and descriptions
- Multiple timer presets
- Export task data
- Dark theme toggle
- Cloud synchronization

---

**Focus Arena** - Built with ❤️ for productivity enthusiasts
