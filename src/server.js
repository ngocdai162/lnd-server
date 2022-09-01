import dotenv from 'dotenv';
var express = require("express");
var app = express();
const port = 8080;
var bodyParser = require('body-parser')
dotenv.config();

app.use(bodyParser.json());
// require("./routers/route")(app);
require("./routers/index")(app);
app.listen(port, () => {
    //callback
    console.log(`App listening at http://localhost:${port}`)
})
