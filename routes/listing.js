const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing, validateBooking} = require("../middleware.js");

const listingController = require("../controllers/listings.js");  // all routes callbacks(MVC)
const bookingController = require("../controllers/bookings.js");
=======
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");  // all routes callbacks(MVC)
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750

const multer = require("multer");   // to parse files from create listing form
const {storage} = require("../cloudConfig.js");  // making connection & storage in cloudinary
const upload = multer({storage});  // multer uploads files in cloudinary storage

// // We can use router.route for diff requests but on same path(to make more compact form) but i'm not doing this for now
// router.route("/")
//     .get(wrapAsync(listingController.index))
//     .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

<<<<<<< HEAD
// Search Listing Route
router.post("/search", wrapAsync(listingController.searchListing));

=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750

module.exports = router;