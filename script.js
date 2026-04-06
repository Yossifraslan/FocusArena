let tasks = [],
  editingId = null;

function loadData() {
  const saved = localStorage.getItem("flowtasks");
  if (saved) tasks = JSON.parse(saved);
  else
    tasks = [
      {
        id: 1,
        title: "Evaluate the addition and deletion of user IDs",
        status: "pending",
        priority: "minor",
        completed: false,
      },
      {
        id: 2,
        title: "Identify the implementation team",
        status: "progress",
        priority: "minor",
        completed: false,
      },
      {
        id: 3,
        title: "Monitor system performance and adjust hardware",
        status: "pending",
        priority: "minor",
        completed: false,
      },
      {
        id: 4,
        title: "Batch schedule download/process",
        status: "pending",
        priority: "critical",
        completed: false,
      },
    ];
  updateGreeting();
  renderTasks();
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greet = "Good Morning";
  if (hour >= 12 && hour < 18) greet = "Good Afternoon";
  else if (hour >= 18) greet = "Good Evening";
  document.getElementById("greeting").textContent = `${greet}, Codynn`;
}

function saveDate() {
  localStorage.setItem("codynnflowTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const onHold = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => !t.completed);
}

// Render On Hold Tasks
document.getElementById("onHoldTasks").innerHTML = onHold.length
  ? onHold
      .map(
        (t) => `
            <div class="task-item">
                <div class="task-checkbox ${t.completed ? "completed" : ""}" onclick="toggleTask(${t.id})"></div>
                <div class="task-content">
                    <div class="task-title ${t.completed ? "completed" : ""}">${t.title}</div>
                </div>
                <span class="status-badge status-${t.status}">
                    ${t.status === "progress" ? "In Progress" : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
                <div class="priority-badge priority-${t.priority}">
                    <i class="fas fa-circle"></i> ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                </div>
                <div class="avatar">CF</div>
                <button class="icon-btn" style="width:30px;height:30px;" onclick="editTask(${t.id})">
                    <i class="fas fa-pen" style="font-size:12px;"></i>
                </button>
                <button class="icon-btn" style="width:30px;height:30px;" onclick="deleteTask(${t.id})">
                    <i class="fas fa-trash" style="font-size:12px;"></i>
                </button>
            </div>
        `,
      )
      .join("")
  : '<p style="color:#9ca3af;padding:20px;">No tasks on hold</p>';
