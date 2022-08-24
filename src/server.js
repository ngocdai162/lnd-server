

// import initWebRoutes from './route/web';
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
const {conn,sql} = require('./connect')

//config app


app.get('/city', async (req,res) => {
    var pool = await conn;
    var sqlString = 'SELECT * FROM city';
    return await pool.request().query(sqlString, (err,data)=> {
        console.log(err,data);
    })
    res.send("hello");
})



let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(8080, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + 8080)
})
