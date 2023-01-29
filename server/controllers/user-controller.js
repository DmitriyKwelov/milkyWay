const userService = require('../service/user-service');
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const tokenService = require("../service/token-service");

class UserController {
    async registration(req, res, next) {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", error.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect('https://www.youtube.com/')
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        console.log('45555')
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.UnauthorizedError());
            }
            const userData = tokenService.validateAccessToken(accessToken);
            if (!userData) {
                return new Error('fawefawef')
            }
            // req.user = userData;
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController();