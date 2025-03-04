const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("User UID:", userUid);

    if (!userUid) {
        console.log("❌ No UID found. Redirecting to login...");
        return res.redirect("/login");
    }

    const user = getUser(userUid);
    console.log("User found:", user);

    if (!user) {
        console.log("❌ Invalid session. Redirecting to login...");
        return res.redirect("/login");
    }

    console.log("✅ User authenticated:", user.name);
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}