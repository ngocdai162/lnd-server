var {conn, sql} = require('../../connect');
import { v4 as uuidv4 } from 'uuid';


module.exports = function(){
     //CREATE WALLET
    this.create = async function(data,result) {
        var pool = await conn;
        const walletId = uuidv4();
        var sqlString = 'INSERT INTO MD_Wallet(walletId,userId) VALUES (@walletId,@userId)';
        return await pool.request()
        .input('walletId', sql.NVarChar(200), walletId) // 
        .input('userId', sql.NVarChar(200), data.userId ) // 
        .query(sqlString, (err,newData)=> {
            if(err) {
              result(true,null);
            }
            else {
              result(null,newData);
            }
        });
    }

    //GET ALL COIN   @userId
    this.getAll = async function(id,result) {
      var pool = await conn;
      var sqlString = 'Select WalletDetail.* FROM WalletDetail, MD_WAllet, SYS_USER where MD_Wallet.userID = SYS_USER.userID and WalletDetail.walletId = MD_Wallet.walletId and SYS_User.userId= @userId';
      return await pool.request()  
      .input('userId', sql.NVarChar(200), id ) // 
      .query(sqlString, (err,data)=> {
        if(data?.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
    }

    //CHECK WALLET -----kiểm tra để insert hay update vào ví
    this.check = async function(dataCheck,result) {
      var pool = await conn;
      var sqlString = 'Select * FROM WalletDetail, MD_WAllet, SYS_USER where MD_Wallet.userID = SYS_USER.userID and WalletDetail.walletId = MD_Wallet.walletId and coinId = @coinId and SYS_User.userId = @userID';
      return await pool.request()  
      .input('coinId', sql.NVarChar(50), dataCheck.coinId ) // 
      .input('userId', sql.NVarChar(200), dataCheck.userId ) // 
      .query(sqlString, (err,data)=> {
        if(data?.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
    }

    //ADD NEW COIN
    this.add = async function(data,result) {
      var pool = await conn;
      var sqlString = 'Insert Into WalletDetail(walletId, coinId, quantity) values ((Select walletId from MD_Wallet where MD_Wallet.UserId = @userId),@coinId,@quantity)';
      return await pool.request()  
      .input('coinId', sql.NVarChar(50), data.coinId ) // 
      .input('userId', sql.NVarChar(200), data.userId ) //
      .input('quantity', sql.Float, data.quantity ) // 
      .query(sqlString, (err,newData)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
      });
    }

    //UPDATE WALLET
    this.update = async function(data,result) {
      var pool = await conn;
      var sqlString = 'Update WalletDetail SET quantity = @quantityAdd + (Select quantity from WalletDetail where WalletDetail.walletId = (Select walletId from MD_Wallet where MD_Wallet.UserId = @userId) and coinId = @coinId)  Where WalletDetail.walletId = ((Select walletId from MD_Wallet where MD_Wallet.UserId = @userId)) and coinId = @coinId ';
      return await pool.request()
      .input('coinId', sql.NVarChar(50), data.coinId ) // 
      .input('userId', sql.NVarChar(200), data.userId ) //
      .input('quantityAdd', sql.Float, data.quantityAdd ) // 
      .query(sqlString, (err,newData)=> {
          if(err) {
            result(true,null);
          }
          else {
            result(null,newData);
          }
      });
    }
    
}
