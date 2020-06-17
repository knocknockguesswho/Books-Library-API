const authModel = require('../models/auth');
const helper = require('../helpers/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/global');
const newToken = require('../middleware/auth');

module.exports = {
    register: async function(req, res){
        const setData = req.body;//get all of input data including password
        const salt = bcrypt.genSaltSync(10);//password hash rounds
        const hashPassword = bcrypt.hashSync(setData.password, salt);//encrypting password
        setData.password = hashPassword;
        try{
            const result = await authModel.registerModel(setData);
            delete result.password;//delete password before send it to response
            if(result.role != 1 && result.role != 2 && result.role != 3){
                return helper.response(res, `fail`, `Your input did not match to any Roles`, 500)
            } else {
                if(result.id == 0){
                    return helper.response(res, `fail`, `Sorry, username already taken.`, 500)
                }
                return helper.response(res, `success`, `Thank you ${result.username} for register on our services!`, 200);
            }
        } catch(error){
            return helper.response(res, `fail`, `Internal Server Error`, 500)
        }
    },
    login: async function(req, res){
        const loginData = req.body;
        try{
            const result = await authModel.loginModel(loginData.username);
            if(result.length > 0){
                const dbPassword = result[0].password;
                const passwordMatch = bcrypt.compareSync(loginData.password, dbPassword);

                if(passwordMatch){
                    const tokenData = {...result[0]};
                    const token = jwt.sign(tokenData, config.jwtSecretKey, {expiresIn: '10m'});
                    result[0].token = token;
                    const refreshToken = jwt.sign(tokenData, config.jwtSecretKeyRefresh, {expiresIn: '1d'});
                    result[0].refreshToken = refreshToken;//new token ready to refresh
                    return helper.loginResponse(res, `success`, result[0].token, 200);
                }
                return helper.response(res, `fail`, `Username or Password Wrong`, 400);
                
            }
            return helper.response(res, `fail`, `Username or Password Wrong`, 400);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    }
}