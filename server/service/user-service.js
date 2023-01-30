const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(username, email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const fetchUsername = await UserModel.findOne({username})
        if (fetchUsername) {
            throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({username, email, password: hashPassword, activationLink})
        console.log('1111')
        await mailService.sendActivationMail(email, `http://localhost:5000/api/activate/${activationLink}`)

        console.log('333333')
        const userDto = new UserDto(user); // id, email, isActivated
        console.log(userDto)
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        console.log(userDto)
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        console.log('hhh')
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        console.log('kkk')
        const userData = tokenService.validateRefreshToken(refreshToken);
        console.log(userData)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log(tokenFromDb)
        if (!userData || !tokenFromDb) {

        }
        console.log('nnn')
        console.log(userData.id)
        const user = await UserModel.findOne(userData.id)
        console.log('zzzz')
        const userDto = new UserDto(user);
        console.log('xxxxx')
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        console.log('cccc')

        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();