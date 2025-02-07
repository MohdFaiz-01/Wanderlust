const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const filterController = require("../controllers/filters.js");

// Room Listing Filter
router.get("/rooms", wrapAsync(filterController.roomFilter));

// Iconic-Cities Listing Filter
router.get("/iconic-cities", wrapAsync(filterController.iconicCityFilter));

// Mountain Listing Filter
router.get("/mountains", wrapAsync(filterController.mountainFilter));

// Castle Listing Filter
router.get("/castles", wrapAsync(filterController.castleFilter));

// Pool-Villas Listing Filter
router.get("/pool-villas", wrapAsync(filterController.poolVillaFilter));

// Campings Listing Filter
router.get("/campings", wrapAsync(filterController.campingFilter));

// Farms Listing Filter
router.get("/farms", wrapAsync(filterController.farmFilter));

// Arctic Listing Filter
router.get("/arctics", wrapAsync(filterController.arcticFilter));

// Domes Listing Filter
router.get("/domes", wrapAsync(filterController.domeFilter));

// Boats Listing Filter
router.get("/boats", wrapAsync(filterController.boatFilter));

module.exports = router;