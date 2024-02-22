document.addEventListener('DOMContentLoaded', function () {

    const buyTicketsButton = document.getElementById('buyTicketsButton');
    buyTicketsButton.addEventListener('click', function () {
        // Get the Ticket Booking Section
        const ticketBookingSection = document.getElementById('buyTicketsSection');

        // Scroll to the Ticket Booking Section with an offset
        const offset = ticketBookingSection.offsetTop + 2000;

        window.scrollTo({ top: offset, behavior: 'smooth' });
    });

    const seatElements = document.querySelectorAll('.btn.bg-slate-200');

    let selectedSeats = 0;
    let totalAmount = 0;
    let discountPercent = 0;

    // Get coupon code 
    const couponInput = document.getElementById('cuponInputArea');
    couponInput.value = '';

    // Add click event listener to each seat
    for (const seat of seatElements) {
        seat.addEventListener('click', function () {
            if (!seat.classList.contains('bg-green-400') && selectedSeats < 4) {
                seat.classList.add('bg-green-400');

                // Reduce the total number of seats left
                const seatsLeftElement = document.getElementById('seatLeft');
                seatsLeftElement.textContent = parseInt(seatsLeftElement.textContent) - 1;

                // Increase the number of selected seats
                selectedSeats++;
                const selectedSeatsCountElement = document.getElementById('selectedSeatsCount');
                selectedSeatsCountElement.textContent = selectedSeats;

                // Append seat info
                const seatInfoContainer = document.getElementById('seatInfoContainer');
                const seatName = seat.textContent.trim();
                const seatInfo = document.createElement('p');
                seatInfo.textContent = `${seatName} Economy 550`;
                seatInfoContainer.appendChild(seatInfo);

                //total amount
                totalAmount += 550;
                const totalAmountElement = document.getElementById('totalAmount');
                totalAmountElement.textContent = totalAmount;

                // Apply discount
                applyDiscount(totalAmount);

                const grandAmountElement = document.getElementById('GrandAmount');
                grandAmountElement.textContent = totalAmount;
            }
        });
    }

    //discount function
    function applyDiscount(amount) {
        const grandAmountElement = document.getElementById('GrandAmount');
        const errorMessageElement = document.getElementById('errorMessage');
        const couponSection = document.getElementById('CuponSection');

        errorMessageElement.textContent = '';

        //discount
        const couponCode = couponInput.value.trim();
        switch (couponCode) {
            case 'NEW15':
                discountPercent = 15;
                break;
            case 'Couple 20':
                discountPercent = 20;
                break;
            default:
                return;
        }

        // Calculation
        const discountAmount = (amount * discountPercent) / 100;
        const grandTotal = amount - discountAmount;
        grandAmountElement.textContent = `(After Discount): ${grandTotal}`;
        couponSection.style.display = 'none';
    }

    // Add click event listener to coupon button
    const couponBtn = document.getElementById('cuponBtn');
    couponBtn.addEventListener('click', function () {
        applyDiscount(totalAmount);
    });
});

// Hide and show page
function hideUsingId(idHide) {
    const hideElement = document.getElementById(idHide);
    hideElement.classList.add('hidden');
}

function ShowUsingId(idShow) {
    const ShowElement = document.getElementById(idShow);
    ShowElement.classList.remove('hidden');
}

function hideBody() {
    hideUsingId('currentPage');
    ShowUsingId('successPage');
}

// Hide and show page Success page
function hide(idForHide) {
    const hideElements = document.getElementById(idForHide);
    hideElements.classList.add('hidden');
}

function Show(idForShow) {
    const ShowElements = document.getElementById(idForShow);
    ShowElements.classList.remove('hidden');
}

function hideB() {
    hide('successPage');
    Show('currentPage');
}
