var {conn, sql} = require('../../connect');
module.exports = function(){
    //CREATE NEW FEE
    // {
    //     "tradingFeeId":"qte",
    //     "fee": 20,
    //     "createdDate" : "2002-02-09 00:00:00",
    //     "isUse"  : 1
    //  }
  this.create = async function(newData,result) {
    console.log(newData)
    var pool = await conn;
    var sqlString = 'INSERT INTO BL_TradingFee(TradingFeeId,fee,CreatedDate,isUse) VALUES (@tradingFeeId,@fee, @createdDate, @isUse)';
    return await pool.request()
    .input('tradingFeeId', sql.NVarChar(200), newData.tradingFeeId) // 
    .input('fee', sql.Float, newData.fee ) // 
    .input('createdDate', sql.DateTime, newData.createdDate) // 
    .input('isUse', sql.Bit, newData.isUse ) // 
    .query(sqlString, (err,newData)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }


//update IsUse
  this.disableFee = async function(newData,result) { 
    var pool = await conn;
    var sqlString = 'UPDATE BL_TradingFee SET isUse = 0';
    return await pool.request()
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }


// getFee
this.getItem = async function(dataKey,result) {
    // console.log("pokok")
    try {
      var pool = await conn;
      var sqlString = 'SELECT * FROM BL_TradingFee WHERE isUse = 1';
      const fee =  await pool.request()
    //   .input('userName', sql.NVarChar(50),dataKey.userName) // 
      .query(sqlString);
      console.log(fee);
      return fee.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    // return user;
  }
 
}