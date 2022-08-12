const jsonwebtoken = require("jsonwebtoken");
const constants = require('../utilities/constants')
const httpStatus=require('http-status')

const signIn =  async (signedUser) => {
    const token = await jsonwebtoken.sign(
        signedUser,
        constants.authConstants.secret_key,
        {
            expiresIn: constants.authConstants.expires_in,
        }
    );

    return token
}


const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send({ status: httpStatus.FORBIDDEN, message: "Access Denied" });
    }

}

const tokenValidation = (req, res, next) => {
    jsonwebtoken.verify(req.token, constants.authConstants.secret_key, async (err, authData) => {
        if (err) {
            res.status(403).send({ status: httpStatus.FORBIDDEN, message: constants.constants.FORBIDDEN_MSG, data: null });
        } else {
            next();
        }
    })
}


module.exports = {
    signIn,
    verifyToken,
    tokenValidation
}
