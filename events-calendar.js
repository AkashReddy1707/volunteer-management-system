// events-calendar.js
const events = [
    { date: '2025-11-28', title: 'Beach Cleanup', time: '9:00 AM', location: 'Sunset Beach' },
    { date: '2025-12-05', title: 'Food Drive', time: '10:00 AM', location: 'Community Center' },
    { date: '2025-12-12', title: 'Senior Care', time: '2:00 PM', location: 'Golden Years Home' },
    { date: '2025-12-19', title: 'Tree Planting', time: '8:00 AM', location: 'City Park' }
];

let currentDate = new Date();

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('currentMonth');
    
    // Set current month/year
    currentMonthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Clear calendar
    calendar.innerHTML = '';
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendar.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerHTML = `<strong>${day}</strong>`;
        
        // Check if there are events on this day
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === dateStr);
        
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.innerHTML = `${event.title}`;
            eventElement.title = `${event.time} - ${event.location}`;
            eventElement.onclick = () => showEventDetails(event);
            dayElement.appendChild(eventElement);
        });
        
        calendar.appendChild(dayElement);
    }
    
    updateUpcomingEvents();
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

function showEventDetails(event) {
    alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nClick Register to join this event!`);
}

function updateUpcomingEvents() {
    const upcomingList = document.getElementById('upcomingEvents');
    upcomingList.innerHTML = '';
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event';
        eventItem.style.margin = '0.5rem 0';
        eventItem.innerHTML = `<strong>${event.date}</strong>: ${event.title} (${event.time})`;
        eventItem.onclick = () => showEventDetails(event);
        upcomingList.appendChild(eventItem);
    });
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', generateCalendar);
