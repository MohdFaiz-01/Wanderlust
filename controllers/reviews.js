const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//Create Review Route
module.exports.createReview = async (req, res) => {
    let {id} = req.params;  //getting this id from parent route ie app.js (write mergeParams: true to access params from parent route)
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);   //since we are passing name attr in review obj so we are directly using obj
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added!");
    res.redirect(`/listings/${id}`);
};


//Delete Review Route
module.exports.deleteReview = async (req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});  //pull operator deletes from existing arr whose value is matched 
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};