const JWT = require("jsonwebtoken");

const secret = "vikas@123"; 

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    };

    const token = JWT.sign(payload, secret, { expiresIn: "1d" });
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};
