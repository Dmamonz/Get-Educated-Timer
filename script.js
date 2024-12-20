Dama Amisuda
// Pomodoro Timer
let timerInterval;
let studyTime = 25 * 60; // Default 25 minutes
let breakTime = 5 * 60;  // Default 5 minutes
let isStudySession = true;
let remainingTime; // Variable to hold the remaining time
let isPaused = false; // Variable to track if the timer is paused

function startPomodoro() {
    if (timerInterval) clearInterval(timerInterval);

    studyTime = parseInt(document.getElementById('study-time').value) * 60;
    breakTime = parseInt(document.getElementById('break-time').value) * 60;

    let time = isPaused ? remainingTime : (isStudySession ? studyTime : breakTime);
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (--time < 0) {
            clearInterval(timerInterval); // Stop the timer
            isStudySession = !isStudySession;
            alert(isStudySession ? 'Time to Study!' : 'Take a Break!');
            startPomodoro();
        }
        remainingTime = time;
    }, 1000);
}

function pausePomodoro() {
    if (timerInterval) {
        clearInterval(timerInterval);
        isPaused = true; // Set the paused state
    }
}

function resetPomodoro() {
    clearInterval(timerInterval);
    isStudySession = true;
    const defaultStudyTime = parseInt(document.getElementById('study-time').value);
    document.getElementById('timer').textContent = `${String(defaultStudyTime).padStart(2, '0')}:00`;
}

// To-Do List
const todoList = document.getElementById('todo-list');

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="text" value="${task}" readonly />
            <span>
                <button onclick="editTask(this)">🖋️</button>
                <button onclick="markComplete(this)">✔️</button>
                <button onclick="deleteTodo(this)">❌</button>
            </span>
        `;
        todoList.appendChild(li);
        saveTodos();
        todoInput.value = '';
    }
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const input = li.querySelector('input');
    if (input.readOnly) {
        input.readOnly = false;
        input.focus();
        button.textContent = '💾';
    } else {
        input.readOnly = true;
        button.textContent = '✏️';
        saveTodos();
    }
}

function markComplete(button) {
    const li = button.parentElement.parentElement;
    li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    saveTodos();
}

function deleteTodo(button) {
    button.parentElement.parentElement.remove();
    saveTodos();
}

function saveTodos() {
    const tasks = Array.from(todoList.children).map(li => {
        return {
            text: li.querySelector('input').value,
            completed: li.style.textDecoration === 'line-through'
        };
    });
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="text" value="${todo.text}" ${todo.completed ? 'style="text-decoration: line-through;"' : ''} readonly />
            <span>
                <button onclick="editTask(this)">🖋️</button>
                <button onclick="markComplete(this)">✔️</button>
                <button onclick="deleteTodo(this)">❌</button>
            </span>
        `;
        if (todo.completed) li.style.textDecoration = 'line-through';
        todoList.appendChild(li);
    });
}

// Load todos on page load
window.onload = loadTodos;
23106050096
