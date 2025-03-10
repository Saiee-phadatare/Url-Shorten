const User = require("../modle/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req,res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function  handleUserLogin(req,res){
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if(!user) return res.render("login" , {
        error : "invalid user name or password..."
    });

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid" , sessionId);

    const token = setUser(user);
    console.log("Generated Token:", token); // Debugging

    res.cookie("uid", token, { httpOnly: true }); // Ensuring it's stored properly
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}