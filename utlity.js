document.addEventListener('DOMContentLoaded', function () {
    
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
           
            if (!seat.classList.contains('bg-green-400') && selectedSeats < 4) 
            
            {
                //  Change seat color
                seat.classList.add('bg-green-400');

                //Reduce the total number of seats left

                const seatsLeftElement = document.getElementById('seatLeft');
                seatsLeftElement.textContent = parseInt(seatsLeftElement.textContent) - 1;

                //Increase the number of selected seats

                selectedSeats++;
                const selectedSeatsCountElement = document.getElementById('selectedSeatsCount');
                selectedSeatsCountElement.textContent = selectedSeats;

                //Append seat info to seatInfoContainer

                const seatInfoContainer = document.getElementById('seatInfoContainer');
                const seatName = seat.textContent.trim();
                const seatInfo = document.createElement('p');
                seatInfo.textContent = `${seatName} Economy 550`;
                seatInfoContainer.appendChild(seatInfo);

                //Calculate total amount

                totalAmount += 550;
                const totalAmountElement = document.getElementById('totalAmount');
                totalAmountElement.textContent = totalAmount;

                //Apply discount if any
                applyDiscount(totalAmount);
            }
        });
    });

    // Apply discount function
    function applyDiscount(amount) 
    {
        const grandAmountElement = document.getElementById('GrandAmount');
        const errorMessageElement = document.getElementById('errorMessage');
        const couponSection = document.getElementById('CuponSection');

        // Reset error message
        errorMessageElement.textContent = '';

        // Calculate discount based on the coupon code using Switch Case
        const couponCode = couponInput.value.trim();
        switch (couponCode)
         {
            case 'NEW15':
                discountPercent = 15;
                break;
            case 'Couple 20':
                discountPercent = 20;
                break;
            default:
                return; 
        }

        // Calculate discount amount
        const discountAmount = (amount * discountPercent) / 100;

        
        const grandTotal = amount - discountAmount;

      
        grandAmountElement.textContent = `Grand Total (After Discount): ${grandTotal}`;

        couponSection.style.display = 'none';
    }

    // Add click event listener to coupon button
    
    const couponBtn = document.getElementById('cuponBtn');
    couponBtn.addEventListener('click', () => {
        applyDiscount(totalAmount);
    });
});

//hide and show page
function hideUsingId(idHide) {
    const hideElement = document.getElementById(idHide);
    hideElement.classList.add('hidden');
}
function ShowUsingId(idShow)
{
    const ShowElement  =document.getElementById(idShow);
    ShowElement.classList.remove('hidden');
}

function hideBody() {
    hideUsingId('currentPage');
    ShowUsingId('successPage');
}


