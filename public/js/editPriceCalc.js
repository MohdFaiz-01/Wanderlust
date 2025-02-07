// Calculating price for selected dates (for bookings)
const listingPrice = booking.listing.price; // per night price

const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const totalPriceEl = document.getElementById('totalPrice');
const dateErrorEl = document.getElementById('dateError');



function updateTotalPrice() {
    const checkInValue = checkInInput.value;
    const checkOutValue = checkOutInput.value;
    console.log("checkInVlaue = ", checkInValue);
    console.log("checkOutVlaue = ", checkOutValue);
        
    if (checkInValue && checkOutValue) {
        const checkInDate = new Date(checkInValue);  //converting yyyy-mm-dd to date formmat
        const checkOutDate = new Date(checkOutValue);
            
        // Condition: dates should not be the same and check-out must be after check-in(.getTime converts date to milliSeconds)
        if (checkInDate.getTime() === checkOutDate.getTime() || checkInDate > checkOutDate) {
            totalPriceEl.textContent = 0;
            dateErrorEl.textContent = "Check-in date must be before check-out date and cannot be the same.";
        } else {
            dateErrorEl.textContent = "";
            const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
            // Calculate the number of nights (assuming each night is 24 hours)
            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            totalPriceEl.textContent = listingPrice * diffDays;
        }
    }
}

checkInInput.addEventListener('change', updateTotalPrice);
checkOutInput.addEventListener('change', updateTotalPrice);