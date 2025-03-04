const jwt = require("jsonwebtoken");
const secret = "SAI68E@E"
//for jwt(stateless)
function setUser(user){
    return jwt.sign(
    {
        _id:user._id,
        email: user.email,
    },secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null;
    }
}

//for state auth
// const sessionIdToUserMap = new Map();

// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }


module.exports = {
    setUser,
    getUser,
}