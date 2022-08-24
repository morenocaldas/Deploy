const knex = require('../connection');
const schemaAddClient = require('../validations/addClient');
const schemaAttClient = require('../validations/attClient');


// const verifyLength = (item, length) => {
//     if (item.length !== length) {
//         return async (req, res) => { return res.status(400).json({ "message": `O campo ${Object.key(item)} deve ter ${length} caracteres.` }) }
//     }
// }

const addClient = async (req, res) => {
    const { name, email, cpf, phone, cep, address, complement, neighborhood, city, state } = req.body;
    // verifyLength(phone, 13);
    // verifyLength(cpf, 11);
    // verifyLength(cep, 8);

    try {

        if (cpf.length !== 11) {
            return res.status(400).json({ "message": `O campo CPF deve ter 11 caracteres.` })
        }

        if (cep.length !== 8) {
            return res.status(400).json({ "message": `O campo CEP deve ter 8 caracteres.` })
        }

        if (phone.length !== 13) {
            return res.status(400).json({ "message": `O campo Telefone deve ter 13 caracteres.` })
        }

        await schemaAddClient.validate(req.body);

        const clientExists = await knex('clients').where('email', email).returning(email).first();

        if (clientExists) {
            return res.status(409).json({ "message": "Este cliente já está cadastrado." });
        }

        const client = await knex('clients').insert({ name, email, cpf, phone, cep, address, complement, neighborhood, city, state });

        return res.status(201).json({ message: "Cliente cadastrado com sucesso." })
    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}


const getClients = async (req, res) => {
    try {
        const clients = await knex('clients').select('*');

        return res.status(200).json(clients);
    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}


const attClient = async (req, res) => {
    const { name, email, cpf, phone, cep, address, complement, neighborhood, city, state } = req.body;
    const { id } = req.params;
    try {
        await schemaAttClient.validate(req.body);


        if (cpf.length !== 11) {
            return res.status(400).json({ "message": `O campo CPF deve ter 11 caracteres.` })
        }

        if (cep.length !== 8) {
            return res.status(400).json({ "message": `O campo CEP deve ter 8 caracteres.` })
        }

        if (phone.length !== 13) {
            return res.status(400).json({ "message": `O campo Telefone deve ter 13 caracteres.` })
        }

        const user = await knex('clients').update({ name, email, cpf, phone, cep, address, complement, neighborhood, city, state }).where('id', id).returning('*');

        return res.status(204).json({ "message": "Cliente alterado com sucesso!" })

    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}


const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await knex('clients').del().where('id', id);

        return res.status(200).json({ "message": "Cliente deletado com sucesso!" })
    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}



module.exports = { addClient, getClients, attClient, deleteClient }