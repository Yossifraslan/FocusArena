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
    document.getElementById(
        "greeting"
    ).textContent = `${greet}, Codynn`;
}

    function saveDate() {
        localStorage.setItem("codynnflowTasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        const onHold = tasks.filter((t) => !t.completed);
        const completed = tasks.filter((t) => !t.completed);
    }

    //