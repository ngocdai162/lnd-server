var {conn,sql} = require('../../connect');
const User  = require("../models/UserModel");
const Wallet = require('../models/WalletModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = new User();
const WalletModel = new Wallet();
// let refreshTokens = [];
 
const generateAccessToken =  (user) => {
  return jwt.sign(
    {
      id: user.userName,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_KEY,
    // { expiresIn: "20s" }
  );
};

// Đăng ký
exports.registerUser = async (req, res)  => {
  UserModel.create(req.body,(err,data) => {
      res.send({result: data, error: err});
  })
//   WalletModel.createWallet(req.body,(err,data) => {
//     res.send({result: data, error: err});
// })
}

// Đăng nhập
exports.loginUser = async (req,res) => {
     try {
    const tempUser =  await UserModel.getItem(req.body) 
    const user  = tempUser[0];
    if (!user) {
      return res.status(404).json("Incorrect username");
    } 
    const validPassword = await bcrypt.compare(
      req.body.passWord,
      user.passWord
    );
    
    if (!validPassword) {
      return  res.status(404).json("Incorrect password");
    }
 
    if (user && validPassword) {
      //Generate access token
      const accessToken = generateAccessToken(user);
      console.log(accessToken);
      console.log("ok")
      return  res.send({ ...user, accessToken });
    }
    } catch (err) {
     return  res.status(500).json(err);
    }
};

//Update 
exports.updateUser= async (req, res)  => {
  UserModel.update(req.body,(err,data) => {
      res.send({result: data, error: err});
  })
}

// Đăng xuất
exports.logOut  = async (req, res) => {
  //Clear cookies when user logs out
  res.status(200).json("Logged out successfully!");
},


exports.getUsers = (req,res) => {
    UserModel.getAll((err,data) => {
        res.send({result: data, error: err});
      })
};

exports.getUser = (req,res) => {
   UserModel.getItem(req.params.userName, (err,data) => {
        res.send({result: data, error: err});
      })
};


exports.updateUser = (req,res) => {
  console.log(req.params)
    UserModel.update(req.params.userId, req.body, (err,data) => {
      res.send({result:data, error: err});
    })
}
exports.deleteUser = (req,res) => {
    UserModel.delete(req.body,(err,data) => {
        res.send({result:data, error: err});
    })
}

// const requestRefreshToken = async (req, res) => {
//   //Take refresh token from user
//   const refreshToken = req.cookies.refreshToken;
//   //Send error if token is not valid
//   if (!refreshToken) return res.status(401).json("You're not authenticated");
//   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//     }
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//     //create new access token, refresh token and send to user
//     const newAccessToken = authController.generateAccessToken(user);
//     const newRefreshToken = authController.generateRefreshToken(user);
//     refreshTokens.push(newRefreshToken);
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure:false,
//       path: "/",
//       sameSite: "strict",
//     });
//     res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });
// }

