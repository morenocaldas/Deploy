const yup = require('./configuration');

const schemaUserLogin = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

module.exports = schemaUserLogin;