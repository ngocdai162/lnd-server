var {conn, sql} = require('../../connect');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = function(){

  //register user
  this.create = async function(newData,result) {
    var pool = await conn;
    // const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newData.password, 10);
    // const hashed =  newData.passWord;
    var sqlString = 'INSERT INTO  users (userName,passWord, isAdmin) VALUES (@userName,@passWord,@isAdmin)';
    return await pool.request()
    .input('userName', sql.NVarChar(50), newData.userName) // 
    .input('passWord', sql.NVarChar(500), hashed) // 
    .input('isAdmin', sql.Int, newData.isAdmin) // 
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }






  //update user
  this.update = async function(newData,result) { 
    var pool = await conn;
    console.log(newData);
    var sqlString = 'UPDATE users SET passWord = @passWord WHERE userName = @userName';
    return await pool.request()
    .input('userName', sql.NVarChar(50), newData.userName) // 
    .input('passWord', sql.NVarChar(50), newData.passWord) // 
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }

  //Delete user
  this.delete = async function(data,result) {
    var pool = await conn;
    var sqlString = 'DELETE FROM users WHERE userName = @userName';
    console.log(data)
    return await pool.request()
    .input('userName', sql.NVarChar(50), data.userName) //
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,data);
        }
    });
  }
//lấy 1 user 
this.getItem = async function(dataKey,result) {
  try {
    var pool = await conn;
    var sqlString = 'SELECT * FROM users WHERE userName = @userName';
    const user =  await pool.request()
    .input('userName', sql.NVarChar(50),dataKey.userName) // 
    .query(sqlString);
    return user.recordsets[0];
  } catch (error) {
    console.log(error);
  }
  // return user;
}
 
// this.getItem = async function(dataKey,result) {
//   try {
//     var pool = await conn;
//     var sqlString = 'SELECT * FROM users WHERE userName = @userName';
//     const user =  await pool.request()
//     .input('userName', sql.NVarChar(50),dataKey.userName) // 
//     .query(sqlString, (err,data)=> {
//       if(data.recordset.length > 0) {
//         result(null, data.recordset[0]);
//       } else {
//         result(true, null);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   // return user;
// }
 
 
  
 

  //Lấy list user
 this.getAll = async function(result) {
  var pool = await conn;
  var sqlString = 'SELECT * FROM users';
  console.log("pool");
  console.log(pool);
  return await pool.request()  
  .query(sqlString, (err,data)=> {
    if(data?.recordset.length > 0) {
      result(null, data.recordset);
    } else {
      result(true, null);
    }
  });
}
}

    