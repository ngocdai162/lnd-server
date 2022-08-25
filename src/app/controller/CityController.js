var {conn,sql} = require('../../connect');
const City = require("../models/CityModel");
const CityModel =  new City();
exports.getList = (req,res) => {
    CityModel.getAll((err,data) => {
        res.send({result: data, error: err});
      })
}
// class CityController {
//     // [GET]
//     async getList(req, res, next) {
     
//     }

//     // [GET] 
//     async getItem(req, res) {
//         var id = req.params.id;
//         var pool = await conn;
//         var sqlString = 'SELECT * FROM city WHERE id = @varId';
//         return await pool.request()
//         .input('varId', sql.Int, id) // 
//         .query(sqlString, (err,data)=> {
//             if(data.recordset.length>0) {
//                 res.send({result: data.recordset});
//             } else {
//                 res.send({result: null});
//             }
//         })
//     }

//     // [POST]
//     async add(req, rest) {
//         var pool = await conn;
//         var sqlString = 'INSERT INTO city (id,name) VALUES(@id,@name)';
//         return await pool.request()
//         .input('id', sql.Int, req.body.id) // 
//         .input('name',sql.NChar(10), req.body.name)
//         .query(sqlString, (err,data)=> {
//             res.send({result:data})
//         })
//     }

//     // [PUT] 
//     async  update(req, res) {
//         var pool = await conn;
//         var sqlString = 'UPDATE city SET name=@name WHERE id=@id';
//         return await pool.request()
//         .input('id', sql.Int, req.body.id) // 
//         .input('name',sql.NChar(10), req.body.name)
//         .query(sqlString, (err,data)=> {
//             res.send({result:data})
//         })
//     }

//     async delete(req, res) {
//         var id = req.params.id;
//         var pool = await conn;
//         var sqlString = 'DELETE FROM city WHERE id = @varId';
//         return await pool.request()
//         .input('varId', sql.Int, id) // 
//         .query(sqlString, (err,data)=> {
//           if(!err) {
//             res.send({result: "Xóa thành công"});
//           } else {
//             res.send({result: "Xóa không thành công"});
//           }
//        })
//     }
// }

// module.exports = new CityController();
