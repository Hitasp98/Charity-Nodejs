const config = { 
    user : "sa",
    // password : 'A12345678n',
    // server : 'localhost',
    // database : "CharityDB", 
    password : '123456',
    server : 'localhost',
    database : "sabkad4",
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        instancename: "DESKTOP-200I7Q9",
    },
    port:1433,
}


module.exports = config;