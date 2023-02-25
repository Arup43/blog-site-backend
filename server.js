//.env file import
require('dotenv').config()

const app = require("./app");
app.listen(process.env.PORT, function () {
    console.log("App Run on port " + process.env.PORT)
})