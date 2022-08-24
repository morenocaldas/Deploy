const jwt = require("jsonwebtoken");
const knex = require("../database/connection");
const secret = require('../secret');
const bcrypt = require("bcrypt");

const loginFilter = async (req, res, next) => {
    const { authorization: bearerToken } = req.headers;

    if (!bearerToken) {
        return res.status(404).json("Token não informado");
    }

    try {
        const token = bearerToken.replace("Bearer ", "").trim();

        const { id } = jwt.verify(token, secret);

        const checkUser = await knex("users").where({ id }).first();

        if (!checkUser) {
            return res.status(404).json("Usuário não encontrado");
        }

        const { password, ...user } = checkUser;

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = loginFilter;