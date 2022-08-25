
// module.exports = router;
module.exports =  function(app) {
    var cityController = require("../app/controller/CityController");
    app.get("/all", cityController.getList);
}
