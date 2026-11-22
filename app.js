// 1. Tab Switching Function
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Reusable Toast Notification Function
let toastTimeoutId = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeoutId !== null) {
        clearTimeout(toastTimeoutId);
    }

    // Hide the toast after 3 seconds
    toastTimeoutId = setTimeout(() => {
        toast.classList.remove('show');
        toastTimeoutId = null;
    }, 3000);
}

// 3. Ticket Pricing Map
const TICKET_PRICES = {
    general: 1200,
    premium: 2500,
    vip: 5000
};

// 4. Live Booking Summary Update Function
function updateBookingSummary(notify = true) {
    // Select form controls using DOM selectors
    const matchSelect = document.getElementById('match');
    const categorySelect = document.getElementById('category');
    const ticketsInput = document.querySelector('#tickets');

    // Select summary display elements
    const summaryMatch = document.getElementById('summaryMatch');
    const summaryCategory = document.getElementById('summaryCategory');
    const summaryTickets = document.getElementById('summaryTickets');
    const summaryTotal = document.getElementById('summaryTotal');

    if (!matchSelect || !categorySelect || !ticketsInput) return;

    // Read selected match text
    const selectedMatchText = matchSelect.value
        ? matchSelect.options[matchSelect.selectedIndex].text
        : 'Not selected';

    // Read selected stand category
    const categoryValue = categorySelect.value;
    const categoryLabel = categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);

    // Read ticket quantity (default to 1 if empty/invalid)
    let quantity = parseInt(ticketsInput.value, 10);
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    } else if (quantity > 10) {
        quantity = 10;
    }

    // Calculate total price
    const unitPrice = TICKET_PRICES[categoryValue] || 1200;
    const totalAmount = unitPrice * quantity;

    // Update the Booking Summary Card DOM
    if (summaryMatch) summaryMatch.textContent = selectedMatchText;
    if (summaryCategory) summaryCategory.textContent = categoryLabel;
    if (summaryTickets) summaryTickets.textContent = quantity;
    if (summaryTotal) summaryTotal.textContent = totalAmount.toLocaleString('en-IN');

    // Confirm summary update via toast notification
    if (notify) {
        showToast(`Booking Summary updated! Total: ₹${totalAmount.toLocaleString('en-IN')}`);
    }
}

// 5. Smooth Scroll to Booking Form + Pre-select Match + Update Summary
function bookMatch(matchValue, matchName) {
    showTab('book');

    const matchDropdown = document.getElementById('match');
    if (matchValue && matchDropdown) {
        matchDropdown.value = matchValue;
        // Update summary immediately without double-toasting
        updateBookingSummary(false);
    }

    const bookingSection = document.getElementById('book');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (matchName) {
        showToast(`Selected ${matchName}. Summary updated below!`);
    } else {
        showToast('Select your match, stand, and tickets below!');
    }
}

window.showTab = showTab;
window.bookMatch = bookMatch;

// 6. Initialize Event Listeners on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const matchSelect = document.getElementById('match');
    const categorySelect = document.getElementById('category');
    const ticketsInput = document.querySelector('#tickets');
    const bookingForm = document.querySelector('#bookingForm');

    // Attach 'change' event listeners to form controls
    if (matchSelect) {
        matchSelect.addEventListener('change', () => updateBookingSummary(true));
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', () => updateBookingSummary(true));
    }
    if (ticketsInput) {
        ticketsInput.addEventListener('change', () => updateBookingSummary(true));
        ticketsInput.addEventListener('input', () => {
            if (ticketsInput.value !== '') {
                updateBookingSummary(true);
            }
        });
    }

    // Initialize summary values on load without triggering a toast
    updateBookingSummary(false);

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showToast('Booking Confirmed! Check "My Bookings" for details.');
            bookingForm.reset();
            updateBookingSummary(false);
        });
    }
});