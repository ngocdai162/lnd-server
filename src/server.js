var express = require("express");
var app = express();
const port = 8080;
var bodyParser = require('body-parser')
app.use(bodyParser.json());
require("./routers/cityRoute")(app);



//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log(`App listening at http://localhost:${port}`)
})
