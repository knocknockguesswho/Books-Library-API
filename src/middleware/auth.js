const jwt = require('jsonwebtoken');
const config = require('../config/global');
const helper = require('../helpers/index');

module.exports = {
    verifyJWT: function(req, res, next){
        const token = req.headers.authorization;
        try{
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            next();
        } catch(error){
            if(error.name === 'TokenExpiredError'){
                return helper.response(res, `fail`, `Token Expired!`, 401);
            }
            console.log(error.name)
            return helper.response(res, `fail`, `Invalid Token!`, 401);
        }
    },
    verifyAdmin: function(req, res, next){
        const token = req.headers.authorization;
        try{
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            if(req.decodedToken.role != 1){
                return helper.response(res, `fail`, `You do not have any permissions! Please register as admin first.`, 403);
            }
            next();
        } catch(error){
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    verifyMember: function(req, res, next){
        const token = req.headers.authorization;
        try{
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            if(req.decodedToken.role != 2 && req.decodedToken.role != 1){
                return helper.response(res, `fail`, `You do not have any permissions! Please register as member first.`, 403);
            }
            next();
        } catch(error){
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
};

/* USER ONLY GET TOKEN FROM 'No Auth' TYPE OF AUTHORIZATION REQUEST */