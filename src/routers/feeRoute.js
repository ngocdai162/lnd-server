const express = require('express');
const router = express.Router();

/*  api:     /user/add      */
var feeController = require("../app/controller/FeeController");
const middlewareController =require("../app/controller/middlewareController")
// UPDATE FEE
router.post("/update",feeController.upDateFee); 
//UPDATE isUse
router.put("/disable",feeController.upDateIsUse); 
//GET FEE
router.get("/get",feeController.getFee); 


module.exports = router;