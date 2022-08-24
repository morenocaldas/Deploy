const jwt = require('jsonwebtoken');
const secret = require('../secret');

const checkToken = async (bearerToken) => {
    if (!bearerToken) {
        return res.status(401).json({ "mensagem": "Token não fornecido" })
    }
    const tokenSplit = bearerToken.split(' ');
    if (tokenSplit[0] !== 'Bearer') {
        return res.status(401).json({ "mensagem": "Token Inválido" })
    }
    if (tokenSplit.length < 2) {
        return res.status(401).json({ "mensagem": "Token Inválido" })
    }
    const token = tokenSplit[1];
    const tokenchecked = await jwt.verify(token, segredo);
    return tokenchecked;
}

module.exports = checkToken;