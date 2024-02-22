document.addEventListener('DOMContentLoaded', function () {
    // Get all seat elements
    const seatElements = document.querySelectorAll('.btn.bg-slate-200');

    // Initialize selected seat count and total amount
    let selectedSeats = 0;
    let totalAmount = 0;
    let discountPercent = 0;

    // Get coupon code input element
    const couponInput = document.getElementById('cuponInputArea');

    // Reset coupon code input value
    couponInput.value = '';

    // Add click event listener to each seat
    seatElements.forEach(seat => {
        seat.addEventListener('click', () => {
            // Check if the seat is already selected or not
            if (!seat.classList.contains('bg-green-400') && selectedSeats < 4) {
                // Task 1: Change seat color
                seat.classList.add('bg-green-400');

                // Task 2: Reduce the total number of seats left
                const seatsLeftElement = document.getElementById('seatLeft');
                seatsLeftElement.textContent = parseInt(seatsLeftElement.textContent) - 1;

                // Task 3: Increase the number of selected seats
                selectedSeats++;
                const selectedSeatsCountElement = document.getElementById('selectedSeatsCount');
                selectedSeatsCountElement.textContent = selectedSeats;

                // Task 4: Append seat info to seatInfoContainer
                const seatInfoContainer = document.getElementById('seatInfoContainer');
                const seatName = seat.textContent.trim();
                const seatInfo = document.createElement('p');
                seatInfo.textContent = `${seatName} Economy 550`;
                seatInfoContainer.appendChild(seatInfo);

                // Task 5: Calculate total amount
                totalAmount += 550; // Assuming each seat costs 550
                const totalAmountElement = document.getElementById('totalAmount');
                totalAmountElement.textContent = totalAmount;

                // Task 6: Apply discount if any
                applyDiscount(totalAmount);
            }
        });
    });

    // Apply discount function
    function applyDiscount(amount) {
        const grandAmountElement = document.getElementById('GrandAmount');
        const errorMessageElement = document.getElementById('errorMessage');
        const couponSection = document.getElementById('CuponSection');

        // Reset error message
        errorMessageElement.textContent = '';

        // Calculate discount based on the coupon code
        const couponCode = couponInput.value.trim();
        switch (couponCode) {
            case 'NEW15':
                discountPercent = 15;
                break;
            case 'Couple 20':
                discountPercent = 20;
                break;
            default:
                return; // Exit function early if the coupon code is invalid
        }

        // Calculate discount amount
        const discountAmount = (amount * discountPercent) / 100;

        // Calculate grand total after discount
        const grandTotal = amount - discountAmount;

        // Update grand total element with text
        grandAmountElement.textContent = `Grand Total (After Discount): ${grandTotal}`;

        couponSection.style.display = 'none';
    }

    // Add click event listener to coupon button
    const couponBtn = document.getElementById('cuponBtn');
    couponBtn.addEventListener('click', () => {
        applyDiscount(totalAmount);
    });
});
