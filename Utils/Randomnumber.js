function fnGetRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += Math.floor(Math.random() * randomChars.length);
    }
    return result;
    
}




module.exports = {fnGetRandomString : fnGetRandomString}