const connection = require('../helpers/mysql');
const query = require('../helpers/sqlquery');

module.exports = {
    registerModel: function(setData){
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO users (username, password, role) SELECT * FROM (SELECT \'${setData.username}\', \'${setData.password}\', \'${setData.role}\') AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = ${setData.username}) LIMIT 1;`, function(error, result){
                if(error){
                    reject(error);
                };
                const newData = {
                    id: result.insertId,
                    ...setData
                }
                resolve(newData);
            });
        });
    },
    loginModel: function(username){
        return new Promise((resolve, reject)=>{
            connection.query(query.getUserDataByUsername, username, function(error, result){
                if(error){
                    reject(error);
                };
                resolve(result);
            });
        });
    }
};