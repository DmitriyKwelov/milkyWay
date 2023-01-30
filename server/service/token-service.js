const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')

class TokenService{
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'blablar23rFAEfqwef3', {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, "gawergawegf#rQ@E!@fceas", {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, 'blablar23rFAEfqwef3')
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, "gawergawegf#rQ@E!@fceas")
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();