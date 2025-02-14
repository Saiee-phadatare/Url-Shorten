const express = require("express");
const { connectmongodb } = require("./connection");
const urlRoutes = require("./routes/url");
const url = require("./modle/url"); 

const app = express();
const PORT = 1000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectmongodb("mongodb://localhost:27017/ShortenUrl")
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("Error occurred", err));

// Routes
app.use('/url', urlRoutes);

// Redirect Handler
app.get("/:shortId", async (req, res) => { 
    const { shortId } = req.params;

    try {
        const urlEntry = await url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: Date.now() } }, 
            { new: true } 
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
