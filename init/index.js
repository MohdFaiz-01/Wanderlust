const mongoose = require ("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '678d5466b24af6990578e58a'}));  //adding owner id(same) to all listings, so deconstruct and map returns a new arr and store it in same arr.
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();