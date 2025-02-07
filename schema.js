//For Schema validation using tool joi(which will validate each schema field)
const Joi = require('joi');

//Listing Validation (Server Side)
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        category: Joi.string().valid("room", "iconic city", "mountain", "castle", "pool villa", "camp", "farm", "arctic","dome","boat").allow("", null).required(),
    }).required(),
});


//Review Validation (Server Side)
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});


//Booking Validation (Server Side)
module.exports.bookingSchema = Joi.object({
    booking: Joi.object({
      checkIn: Joi.date().required(),
      checkOut: Joi.date()
        .greater(Joi.ref('checkIn'))
        .required()  // checkOut date > checkIn date
    }).required()
});