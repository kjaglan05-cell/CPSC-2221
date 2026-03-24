const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// This holds the currently viewed month
let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 1. Get first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    // 2. Adjust firstDayIndex for Mon-Sun grid
    // .getDay() is Sun=0, Mon=1... we want Mon=0, Sun=6
    let firstDayIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6; // Handle Sunday

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    // 3. Previous month's trailing days (Inactive)
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex; i > 0; i--) {
        datesHTML += `<div class="date inactive">${prevLastDay - i + 1}</div>`;
    }

    // 4. Current month's days
    for (let i = 1; i <= totalDays; i++) {
        const dateObj = new Date(currentYear, currentMonth, i);
        // Check if this is "Today"
        const isToday = dateObj.toDateString() === new Date().toDateString() ? 'active' : '';
        
        datesHTML += `<div class="date ${isToday}" onclick="selectDate(${i})">${i}</div>`;
    }

    // 5. Next month's leading days (Inactive)
    const lastDayIndex = lastDayOfMonth.getDay() - 1;
    let nextDays = 6 - lastDayIndex;
    if (lastDayIndex === -1) nextDays = 0; // Already at end of row if Sunday

    for (let i = 1; i <= nextDays; i++) {
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
};

// --- INTERACTION LOGIC ---

window.selectDate = (day) => {
    // Visual feedback: highlight selected date
    document.querySelectorAll('.date').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    // Show the time selector
    const timeSelector = document.getElementById('time-selector');
    const label = document.getElementById('selected-date-label');
    
    timeSelector.style.display = 'block';
    label.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${day}, ${currentDate.getFullYear()}`;
};

window.toggleTimeMenu = () => {
    const menu = document.getElementById('action-menu');
    menu.classList.toggle('hidden');
};

// --- EVENT LISTENERS ---

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Initialize
updateCalendar();