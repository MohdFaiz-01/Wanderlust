const mongoose = require("mongoose");
const Review = require("./review.js");
<<<<<<< HEAD
const Booking = require("./booking.js");
=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
        // type: String,
        // default: "https://plus.unsplash.com/premium_photo-1680497811614-4f93025d7e57?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D",  //when image property is skipped when creating listing
        // set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1680497811614-4f93025d7e57?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D" : v,  //when user sends empty in form set link else v(user-url)
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
<<<<<<< HEAD
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
    geometry: {
        type: {
            type: String,   // Don't do `{ location: { type: String } }`
            enum: ['Point'],  // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
<<<<<<< HEAD
    category: {
        type: String,
        enum: ["room", "iconic city", "mountain", "castle", "pool villa", "camp", "farm", "arctic", "dome", "boat"],
    },
=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
});

//to delete all listing reviews if listing is deleted(using mongoose-middleware[post])
//When delete btn is clicked del req(/listing/:id) route is executed (findByIdAndDelete -> findOneAndDelete -> Post middleware)
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
<<<<<<< HEAD
        await Booking.deleteMany({_id: {$in: listing.bookings}});
=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;