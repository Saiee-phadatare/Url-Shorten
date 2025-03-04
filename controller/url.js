const shortid = require("shortid"); 
const Url = require("../modle/url"); 

async function handleShortUrl(req, res) {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ msg: "Please enter a URL..." });
   
    const shortID = shortid();

    await Url.create({
        shortId: shortID,
        redirecturl: url,
        visitHistory: [],
        createdBy : req.user._id,
    });

    //return res.render("home", {id: shortID,});
    const allUrls = await Url.find({}).sort({ _id: -1 }); // Latest first
    return res.render("home", { urls: allUrls });

}



module.exports = { handleShortUrl };
