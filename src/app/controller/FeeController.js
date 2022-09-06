var {conn,sql} = require('../../connect');
const Fee  = require("../models/FeeModel");
const FeeModel = new Fee();

 
// UPDATEFEE
exports.upDateFee = async (req, res)  => {
  FeeModel.create(req.body,(err,data) => {
      res.send({result: data, error: err});
  })
}
exports.upDateIsUse = async (req, res)  => {
    console.log("gigoi")
    FeeModel.disableFee(req.body,(err,data) => {
        res.send({result: data, error: err});
    })
  }
//GET FEE
// exports.getFee = (res) => {
//    FeeModel.getItem((err,data) => {
//         res.send({result: data, error: err});
//       })
// };
exports.getFee = async (req,res) => {
 try {
   const tempFee =  await FeeModel.getItem(req, res) 
   const fee  = tempFee[0];
   if (!fee) {
     return res.status(404).json("no fee");
    } else {
     return  res.send(fee);
   }
 } catch (err) {
    return  res.status(500).json(err);
 }
};
//   WalletModel.createWallet(req.body,(err,data) => {
//     res.send({result: data, error: err});
// })







// exports.updateUser = (req,res) => {
//     UserModel.update(req.body,(err,data) => {
//       res.send({result:data, error: err});
//     })
// }

