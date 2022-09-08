const express = require('express');
const router = express.Router();

//    /wallet/
var WalletController = require("../app/controller/WalletController");
const middlewareController =require("../app/controller/middlewareController")

// CREATE WALLET---------truyền vào userId
router.post("/create",WalletController.createWallet); 

//GET ALL COIN-----------truyền userId ở params
router.get("/:userId", WalletController.getWallet);

//CHECK WALLET----------truyền vào coinId và userId
router.post("/check", WalletController.checkWallet);

//ADD COIN--------------tryền vào coinId, userId, quantity
router.post("/add",WalletController.addCoin); 

//UPDATE COIN-----------truyền vào coinId, userId, quantityAdd
router.put("/update",WalletController.updateWallet);


module.exports = router;