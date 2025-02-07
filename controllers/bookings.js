const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");


// Display bookings for the logged-in user
module.exports.getBookings = async (req, res) => {
    try {
      // Find all bookings for the current user and populate the associated listing data
      const allBookings = await Booking.find({ user: req.user._id }).populate("listing");
      
      res.render("bookings/index.ejs", { allBookings });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to load bookings. Please try again.");
      res.redirect("/listings");
    }
};



// Create Booking Route
module.exports.bookListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }
    
        const { checkIn, checkOut } = req.body.booking;
        // console.log(req.body.booking);

        // convert date from string to again date obj
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
    
        // Check for overlapping bookings
        // The new booking overlaps if its check-in is before an existing booking's check-out and its check-out is after an existing booking's check-in.
        const overlappingBookings = await Booking.find({
            listing: listing._id,
            $or: [
            {
                checkIn: { $lt: checkOutDate },
                checkOut: { $gt: checkInDate }
            }
            ]
        });
  
        if (overlappingBookings.length > 0) {
            req.flash("error", "These dates are already booked.");
            return res.redirect(`/listings/${id}`);
        }
    
        // Calculate the number of nights and the total price
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalPrice = listing.price * nights;

        // Create and save the new booking
        const booking = new Booking({
            listing: listing._id,
            user: req.user._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            totalBookingPrice: totalPrice,
        });


        listing.bookings.push(booking);
        await booking.save();
        await listing.save();

        req.flash("success", "Booking confirmed!");
        res.redirect(`/listings/${id}/bookings`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/listings");
    }
}


// Edit Booking Route
module.exports.renderEditBookingForm = async (req, res) => {
    let { id, bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("listing");
    if(!booking) {
        req.flash("error", "Booking you requested does not exist!");
        res.redirect(`/listings/${id}`);
    }

    res.render("bookings/edit.ejs", {booking});
}


// Update Booking Route
module.exports.updateBooking = async (req, res) => {
    let { id, bookingId } = req.params;
    
    const listing = await Listing.findById(id);
    const booking = await Booking.findById(bookingId);
    
    if(!booking) {
        req.flash("error", "Booking you requested does not exist!");
        res.redirect(`/listings/${id}`);
    }

    const { checkIn, checkOut } = req.body.booking;

    // convert date from string to again date obj
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Check for overlapping bookings
    // The new booking overlaps if its check-in is before an existing booking's check-out and its check-out is after an existing booking's check-in.
    const overlappingBookings = await Booking.find({
        listing: listing._id,
        $or: [
            {
                checkIn: { $lt: checkOutDate },
                checkOut: { $gt: checkInDate }
            }
        ]
    });
  
    if (overlappingBookings.length > 0) {
        req.flash("error", "These dates are already booked.");
        return res.redirect(`/listings/${id}/bookings/${bookingId}/edit`);
    }
    
    // Calculate the number of nights and the total price
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = listing.price * nights;

    
    let updatedBooking = await Booking.findByIdAndUpdate(bookingId, { checkIn, checkOut}, {new: true});
    updatedBooking.totalBookingPrice = totalPrice;

    await updatedBooking.save();

    req.flash("success", "Booking Updated!");
    res.redirect(`/listings/${id}/bookings`);
}


// Delete Booking Route
module.exports.deleteBooking = async (req, res) => {
    let {id, bookingId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {bookings: bookingId}});  //pull operator deletes from existing arr whose value is matched 
    await Booking.findByIdAndDelete(bookingId);
    
    req.flash("success", "Booking Deleted!");
    res.redirect(`/listings/${id}/bookings`);
}