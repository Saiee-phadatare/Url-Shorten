const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    redirecturl: { 
        type: String, 
        required: true 
    },
    visitHistory: { 
        type: [Date], 
        default: [] 
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }
});

const url = mongoose.model("url", urlSchema);

module.exports = url;
