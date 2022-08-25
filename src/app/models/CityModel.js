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
  this.getItem = async function(id,result) {
        var pool = await conn;
        var sqlString = 'SELECT * FROM city WHERE id = @varId';
        return await pool.request()
        .input('varId', sql.Int, id) // 
        .query(sqlString, (err,data)=> {
          if(data.recordsets.length > 0) {
            result(null, data.recordset);
          } else {
            result(true, null);
          }
        })
  }
  this.create = async function(newData,result) {
    var pool = await conn;
    var sqlString = 'INSERT INTO  city (id, name) VALUES (@id,@name)';
    return await pool.request()
    .input('id', sql.Int, newData.id) // 
    .input('name',sql.NChar(10), newData.name)
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }

  this.update = async function(newData,result) {
    var pool = await conn;
    var sqlString = 'UPDATE city SET name = @name WHERE id = @id';
    return await pool.request()
    .input('id', sql.Int, newData.id) // 
    .input('name',sql.NChar(10), newData.name)
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,newData);
        }
    });
  }
  
  this.delete = async function(id,result) {
    var pool = await conn;
    var sqlString = 'DELETE FROM city WHERE id = @id';
    return await pool.request()
    .input('id', sql.Int, id) // 
    .query(sqlString, (err,data)=> {
        if(err) {
          result(true,null);
        }
        else {
          result(null,data);
        }
    });
  }
  
  // this.edit = async function(id,result) {
  //   var pool = await conn;
  //   var sqlString = 'UPDATE city SET name=@name WHERE id=@id';
  //   return await pool.request()
  //         .input('id', sql.Int, req.body.id) // 
  //         .input('name',sql.NChar(10), req.body.name)
  //         .query(sqlString, (err,data)=> {
  //           if(data.recordsets.length > 0) {
  //             result(null, data.recordset);
  //           } else {
  //             result(true, null);
  //           }
  //          })
  // }
  
}

    