const knex = require("knex")({
    client: 'pg',

    connection: {
        user: 'xmvkswcisyrfvi',
        host: 'ec2-3-213-228-206.compute-1.amazonaws.com',
        database: 'd535si3t184cl8',
        password: '04602782b35839ef498626058b5a1970b9df0e242a7f1b37b53bb1388ce99b1e',
        port: '5432',
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex;