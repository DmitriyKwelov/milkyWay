const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    console.log('123123')
    try {
        console.log(6666)
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log('fsefsef')
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log('9999')
        return next(ApiError.UnauthorizedError());
    }
};