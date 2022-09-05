var {conn, sql} = require('../../connect');

module.exports = function(){
    this.createWallet = async function(newData,result) {
        var pool = await conn;
        // const walletId = uuidv4()
        const walletId = "uuiwuo";
        console.log(newData);
        var sqlString = 'INSERT INTO MD_Wallet(walletId,userId) VALUES (@walletId,@userId)';
        return await pool.request()
        .input('walletId', sql.NVarChar(200), walletId) // 
        .input('userId', sql.NVarChar(200), newData.userId ) // 
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