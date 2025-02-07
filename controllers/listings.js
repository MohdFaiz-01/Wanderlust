const Listing = require("../models/listing.js");
// For Geocoding( location->geographical coordinates [see docs for below code])
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

<<<<<<< HEAD

=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
// Index Route
module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings});
};


// New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


// Show Route
module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner"); //nesting populate [listing -> reviews -> author]
    if(!listing) {
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};


// Create Route
module.exports.createListing = async (req, res, next) => {
    //if someone tries to send post req through hopscotch but with no listing body(or use wrapAsync)
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }

    // This will do foward geocoding & return an obj
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
    .send();

    // when img uploaded on cloudinary, multer processes and brings file data in req.file will have all info related to that file(file_path, original file_name, size)
    let url = req.file.path;
    let filename = req.file.filename;

    // let newListing = req.body.listing; //since we made name attr keys of listing obj
    const newListing = new Listing(req.body.listing);
<<<<<<< HEAD
    newListing.category = req.body.listing.category || null;   //if user not selected any option then store null
=======
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
    newListing.owner = req.user._id;  // to save id of curr user (passport saves user info in req.user if he is logged-in)
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;  // storing mapbox retured geometry

    let savedListing = await newListing.save();
    // console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


// Update Route
module.exports.updateListing = async (req, res) => {
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }

    let {id} = req.params;
<<<<<<< HEAD
    let listing = await Listing.findById(id);
    let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, {new: true});
    updatedListing.category = req.body.listing.category || listing.category; // Retain original category if not updated
=======
    let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, {new: true});
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
    
    let response = await geocodingClient
    .forwardGeocode({
        query: updatedListing.location,
        limit: 1
      })
    .send();

    updatedListing.geometry = response.body.features[0].geometry;  // storing mapbox retured geometry
    await updatedListing.save();

    // checking if user edited image or not. if edited multer will have file info in req.file else if not edited don't do below process
    if(typeof req.file !== "undefined") {
        // when img edited, multer processes and brings file data in req.file will have all info related to that file(file_path, original file_name, size)
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url, filename};
        await updatedListing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


// Delete Route
module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
<<<<<<< HEAD
};



// Search Listing Route
module.exports.searchListing = async (req, res, next) => {
    try {
        let { search } = req.body;
        if (!search || search.trim() === "") {
            req.flash("error", "Search by country name");
            return res.redirect("/listings");
        }

        if(search) {
            const allListings = await Listing.find({ country: { $regex: search, $options: 'i' } });
            if(allListings.length === 0) {
                req.flash("error", "No listings available for this country");
                res.redirect("/listings");
            } else {
                res.render("listings/index.ejs", {allListings});
            }
        }
    } catch(err) {
        next(err);
    }
};
=======
};
>>>>>>> 1630044c9a4d434bddc8b41f13c8c35597ca5750
