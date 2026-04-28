let tasks = [],
  editingId = null,
  deletingId = null;

// ── LOAD ──────────────────────────────────────────────────────────────────
function loadData() {
  const saved = localStorage.getItem("flowTasks");
  if (saved) tasks = JSON.parse(saved);
  else
    tasks = [
      { id: 1, title: "Evaluate the addition and deletion of user IDs", status: "pending",  priority: "minor",    completed: false, dueDate: "2026-04-30" },
      { id: 2, title: "Identify the implementation team",               status: "progress", priority: "normal",   completed: false, dueDate: "2026-05-02" },
      { id: 3, title: "Batch schedule download/process",                status: "pending",  priority: "critical", completed: false, dueDate: "2026-05-01" },
      { id: 4, title: "Monitor system performance and adjust hardware", status: "pending",  priority: "minor",    completed: false, dueDate: "2026-05-03" },
    ];
  
  // Load timer state
  const timerState = localStorage.getItem("timerState");
  if (timerState) {
    const state = JSON.parse(timerState);
    timerTotal = state.timerTotal;
    timerLeft = state.timerLeft;
    timerRunning = false;
  }
  
  updateGreeting();
  renderTasks();
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greet = "Good Morning";
  if (hour >= 12 && hour < 18) greet = "Good Afternoon";
  else if (hour >= 18) greet = "Good Evening";
  document.getElementById("greeting").textContent = `${greet}, User`;
}

function saveData() {
  localStorage.setItem("flowTasks", JSON.stringify(tasks));
  localStorage.setItem("timerState", JSON.stringify({
    timerTotal,
    timerLeft,
    timerRunning: false // Always save as paused
  }));
}

// ── RENDER ────────────────────────────────────────────────────────────────
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function isMissed(task) {
  if (task.completed || !task.dueDate) return false;
  return task.dueDate < getTodayDate();
}

function renderTasks() {
  const today = getTodayDate();
  const onHold    = tasks.filter((t) => !t.completed && !isMissed(t));
  const missed    = tasks.filter((t) => !t.completed && isMissed(t));
  const completed = tasks.filter((t) =>  t.completed);

  const taskRow = (t) => `
    <div class="task-item ${isMissed(t) ? "missed" : ""}">
      <div class="task-checkbox ${t.completed ? "completed" : ""}" onclick="toggleTask(${t.id})"></div>
      <div class="task-content">
        <div class="task-title ${t.completed ? "completed" : ""}">${t.title}</div>
        ${t.dueDate ? `<div class="task-due-date"><i class="fas fa-calendar"></i> ${new Date(t.dueDate).toLocaleDateString()}</div>` : ""}
      </div>
      <span class="status-badge status-${t.completed ? "completed" : t.status}">
        ${t.completed ? "Completed" : t.status === "progress" ? "In Progress" : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
      </span>
      <div class="priority-badge priority-${t.priority}">
        <i class="fas fa-circle"></i> ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
      </div>
      <div class="avatar">CF</div>
      <button class="icon-btn" style="width:30px;height:30px;" onclick="editTask(${t.id})">
        <i class="fas fa-pen" style="font-size:12px;"></i>
      </button>
      <button class="icon-btn" style="width:30px;height:30px;" onclick="openDeleteModal(${t.id})">
        <i class="fas fa-trash" style="font-size:12px;"></i>
      </button>
    </div>`;

  document.getElementById("onHoldTasks").innerHTML = onHold.length
    ? onHold.map(taskRow).join("")
    : '<p style="color:#9ca3af;padding:20px;">No tasks on hold</p>';

  document.getElementById("missedTasks").innerHTML = missed.length
    ? missed.map(taskRow).join("")
    : '<p style="color:#9ca3af;padding:20px;">No missed tasks</p>';

  document.getElementById("completedTasks").innerHTML = completed.length
    ? completed.map(taskRow).join("")
    : '<p style="color:#9ca3af;padding:20px;">No completed tasks</p>';

  // Stats
  const total          = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pending        = total - completedCount;
  const rate           = total ? Math.round((completedCount / total) * 100) : 0;

  document.getElementById("taskCount").textContent            = pending;
  document.getElementById("totalTasks").textContent           = total;
  document.getElementById("completedCount").textContent       = completedCount;
  document.getElementById("pendingCount").textContent         = pending;
  document.getElementById("completionRateValue").textContent  = rate + "%";
  document.getElementById("totalProgress").style.width        = rate + "%";
  document.getElementById("completionProgress").style.width   = rate + "%";

  renderDonut();
  renderWeek();
  saveData();
}

