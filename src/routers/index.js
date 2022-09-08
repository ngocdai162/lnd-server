const userRouter = require('./userRoute');
const feeRouter = require('./feeRoute');
const walletRouter = require('./walletRoute')

function route(app) {
    app.use('/user', userRouter);
    app.use('/fee', feeRouter);
    app.use('/wallet',walletRouter)
}

module.exports = route;

