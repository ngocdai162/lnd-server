const express = require('express');
const router = express.Router();

//    /wallet/
var WalletController = require("../app/controller/WalletController");
const middlewareController =require("../app/controller/middlewareController")

// CREATE WALLET
router.post("/create",WalletController.createWallet); 


module.exports = router;