// ── TOGGLE ────────────────────────────────────────────────────────────────
function toggleTask(id) {
  const t = tasks.find((t) => t.id === id);
  if (t) {
    t.completed = !t.completed;
    t.status = t.completed ? "completed" : "pending";
    renderTasks();
  }
}

// ── DELETE MODAL ──────────────────────────────────────────────────────────
function openDeleteModal(id) {
  deletingId = id;
  const t = tasks.find((t) => t.id === id);
  document.getElementById("deleteSubtitle").textContent =
    t ? `"${t.title}" will be permanently removed.` : "This task will be permanently removed.";
  document.getElementById("deleteModal").classList.add("active");
}

function closeDeleteModal() {
  deletingId = null;
  document.getElementById("deleteModal").classList.remove("active");
}

function confirmDelete() {
  if (deletingId !== null) {
    tasks = tasks.filter((t) => t.id !== deletingId);
    renderTasks();
  }
  closeDeleteModal();
}

// ── ADD / EDIT MODAL ──────────────────────────────────────────────────────
function openModal() {
  const minDate = getTodayDate();
  document.getElementById("taskDueDate").setAttribute("min", minDate);
  document.getElementById("taskModal").classList.add("active");
}

function closeModal() {
  document.getElementById("taskModal").classList.remove("active");
  document.getElementById("taskForm").reset();
  editingId = null;
}

document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title    = document.getElementById("taskTitle").value;
  const status   = document.getElementById("taskStatus").value;
  const priority = document.getElementById("taskPriority").value;
  const dueDate  = document.getElementById("taskDueDate").value;

  if (editingId) {
    const t = tasks.find((t) => t.id === editingId);
    t.title     = title;
    t.status    = status;
    t.priority  = priority;
    t.dueDate   = dueDate;
    t.completed = status === "completed";
  } else {
    tasks.push({ id: Date.now(), title, status, priority, dueDate, completed: status === "completed" });
  }

  renderTasks();
  closeModal();
});

function editTask(id) {
  editingId = id;
  const t = tasks.find((t) => t.id === id);
  if (t) {
    document.getElementById("taskTitle").value    = t.title;
    document.getElementById("taskStatus").value   = t.status;
    document.getElementById("taskPriority").value = t.priority;
    document.getElementById("taskDueDate").value  = t.dueDate || "";
    openModal();
  }
}

// close modals on backdrop click
document.getElementById("taskModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("taskModal")) closeModal();
});
document.getElementById("deleteModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("deleteModal")) closeDeleteModal();
});

// ── DONUT ─────────────────────────────────────────────────────────────────
function renderDonut() {
  const circ  = 2 * Math.PI * 34; // ~213.6
  const total = tasks.length || 1;
  const crit  = tasks.filter((t) => t.priority === "critical").length;
  const norm  = tasks.filter((t) => t.priority === "normal").length;
  const minor = tasks.filter((t) => t.priority === "minor").length;

  function setArc(id, len, offset) {
    const el = document.getElementById(id);
    el.setAttribute("stroke-dasharray", `${len.toFixed(2)} ${circ.toFixed(2)}`);
    el.setAttribute("stroke-dashoffset", (circ / 4 - offset).toFixed(2));
  }

  const pC = (crit  / total) * circ;
  const pN = (norm  / total) * circ;
  const pM = (minor / total) * circ;

  setArc("dCrit",  pC, 0);
  setArc("dNorm",  pN, pC);
  setArc("dMinor", pM, pC + pN);

  document.getElementById("legCrit").textContent = `Critical — ${crit}`;
  document.getElementById("legNorm").textContent = `Normal — ${norm}`;
  document.getElementById("legMin").textContent  = `Minor — ${minor}`;
}

