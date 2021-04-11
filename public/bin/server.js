const express = require("express");

const app = require('../app')
const port = normalizaPort(process.env.PORT || '3000')

app.use(express.static("../html/index.html"));
function normalizaPort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
app.listen(port, function () {
    console.log(`App listening on port ${port}`)
})
