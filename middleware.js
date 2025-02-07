const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, bookingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const Booking = require("./models/booking.js");


// to check if user logged in to create,delete,update listing,etc...
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // storing url to use it to redirect directly where user wants to after login
        req.flash("error", "You must be logged-in!");
        return res.redirect("/login");
    }
    next();
};


// Middleware to store redirectUrl
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;   //storing in locals variable as passport will reset session after logging, so above stored redirectUrl will be deleted
    }
    next();
};


//func for validating Listing Schema (for Middleware)
module.exports.validateListing = (req, res, next) => {
    //Valiating each schema field using joi
    let {error} = listingSchema.validate(req.body);
    // console.log(error);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


//func for validating Review Schema (for Middleware)
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


//func for validating Booking Schema (for Middleware)
module.exports.validateBooking = (req, res, next) => {
    let {error} = bookingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


// to check if logged-in user == listing owner to edit,update,delete
module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


// to check if logged-in user == review owner to delete
module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


// to check if logged-in user == review owner to delete
module.exports.isBookingOwner = async(req, res, next) => {
    let { id, bookingId } = req.params;
    let booking = await Booking.findById(bookingId);
    if(!booking.user.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this booking!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}