// ── WEEK GRID ─────────────────────────────────────────────────────────────
function renderWeek() {
  const done      = tasks.filter((t) => t.completed).length;
  const today     = new Date().getDay(); // 0 = Sun
  const order     = [1, 2, 3, 4, 5, 6, 0]; // Mon–Sun
  const todayIdx  = order.indexOf(today);

  document.getElementById("weekNum").textContent = done;
  document.getElementById("weekGrid").innerHTML  = order
    .map((d, i) => {
      let cls = "";
      if      (i < todayIdx)   cls = Math.random() > 0.35 ? "full" : "partial";
      else if (i === todayIdx) cls = done > 0 ? "full" : "partial";
      return `<div class="week-cell ${cls}"></div>`;
    })
    .join("");
}

// ── TIMER ─────────────────────────────────────────────────────────────────
let timerTotal    = 25 * 60;
let timerLeft     = 25 * 60;
let timerInterval = null;
let timerRunning  = false;
let timerEditing  = false;

function fmtTime(s) {
  return (
    String(Math.floor(s / 60)).padStart(2, "0") +
    ":" +
    String(s % 60).padStart(2, "0")
  );
}

function updateTimerDisplay() {
  document.getElementById("timerDisplay").textContent = fmtTime(timerLeft);
  const pct = timerTotal > 0 ? (timerLeft / timerTotal) * 100 : 100;
  document.getElementById("timerBar").style.width = pct + "%";
}

function toggleTimerEdit() {
  if (timerRunning) return;
  timerEditing = !timerEditing;
  const box  = document.getElementById("timerEdit");
  const disp = document.getElementById("timerDisplay");
  if (timerEditing) {
    box.classList.add("visible");
    disp.style.display = "none";
    document.getElementById("editMin").value = Math.floor(timerLeft / 60);
    document.getElementById("editSec").value = String(timerLeft % 60).padStart(2, "0");
    document.getElementById("editMin").focus();
  } else {
    closeTimerEdit();
  }
}

function applyTimerEdit() {
  let m = parseInt(document.getElementById("editMin").value) || 0;
  let s = parseInt(document.getElementById("editSec").value) || 0;
  m = Math.max(0, Math.min(99, m));
  s = Math.max(0, Math.min(59, s));
  timerTotal = timerLeft = m * 60 + s;
  document.querySelectorAll(".preset-pill").forEach((p) => p.classList.remove("active"));
  updateTimerDisplay();
}

function closeTimerEdit() {
  timerEditing = false;
  document.getElementById("timerEdit").classList.remove("visible");
  document.getElementById("timerDisplay").style.display = "inline-block";
}

document.addEventListener("keydown", (e) => {
  if (timerEditing && (e.key === "Enter" || e.key === "Escape")) {
    applyTimerEdit();
    closeTimerEdit();
  }
});

function setPreset(min, sec, el) {
  if (timerRunning) return;
  if (timerEditing) closeTimerEdit();
  timerTotal = timerLeft = min * 60 + sec;
  document.querySelectorAll(".preset-pill").forEach((p) => p.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("timerStartBtn").textContent = "Start";
  updateTimerDisplay();
}

function toggleTimer() {
  if (timerEditing) closeTimerEdit();
  const btn = document.getElementById("timerStartBtn");
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    btn.textContent = "Resume";
  } else {
    if (timerLeft <= 0) resetTimer();
    timerRunning = true;
    btn.textContent = "Pause";
    timerInterval = setInterval(() => {
      timerLeft--;
      updateTimerDisplay();
      if (timerLeft <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        btn.textContent = "Start";
        // flash pink on done
        const d = document.getElementById("timerDisplay");
        d.style.color = "#ec4899";
        setTimeout(() => (d.style.color = "#1f2937"), 1400);
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerLeft = timerTotal;
  document.getElementById("timerStartBtn").textContent = "Start";
  updateTimerDisplay();
}

// ── BOOT ──────────────────────────────────────────────────────────────────
loadData();
document.getElementById("taskDueDate").setAttribute("min", getTodayDate());
updateTimerDisplay();