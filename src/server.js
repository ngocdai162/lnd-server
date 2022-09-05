import dotenv from 'dotenv';
var express = require("express");
const cors = require("cors");
var app = express();
const port = 8080;
var bodyParser = require('body-parser')
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
// require("./routers/route")(app);
require("./routers/index")(app);
app.listen(port, () => {
    //callback
    console.log(`App listening at http://localhost:${port}`)
})
