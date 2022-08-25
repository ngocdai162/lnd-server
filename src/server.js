var express = require("express");
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
require("./routers/cityRoute")(app);


let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(8080, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + 8080)
})
