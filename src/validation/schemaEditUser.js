const yup = require('./configuration');

const schemaEditUser = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    cpf: yup.number().required(),
    phone: yup.number(),
});

module.exports = schemaEditUser;