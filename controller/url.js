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
    });

    return res.json({ id: shortID });
}



module.exports = { handleShortUrl };
