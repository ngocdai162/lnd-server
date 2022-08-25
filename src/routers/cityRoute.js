
// module.exports = router;
module.exports =  function(app) {
    var cityController = require("../app/controller/CityController");
    app.get("/all", cityController.getList);
    app.get("/:id", cityController.getCity);
    app.post("/add", cityController.addCity);
    app.put("/update", cityController.updateCity);
    app.delete("/:id", cityController.deleteCity);
};
