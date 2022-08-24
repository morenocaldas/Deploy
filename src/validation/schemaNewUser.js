const yup = require('./configuration');

const schemaNewUser = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
});

module.exports = schemaNewUser;