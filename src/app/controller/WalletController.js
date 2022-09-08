var {conn,sql} = require('../../connect');
const Wallet = require('../models/WalletModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const WalletModel = new Wallet();

// CREATE WALLET
exports.createWallet = async (req, res)  => {
    WalletModel.create(req.body,(err,data) => {
        res.send({result: data, error: err});
    })
}
  
// GET ALL COIN
exports.getWallet = (req,res) => {
      WalletModel.getAll(req.params.userId, (err,data) => {
        res.send({result: data, error: err});
      })
}

// CHECK WALLET
exports.checkWallet = (req,res) => {
    WalletModel.check(req.body, (err,data) => {
        res.send({result: data, error: err});
      })
}

// ADD COIN
exports.addCoin = async (req, res)  => {
    WalletModel.add(req.body,(err,data) => {
        res.send({result: data, error: err});
    })
}

exports.updateWallet = (req,res) => {
    WalletModel.update(req.body, (err,data) => {
        res.send({result:data, error: err});
      })
  }