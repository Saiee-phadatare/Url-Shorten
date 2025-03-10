const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

//importinf functions...
const connectDB = require("./connection");
const url = require("./modle/url"); 
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

//importing routes....
const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const user = require("./routes/user");

const app = express();
const PORT = 1000;

// Middleware
app.use(express.json());//to convert incoming json data to js object
app.use(express.urlencoded({extended : false}));//to convert incoming form data to js object
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Seting ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/',checkAuth, staticRoute);
app.use('/user',user);

// Redirect Handler
app.get("/:shortId", async (req, res) => { 
    const { shortId } = req.params;
    try {
        const urlEntry = await url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: Date.now() } }, 
            { new: true } //to send the updated data..
        );

        if (!urlEntry) {
            return res.status(404).json({ msg: "URL not found" });
        }

        res.redirect(urlEntry.redirecturl); 
    } catch (error) {
        console.error("Error in URL redirection:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}...`));
