
const cityRouter = require('./cityRoute');


function route(app) {

    app.use('/courses', cityRouter);

}

module.exports = route;
