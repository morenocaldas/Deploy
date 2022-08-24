const knex = require("../database/connection");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const schemaUserLogin = require("../validation/schemaUserLogin");
const schemaEditUser = require("../validation/schemaEditUser");
const schemaNewUser = require("../validation/schemaNewUser");
const secret = require('../secret');
const checkToken = require('../filters/token')


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await schemaNewUser.validate(req.body);
        const checkUser = await knex("users").where({ email }).first().returning("");

        if (checkUser) {
            return res.status(400).json("Usuário já cadastrado");
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const hash = await bcrypt.hash(String(password), 10);

        const newUser = {
            name: username,
            email,
            password: hash,
        };

        const newUserQuery = await knex("users").insert(newUser).returning("*");

        return res.status(201).json(newUserQuery);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const login = async (req, res) => {
    await schemaUserLogin.validate(req.body);
    const { email, password } = req.body;
    try {
        const checkUser = await knex("users").where({ email }).first();

        if (!checkUser) {
            return res.status(403).json("Digite um email e usuário válido");
        }

        const token = jwt.sign({ id: checkUser.id }, secret);

        return res.status(200).json(token);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editUser = async (req, res) => {
    const { username, email, cpf, phone, password } = req.body;

    const { user } = req;

    try {
        await schemaEditUser.validate(req.body);

        const findUser = await knex("users").where({ id: user.id });


        if (cpf) {
            const checkCpf = await knex("users").where({ cpf });
            if (checkCpf.rowCount > 0) {
                return res.status(400).json("CPF já existe com outro usuário cadastrado");
            }
        }

        if (email) {
            const checkEmail = await knex("users").where({ email });
            if (checkEmail.rowCount > 0) {
                return res.status(400).json("Email já existe com outro usuário cadastrado");
            }
        }

        const hash = await bcrypt.hash(String(password), 10);

        const newUser = await knex("users").where({ email: user.email }).update({
            name: username,
            email,
            password: hash,
            cpf,
            phone,
        });

        if (!newUser) {
            return res.status(400).json("Não foi possível editar usuário");
        }

        return res.status(200).json("Usuário editado com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};



module.exports = {
    registerUser,
    login,
    editUser,

};