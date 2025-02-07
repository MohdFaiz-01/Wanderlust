const User = require("../models/user.js");

// SIGN-UP FORM
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


// SIGN-UP 
module.exports.signup = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {   // to automatically login after signup
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};


// LOGIN FORM
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


// LOGIN
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";  // if user directly req on edit then after login edit from should open else if user normally logging in then redirect to /listings (refer middelware used)
    res.redirect(redirectUrl);
};


// LOGOUT
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};