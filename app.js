if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");   //Routes related to listings
const reviewRouter = require("./routes/review.js");   //Routes related to reviews
const userRouter = require("./routes/user.js");    //Routes related to users
const filterRouter = require("./routes/filter.js");    //Routes related to filters
const bookingRouter = require("./routes/booking.js");


const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust_copy");
    await mongoose.connect(dbUrl);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);  //helps to create layouts & can embedd in ejs

// Storing session info in DB
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};


app.get("/", (req, res) => {
    res.redirect("/listings");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());   // to store all user info in session is called serialize
passport.deserializeUser(User.deserializeUser());   // to remove all user info from session when session expires(time we set)


// Middleware for Flashes
app.use((req, res, next) => {
    res.locals.success = req.flash("success");   //storing flash in success variable[which is an array]
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;    // to show only logout in nav-bar if user is logged-in(ie if there is obj in req.user)
    next();
});


// app.use("/listings/bookings", bookingRouter);   //keep this first as bookings will be interpreted as id
app.use("/listings", listingRouter);   // Compares paths starting with /listings in listings.js file
app.use("/listings/:id/reviews", reviewRouter);   // Compares paths starting with /listings in listings.js file
app.use("/", userRouter);
app.use("/filter", filterRouter);
app.use("/listings/:id/bookings", bookingRouter); 



//if no path matches above then this will execute
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


//Error Handler
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {err});
    // res.status(statusCode).send(message);
});


app.listen(8080, ()=> {
    console.log("server is listening to port 8080");
});
