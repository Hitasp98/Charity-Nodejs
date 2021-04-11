const mysql = require('mysql')
const db = require('../my-database/config')

module.exports = () => {
    db.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }else{
            console.log('connect to DB')
        }

        
    });


}