const userRouter = require('./userRoute');

function route(app) {
    app.use('/user', userRouter);
}

module.exports = route;
