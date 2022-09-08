var {conn,sql} = require('../../connect');
const Wallet = require('../models/WalletModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const WalletModel = new Wallet();
exports.createWallet = async (req, res)  => {
    WalletModel.create(req.body,(err,data) => {
        res.send({result: data, error: err});
    })
  }