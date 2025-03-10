const express = require("express");
const url = require("../modle/url");

const router = express.Router();

router.get('/', async (req,res) =>{
    if(!req.user) return res.redirect("/login");
    console.log(`By chatgpt : -${req.user._id}`);
    const allurl = await url.find({ createdBy : req.user._id });//data of mongdb
    return res.render("home",{ urls: allurl});
})

router.get('/signup', (req,res)=>{
    res.render("signup");
})

router.get('/login', (req,res)=>{
    res.render("login");
})

module.exports = router;