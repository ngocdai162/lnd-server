var {conn,sql} = require('../../connect');
const City = require("../models/CityModel");
const CityModel =  new City();
exports.getList = (req,res) => {
    CityModel.getAll((err,data) => {
        res.send({result: data, error: err});
      })
};
exports.getCity = (req,res) => {
    CityModel.getItem(req.params.id, (err,data) => {
        res.send({result: data, error: err});
      })
};
exports.addCity = (req,res) => {
    CityModel.create(req.body,(err,data) => {
        res.send({result: data, error: err});
      })
}
exports.updateCity = (req,res) => {
    CityModel.update(req.body,(err,data) => {
      res.send({result:data, error: err});
    })
}
exports.deleteCity = (req,res) => {
    CityModel.delete(req.params.id,(err,data) => {
        res.send({result:data, error: err});
    })
}



//     // [GET] 

//     // [POST]
//     async add(req, rest) {
//         var pool = await conn;
//         var sqlString = 'INSERT INTO city (id,name) VALUES(@id,@name)';
//         return await pool.request()
//         
//     }

//     // [PUT] 
//     async  update(req, res) {
//         
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
