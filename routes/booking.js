const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateBooking, isBookingOwner} = require("../middleware.js");

const bookingController = require("../controllers/bookings.js");


// Display bookings for the logged-in user
router.get("/", isLoggedIn, wrapAsync(bookingController.getBookings));


// Create Booking Route
router.post("/", isLoggedIn, validateBooking ,wrapAsync(bookingController.bookListing));


// Edit Booking Route
router.get("/:bookingId/edit", isLoggedIn, isBookingOwner, wrapAsync(bookingController.renderEditBookingForm));


// Update Booking Route
router.put("/:bookingId", isLoggedIn, isBookingOwner, validateBooking, wrapAsync(bookingController.updateBooking));

// Delete Booking Route
router.delete("/:bookingId", isLoggedIn, isBookingOwner, wrapAsync(bookingController.deleteBooking));


module.exports = router;