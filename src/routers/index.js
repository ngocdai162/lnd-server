const userRouter = require('./userRoute');
const feeRouter = require('./feeRoute');

function route(app) {
    app.use('/user', userRouter);
    app.use('/fee', feeRouter)
}

module.exports = route;

