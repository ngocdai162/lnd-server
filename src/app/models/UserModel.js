var {conn, sql} = require('../../connect');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = function(){

  //REGISTER
  // {
  //     "userId": "u1",
  //     "email": "tho@gmail.com",
  //     "passWord": "123456",
  //     "userName":"tho",
  //     "imgSrc": "/imageseea",
  //     "fullName": "Kim Tho"
  //    }
  this.create = async function(newData,result) {
    var pool = await conn;
    const isDeleted = 0;
    const roleId = 1;
    console.log("ne")
    console.log(newData);
    const hashed = await bcrypt.hash(newData.passWord, 10);
    var sqlString = 'INSERT INTO SYS_User(userId,email, passWord,userName,isDeleted, roleId, imgSrc, fullName) VALUES (@userId,@email, @password,@userName,@isDeleted,@roleId, @imgSrc, @fullName)';
    return await pool.request()
    .input('userId', sql.NVarChar(200), newData.userId) // 
    .input('email', sql.VarChar(50), newData.email ) // 
    // .input('passWord', sql.NVarChar(500), hashed) // 
    .input('passWord', sql.NVarChar(500), hashed) // 
    .input('userName', sql.NVarChar(50), newData.userName) // 
    .input('isDeleted', sql.Bit, isDeleted) // 
    .input('roleId', sql.Int, roleId) // 
    .input('imgSrc', sql.NVarChar(4000), newData.imgSrc) // 
    .input('fullName', sql.NVarChar(50), newData.fullName) // 
    .query(sqlString, (err,newData)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }

//lấy 1 user 
  this.getItem = async function(dataKey,result) {
  try {
    var pool = await conn;
    var sqlString = 'SELECT * FROM SYS_User WHERE userName = @userName';
    const user =  await pool.request()
    .input('userName', sql.NVarChar(50),dataKey.userName) // 
    .query(sqlString);
    return user.recordsets[0];
  } catch (error) {
    console.log(error);
  }
  // return user;
  }

  //UPDATE USER
  this.update = async function(id, newData,result) {
    var pool = await conn;
    console.log("update ne")
    console.log(newData);
    const hashed = await bcrypt.hash(newData.newPassWord, 10);
    console.log(hashed)
    var sqlString = 'UPDATE SYS_User SET passWord = @newPassWord, userName = @userName WHERE UserId = @userId ';
    return await pool.request()
    .input('userId', sql.NVarChar(200), id) // 
    .input('userName', sql.NVarChar(50), newData.userName) //
    .input('newPassWord', sql.NVarChar(500), hashed) // 
    .query(sqlString, (err,newData)=> {
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
