function showTab(tabId, shouldScrollTop = true) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    if (shouldScrollTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function handleTabClick(event, tabId) {
    if (event) {
        event.preventDefault();
    }
    showTab(tabId, true);
}

function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast-notification');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function handleBookClick(event, matchValue = '', matchLabel = '') {
    if (event) {
        event.preventDefault();
    }

    showTab('book', false);

    const matchSelect = document.getElementById('match');
    if (matchSelect && matchValue) {
        matchSelect.value = matchValue;
    }

    const bookingForm = document.getElementById('booking-form') || document.getElementById('book');
    if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const message = matchLabel
        ? `Scrolling to booking form for ${matchLabel}...`
        : 'Scrolling to booking form...';
    showToast(message);
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            showToast('Booking confirmed! Check My Bookings for details.');
            bookingForm.reset();
        });
    }
});