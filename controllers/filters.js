const Listing = require("../models/listing");

// Room Listing Filter
module.exports.roomFilter = async (req, res) => {
    let allListings = await Listing.find({category: "room"});
    res.render("listings/index.ejs", {allListings});
};


// Iconic-Cities Listing Filter
module.exports.iconicCityFilter = async (req, res) => {
    let allListings = await Listing.find({category: "iconic city"});
    res.render("listings/index.ejs", {allListings});
};


// Mountain Listing Filter
module.exports.mountainFilter = async (req, res) => {
    let allListings = await Listing.find({category: "mountain"});
    res.render("listings/index.ejs", {allListings});
};


// Catles Listing Filter
module.exports.castleFilter = async (req, res) => {
    let allListings = await Listing.find({category: "castle"});
    res.render("listings/index.ejs", {allListings});
};


// Pool-Villas Listing Filter
module.exports.poolVillaFilter = async (req, res) => {
    let allListings = await Listing.find({category: "pool villa"});
    res.render("listings/index.ejs", {allListings});
};


// Campings Listing Filter
module.exports.campingFilter = async (req, res) => {
    let allListings = await Listing.find({category: "camp"});
    res.render("listings/index.ejs", {allListings});
};


// Farms Listing Filter
module.exports.farmFilter = async (req, res) => {
    let allListings = await Listing.find({category: "farm"});
    res.render("listings/index.ejs", {allListings});
};


// Arctics Listing Filter
module.exports.arcticFilter = async (req, res) => {
    let allListings = await Listing.find({category: "arctic"});
    res.render("listings/index.ejs", {allListings});
};


// Domes Listing Filter
module.exports.domeFilter = async (req, res) => {
    let allListings = await Listing.find({category: "dome"});
    res.render("listings/index.ejs", {allListings});
};


// Boats Listing Filter
module.exports.boatFilter = async (req, res) => {
    let allListings = await Listing.find({category: "boat"});
    res.render("listings/index.ejs", {allListings});
};