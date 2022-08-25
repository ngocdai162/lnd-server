var {conn, sql} = require('../../connect');
module.exports = function(){
 this.getAll = async function(result) {
        var pool = await conn;
        var sqlString = 'SELECT * FROM city';
        return await pool.request()
        .query(sqlString, (err,data)=> {
          if(data.recordsets.length > 0) {
            result(null, data.recordset);
          } else {
            result(true, null);
          }
        });
    }
}