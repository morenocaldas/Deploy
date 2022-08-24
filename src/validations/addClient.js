const yup = require('./yupConfig');
const schemaAddClient = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.number().required(),
    phone: yup.number().required(),
    cep: yup.number(),
    address: yup.string(),
    complement: yup.string(),
    neighborhood: yup.string(),
    city: yup.string(),
    state: yup.string(),

});

module.exports = schemaAddClient
