let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const toggleThemeBtn = document.getElementById('toggleTheme');

// Add Task
addTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const date = document.getElementById('taskDate').value;
  const priority = document.getElementById('taskPriority').value;
  const category = document.getElementById('taskCategory').value.trim();

  if (!title) return alert('Task title is required');

  const task = {
    id: Date.now(),
    title,
    date,
    priority,
    category,
    completed: false
  };

  tasks.push(task);
  saveAndRender();
  clearInputs();
});

// Save to localStorage and Render
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

// Clear input fields
function clearInputs() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskCategory').value = '';
  document.getElementById('taskPriority').value = 'Medium';
}

// Render Tasks
function renderTasks(list) {
  taskList.innerHTML = '';
  list.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> [${task.priority}] - ${task.category} - ${task.date || ''}
      </div>
      <div class="task-buttons">
        <button onclick="toggleComplete(${task.id})">✅</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Toggle Complete
function toggleComplete(id) {
  tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
  saveAndRender();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

// Filter Tasks
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    if (filter === 'all') saveAndRender();
    else if (filter === 'completed') renderTasks(tasks.filter(t => t.completed));
    else if (filter === 'pending') renderTasks(tasks.filter(t => !t.completed));
    else renderTasks(tasks.filter(t => t.priority === filter));
  });
});

// Dark/Light Mode
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Initial render
renderTasks(tasks);
